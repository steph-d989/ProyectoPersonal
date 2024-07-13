const manage404 = (req,res, next) => {
    res.status(404).json({
        msj:"404 not found",
        img: "../public/assets/error404.jpg"
    });
}

module.exports = manage404;