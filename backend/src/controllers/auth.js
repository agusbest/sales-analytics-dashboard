const db =
    require('../config/db');

const bcrypt =
    require('bcryptjs');

const jwt =
    require('jsonwebtoken');

exports.register = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const [user] =
            await db.query(
                `
                SELECT id
                FROM users
                WHERE email = ?
                `,
                [email]
            );

        if (user.length) {
            return res.status(400)
                .json({
                    message:
                        'Email already exists'
                });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        await db.query(
            `
            INSERT INTO users
            (
                name,
                email,
                password
            )
            VALUES
            (
                ?,
                ?,
                ?
            )
            `,
            [
                name,
                email,
                hashedPassword
            ]
        );

        res.json({
            success: true,
            message:
                'Register success'
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

exports.login = async (
    req,
    res
) => {

    try {

        const {
            email,
            password
        } = req.body;

        const [rows] =
            await db.query(
                `
                SELECT *
                FROM users
                WHERE email = ?
                `,
                [email]
            );

        if (!rows.length) {
            return res.status(401)
                .json({
                    message:
                        'Email not found'
                });
        }

        const user =
            rows[0];

        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {
            return res.status(401)
                .json({
                    message:
                        'Wrong password'
                });
        }

        const token =
            jwt.sign(

                {
                    id:
                        user.id,

                    email:
                        user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        '7d'
                }

            );

        res.json({

            token,

            user: {

                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email

            }

        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

exports.me = async (
    req,
    res
) => {

    try {

        const [rows] =
            await db.query(
                `
                SELECT
                    id,
                    name,
                    email
                FROM users
                WHERE id = ?
                `,
                [
                    req.user.id
                ]
            );

        res.json(
            rows[0]
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};
