const XLSX = require('xlsx');
const db = require('../config/db');


exports.index = async (
    req,
    res
) => {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit = 10;

        const offset =
            (page - 1) * limit;

        const month =
            req.query.month;

        const search =
            req.query.search;

        let where = [];
        let params = [];

        if (month) {

            where.push(`
                DATE_FORMAT(
                    transaction_date,
                    '%Y-%m'
                ) = ?
            `);

            params.push(month);

        }

        if (search) {

            where.push(`
                (
                    product_name LIKE ?
                    OR
                    category LIKE ?
                    OR
                    branch LIKE ?
                )
            `);

            params.push(
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            );

        }

        const whereSql =
            where.length
                ? `WHERE ${where.join(' AND ')}`
                : '';

        const [rows] =
            await db.query(
                `
                SELECT
                    id,
                    transaction_date,
                    branch,
                    category,
                    product_name,
                    qty,
                    revenue,
                    cost,
                    profit
                FROM sales_transactions

                ${whereSql}

                ORDER BY
                    transaction_date DESC

                LIMIT ?
                OFFSET ?
                `,
                [
                    ...params,
                    limit,
                    offset
                ]
            );

        const [[count]] =
            await db.query(
                `
                SELECT
                    COUNT(*) total

                FROM sales_transactions

                ${whereSql}
                `,
                params
            );

        res.json({

            data: rows,

            pagination: {

                page,

                limit,

                total:
                    count.total,

                totalPages:
                    Math.ceil(
                        count.total /
                        limit
                    )

            }

        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

exports.importExcel = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File tidak ditemukan'
            });
        }

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);

        if (rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Data kosong di file Excel'
            });
        }

        let values = [];

        for (const row of rows) {

            const qty = Number(row.Qty || 0);
            const sellingPrice = Number(row['Harga Jual'] || 0);
            const costPrice = Number(row['Harga Modal'] || 0);

            const revenue = qty * sellingPrice;
            const cost = qty * costPrice;
            const profit = revenue - cost;

            values.push([
                row.Tanggal,
                row.Invoice,
                row.Cabang,
                row.Kategori,
                row.Produk,
                qty,
                sellingPrice,
                costPrice,
                revenue,
                cost,
                profit
            ]);
        }

        // 🔥 BULK INSERT QUERY
        const sql = `
            INSERT INTO sales_transactions
            (
                transaction_date,
                invoice_no,
                branch,
                category,
                product_name,
                qty,
                selling_price,
                cost_price,
                revenue,
                cost,
                profit
            )
            VALUES ?
        `;

        await db.query(sql, [values]);

        return res.json({
            success: true,
            total_rows: rows.length,
            inserted: values.length
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.exportExcel = async (req, res) => {
    try {

        const search = req.query.search || "";

        const [rows] = await db.query(`
            SELECT *
            FROM sales_transactions
            WHERE product_name LIKE ?
            ORDER BY transaction_date DESC
        `, [`%${search}%`]);

        const cleanRows = rows.map(r => ({
            Date: r.transaction_date,
            Invoice: r.invoice_no,
            Branch: r.branch,
            Category: r.category,
            Product: r.product_name,
            Qty: r.qty,
            Revenue: r.revenue,
            Profit: r.profit
        }));

        const worksheet = XLSX.utils.json_to_sheet(cleanRows);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        const buffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=transactions.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        return res.end(buffer);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.store = async (req, res) => {
    try {

        // console.log('BODY:', req.body);
        const invoice_no = `INV-${Date.now()}`;
        const data = {
            invoice_no,
            ...req.body
        };
        // console.log('DATA KE DB:', data);
        delete data.id;
        await db.query(
            `
            INSERT INTO sales_transactions SET ?
            `,
            data
        );

        return res.json({
            success: true,
            message: 'Data berhasil disimpan',
            data
        });

    } catch (error) {
        // console.error('STORE ERROR:', error);

        return res.status(500).json({
            success: false,
            message: 'Gagal menyimpan data',
            error: error.message
        });
    }
};


exports.update = async (req, res) => {

    await db.query(
        `
        UPDATE
        sales_transactions

        SET ?

        WHERE id=?
        `,
        [
            req.body,
            req.params.id
        ]
    );

    res.json({
        success: true
    });
};

exports.destroy =
    async (
        req,
        res
    ) => {

        const { id } =
            req.params;

        await db.query(
            `
      DELETE FROM
      sales_transactions

      WHERE id = ?
      `,
            [id]
        );

        res.json({
            success: true
        });

    };
// exports.exportExcel = async (req, res) => {
//     res.send("export ready"); // sementara test dulu
// };