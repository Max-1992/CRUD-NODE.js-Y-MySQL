

const success = (res, data, status = 200) => {

    res.status(status).json({
        ok: true,
        data
    });

};

const successAuthentication = (res, data, token, status = 200) => {

    res.header({ 'Authorization': token }).status(status).json({
        ok: true,
        data
    });

};

const successFiles = (res, pathImage, status = 200) => {

    res.status(status).sendFile(pathImage);

};

const error = (res, error, status = 500) => {

    res.status(status).json({
        ok: false,
        error
    });

}

module.exports = {
    success,
    successAuthentication,
    error,
    successFiles
}