function prepareResponse(isSuccess, data, msg)
{
    return {
        "isSuccess": isSuccess,
        "data": data,
        "message": msg
    }
}

module.exports = { prepareResponse }