
// const verifyRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!req?.roles) return res.status(401).json({ message: "Unathorized access" });
//         const rolesArray = [...allowedRoles];
//         console.log(rolesArray);
//         console.log(req.roles);
//     }
// }