import prisma from "../../../utils/prisma";
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const savedUser = await prisma.users.create({
            data: {
                email: email,
                password: encryptedPassword
            }
        });
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: `Something went wrong ${error.message}` });
    }
}
// import pool from '../../../models/db';
// import nc from 'next-connect';
// import cors from 'cors';

// export const config = {
//     api: {
//         bodyParser: true,
//     },
// };

// const handler = nc({
//     onError: (err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).end("Something broke!");
//     },
//     onNoMatch: (req, res) => {
//         res.status(404).end("Page not found");
//     },
// }).use(cors()) 
//     .post(async (req, res) => {
//         try {
//             //const { email, password } = req.body;
//             console.log(req.body);

//             const savedUser = await pool.query("INSERT INTO 'Users' (email, password) VALUES ($1, $2)", [req.body.email, req.body.password])
//             // if (!(email && password)) {
//             //     res.status(400).send("All inputs are required");
//             // }

//             res.status(200).json(savedUser);
//         } catch (error) {
//             res.status(400).json({ message: `Something went wrong ${error.message}` });
//         }
//     })

// export default handler;