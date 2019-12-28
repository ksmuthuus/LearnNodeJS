const returnError = (res, code, type, msg) => {
    return res.status(code).send({
        error: type,
        message: msg
    })
}

module.exports = returnError