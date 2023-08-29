export default () => {
    return (req, res, next) => {
        const { authorization } = req.headers;
        if (authorization == process.env.API_KEY) {
            next();
        } else {

            res.status(200).send({
                status: 0,
                message: "Invalid Authorization"
            });
        }
    }
}