const storeToken = (token) =>
{
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    })
};

export default storeToken;