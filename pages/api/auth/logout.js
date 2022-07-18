import jwt from "jsonwebtoken";
import { setCookies } from 'cookies-next';
import prisma from "../../../utils/prisma";
import Cookies from "cookies";

//On client/frontend also delete the accessToken
export default async (req, res) => {
    const cookies = new Cookies(req, res)

    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(204).end(); //json({message: "No Content to delete"}); //No content //Incase of a situation where no cookies are available
        
        const foundUser = await prisma.users.findUnique({
          where: {
            refreshToken: refreshToken
          }
        });
        if (!foundUser) {
            cookies.set('refresh_token', { httpOnly: true, expires: Date.now() }); //sameSite: 'None', secure: true
            return res.status(204).end(); //json({ message: "No user found. Cookies cleared" });
        }
        
        //Delete refreshToken in db
        const deleteUserToken = await prisma.users.update({
            where: {
                refreshToken: refreshToken
            },
            data: {
                refreshToken: null
            }
        }); //update the refreshToken field to null
        cookies.set('refresh_token', { httpOnly: true, expires: Date.now() }); //sameSite: 'None', secure: true
        res.status(204).end(); //json({ message: "Token deleted successfully"})
      } catch (error) {
        res.status(401).json({error: error.message});
      }

}