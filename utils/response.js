exports.success = (res, data, message) => {
    return res.send({
        status: "success",
        data: data,
        message: message,
    });
}

exports.error = (res, errors, message) => {
    return res.send({
        status: "error",
        errors: errors,
        message: message,
    });
}