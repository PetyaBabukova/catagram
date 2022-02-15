module.exports = (req, res, next) => {
    // console.log(req.protocol);
    // console.log(req.hostname);
    console.log(req.originalUrl);

    next();
}