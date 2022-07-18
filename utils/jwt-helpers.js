import jwt from 'jsonwebtoken';

const jwtTokens = ({users}) => {
    const user = {users}
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, {
        expiresIn: '20s' //3m
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, {
        expiresIn: '1d' //14d
    });
    return ({accessToken, refreshToken});
}

export default jwtTokens;