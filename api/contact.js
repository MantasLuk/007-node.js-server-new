const handler = {};

handler.contact = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._contact[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'This HTTPmethod is not supported'
    });
}

handler._contact = {};

handler._contact.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'contact info'
    });
}

handler._contact.post = (data, callback) => {
    // sukuriam
    return callback(200, {
        status: 'success',
        msg: 'contact is created'
    });
}

handler._contact.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'contact is deleted'
    });
}

export default handler;