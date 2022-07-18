// //refresh token route that uses the get refreshToken controller
// import nc from 'next-connect';
// import getRefreshToken from './getRefreshToken';

// import cors from 'cors';

// const handler = nc({
//     onError: (err, req, res, next) => {
//         console.error(err.stack);
//         res.status(500).end("Something broke!");
//     },
//     onNoMatch: (req, res) => {
//         res.status(404).end("Page not found");
//     },
// }).use(cors(), getRefreshToken)
//     .get()