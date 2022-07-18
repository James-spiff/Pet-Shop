import jwt from "jsonwebtoken";
import prisma from "../../../utils/prisma";

export default async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const refreshToken = req.cookies.refresh_token;
        //console.log(req.cookies);
        if (refreshToken === null) return res.status(401).json({ message: "No cookies available" });
        
        const foundUser = await prisma.users.findUnique({
          where: {
            refreshToken: refreshToken
          }
        });
        //console.log(foundUser)
        //evaluate jwt
        jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET,
          (error, user) => {
            //console.log(user)
            if (error || foundUser.email !== user.email) return res.status(403).json({ error: 'User not found' });
            //issue new access token
            const accessToken = jwt.sign(
              {"email": user.email, "role": foundUser.role},
              process.env.ACCESS_SECRET,
              { expiresIn: '30s' }
            );
            res.json({ accessToken });
          }
        );
      } catch (error) {
        res.status(401).json({error: error.message});
      }

}