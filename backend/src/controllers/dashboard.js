const db = require('../config/db');

const getMonthFilter = (month) => {

    if (!month) {

        return {
            where: '',
            params: []
        };

    }

    return {

        where: `
            WHERE DATE_FORMAT(
                transaction_date,
                '%Y-%m'
            ) = ?
        `,

        params: [month]

    };

};

exports.summary = async (req, res) => {

    try {

        const month = req.query.month;

        const { where, params } =
            getMonthFilter(month);

        const [rows] = await db.query(
            `
            SELECT
                COALESCE(SUM(revenue),0) revenue,
                COALESCE(SUM(cost),0) cost,
                COALESCE(SUM(profit),0) profit,

                ROUND(
                    (
                        COALESCE(SUM(profit),0)
                        /
                        NULLIF(
                            COALESCE(SUM(revenue),0),
                            0
                        )
                    ) * 100,
                    2
                ) margin

            FROM sales_transactions

            ${where}
            `,
            params
        );

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.trend = async (req, res) => {

    try {

        const month = req.query.month;

        const { where, params } =
            getMonthFilter(month);

        const [rows] = await db.query(
            `
            SELECT

                CONCAT(
                    LPAD(
                        CASE
                            WHEN DAY(transaction_date) <= 10 THEN 1
                            WHEN DAY(transaction_date) <= 20 THEN 11
                            ELSE 21
                        END,
                        2,
                        '0'
                    ),
                    '-',
                    LPAD(
                        CASE
                            WHEN DAY(transaction_date) <= 10 THEN 10
                            WHEN DAY(transaction_date) <= 20 THEN 20
                            ELSE DAY(
                                LAST_DAY(transaction_date)
                            )
                        END,
                        2,
                        '0'
                    )
                ) period,

                ROUND(
                    SUM(revenue)/1000000,
                    0
                ) revenue,

                ROUND(
                    SUM(cost)/1000000,
                    0
                ) cost,

                ROUND(
                    SUM(profit)/1000000,
                    0
                ) profit

            FROM sales_transactions

            ${where}

            GROUP BY period

            ORDER BY MIN(transaction_date)
            `,
            params
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.category = async (req, res) => {

    try {

        const month = req.query.month;

        const { where, params } =
            getMonthFilter(month);

        const [rows] = await db.query(
            `
            SELECT
              category,
                CONVERT(SUM(qty), UNSIGNED) sales
            FROM sales_transactions

            ${where}

            GROUP BY category

            ORDER BY sales DESC
            `,
            params
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.branch = async (req, res) => {

    try {

        const month = req.query.month;

        const { where, params } =
            getMonthFilter(month);

        const [rows] = await db.query(
            `
            SELECT

                branch,

                ROUND(
                    SUM(revenue)/1000000,
                    0
                ) revenue

            FROM sales_transactions

            ${where}

            GROUP BY branch

            ORDER BY revenue DESC
            `,
            params
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.topProducts = async (req, res) => {

    try {

        const month = req.query.month;

        const { where, params } =
            getMonthFilter(month);

        const [rows] = await db.query(
            `
            SELECT

                product_name,

                SUM(qty) qty,

                SUM(revenue) revenue,

                SUM(profit) profit

            FROM sales_transactions

            ${where}

            GROUP BY product_name

            ORDER BY revenue DESC

            LIMIT 10
            `,
            params
        );

        const result = rows.map(item => ({

            product: item.product_name,

            qty: item.qty,

            revenue:
                `Rp ${(item.revenue / 1000000).toFixed(0)} Jt`,

            profit:
                `Rp ${(item.profit / 1000000).toFixed(0)} Jt`

        }));

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


exports.months = async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT DISTINCT
                DATE_FORMAT(
                    transaction_date,
                    '%Y-%m'
                ) AS value,

                DATE_FORMAT(
                    transaction_date,
                    '%Y-%m-01'
                ) AS sort_date

            FROM sales_transactions

            ORDER BY sort_date DESC
        `);

        const formatter = new Intl.DateTimeFormat(
            'id-ID',
            {
                month: 'long',
                year: 'numeric'
            }
        );

        const result = rows.map(item => {

            const date = new Date(
                item.sort_date
            );

            return {
                value: item.value,
                label: formatter.format(date)
            };

        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};