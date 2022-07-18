import pool from "../../../models/db";
import nc from 'next-connect';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const baseUrl = 'http://localhost:3000/api';
const staticResourceUrl = 'http://localhost:3000/uploads/';

export const config = {
    api: {
        bodyParser: false,
    },
};


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", "uploads"));    //process.cwd() reps the current working directory frontend and saves the files in the public/uploads folder 
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname);
        }
    })
});

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end('Something broke');
    },
    onNoMatch: (req, res) => {
        res.status(404).end('Page not found!');
    },
}).use(upload.single('pup_image'), cors())
    .get(async (req, res) => {
        try {
            const { id } = req.query;
            const response = await pool.query("SELECT * FROM pups WHERE pup_id = $1", [id]);

            if (response) {
                res.status(201).json(response.rows[0]);
            } else {
                res.status(400).json({ message: 'Request unsuccessful' })
            }
        } catch (error) {
            console.error(error.message);
        }
    })
    .put(async (req, res) => {
        try {
            const { id } = req.query;
            const { name, description, breed, sex, pup_status, age, price } = req.body;
            const imageUrl = staticResourceUrl + req.file.filename;
            const response = await pool.query("UPDATE pups SET (name, description, pup_image, breed, sex, pup_status, age, price) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE pup_id = $9", [name, description, imageUrl, breed, sex, pup_status, age, price, id]);

            if (response) {
                res.status(201).json({ message: 'Puppy was updated' });
            } else {
                res.status(400).json({ message: 'Request unsuccessful' })
            }
        } catch (error) {
            console.error(error.message)
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.query;
            const response = await pool.query("DELETE FROM pups WHERE pup_id = $1", [id]);

            if (response) {
                res.status(201).json({ message: 'Puppy was deleted' });
            } else {
                res.status(400).json({ message: 'Request unsuccessful' })
            }
        } catch (error) {
            console.error(error.message)
        }
    });

export default handler;