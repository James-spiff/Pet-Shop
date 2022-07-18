import nc from 'next-connect';
import prisma from "../../../utils/prisma";
import bcrypt from 'bcrypt';
import jwtTokens from "../../../utils/jwt-helpers";
import authenticateToken from '../auth/middleware/authorization';
import cors from 'cors';

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page not found");
    },
}).use(cors(), authenticateToken) //another way to add middleware this will protect all the routes in this file
    .get(async (req, res) => {
        try {
            const users = await prisma.users.findMany();
            res.json({users});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

export default handler;

// Adding middleware individually to each request
// .get(authenticateToken, async (req, res) => {
//     try {
//         const users = await prisma.users.findMany();
//         res.json({users});
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// }); 