import pool from "../../../models/db";
import nc from 'next-connect';

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end('Something broke');
    },
    onNoMatch: (req, res) => {
        res.status(404).end('Page not found!');
    },
}).get(async (req, res) => {
        try {
            const response = await pool.query("SELECT * FROM pups");
            if (response) {
                res.status(201).json(response.rows);
            } else {
                res.status(400).json({ message: 'Request unsuccessful' })
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default handler;