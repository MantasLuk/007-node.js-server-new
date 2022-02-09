const handler = {};

handler.service = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._service[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'This HTTPmethod is not supported'
    });
}

handler._service = {};

handler._service.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'Service info'
    });
}

handler._service.post = (data, callback) => {
    // sukuriam
    return callback(200, {
        status: 'success',
        msg: 'Service is created'
    });
}

handler._service.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'Service is updated'
    });
}

handler._service.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'Service is deleted'
    });
}

export default handler;