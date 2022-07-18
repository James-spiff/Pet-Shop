import pool from '../../../models/db';
import multer from 'multer';
import nc from 'next-connect';
import cors from 'cors';
import path from 'path';
import { getDateTime } from '../../../utils/utils';

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
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page not found");
    },
}).use(upload.single('pup_image'), cors())
    .post(async (req, res) => {
        try {
            //const session = await getSession({ req }); //for the authentication
            // if(!session) {
            //     errorHandler("Access denied", res)
            // } else {
            //      const userId = session.user.id
            //     //insert the code below here
            // }

            const { name, description, breed, sex, pup_status, age, price } = req.body;
            const imageUrl = staticResourceUrl + req.file.filename;
            console.log(imageUrl);
            const createdAt = getDateTime();
            const newPup = await pool.query("INSERT INTO pups (name, description, pup_image, breed, sex, pup_status, age, price, createdAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [name, description, imageUrl, breed, sex, pup_status, age, price, createdAt]);
            if (newPup){
                res.status(201).json(newPup.rows[0]);
            } else {
                res.status(400).json({ message: 'Post unsuccessful' })
            }

            //res.status(201).json({ body: req.body, file: req.file });
        } catch (error) {
            console.error(error.message);
        }
    })
    .get(async (req, res) => {
        try {
            const response = await pool.query("SELECT * FROM pups");
            if (response) {
                res.status(201).json(response.rows);
            } else {
                res.status(400).json({ message: 'Request unsuccessful' });
            }
        } catch (error) {
            console.error(error.message);
        }
    });

export default handler;