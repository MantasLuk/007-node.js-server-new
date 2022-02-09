const handler = {};

handler.account = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler.account[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'This HTTPmethod is not supported'
    });
}

handler._account = {};

handler.account.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'account info'
    });
}

handler.account.post = (data, callback) => {
    // sukuriam
    return callback(200, {
        status: 'success',
        msg: 'account is created'
    });
}

handler.account.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'account is updated'
    });
}

handler.account.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'account is deleted'
    });
}

export default handler;