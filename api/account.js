import { IsValid } from "../lib/IsValid.js";
import { file } from "../lib/file.js";
import { utils } from "../lib/utils.js";


const handler = {};

handler.account = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler.account[data.httpMethod](data, callback);
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

handler.account.post = async (data, callback) => {
    const userObj = data.payload;

    if(!userObj) {
        return callback(400, {
            status: 'error',
            msg: 'JSON obj is not valid'
        });
    }
    console.log(userObj);
    const [usernameError, usernameMsg] = IsValid.username(userObj.username);
    if(usernameError) {
        return callback(400, {
            status: 'error',
            msg: usernameMsg
        });
    }
    const [emailError, emailMsg] = IsValid.email(userObj.email);
    if(emailError) {
        return callback(400, {
            status: 'error',
            msg: emailMsg
        });
    }
    const [passwordError, passwordMsg] = IsValid.password(userObj.password);
    if(passwordError) {
        return callback(400, {
            status: 'error',
            msg: passwordMsg
        });
    }

    // sukuriam vartotoja:
    // sukuriamas failas: /data/users/[email].json
    userObj.password = utils.hash(userObj.password)
    const  creationStatus =  await file.create('/data/users', userObj.email + '.json', userObj);
    if(creationStatus !== true) {
        return callback(500, {
            status: 'error',
            msg: creationStatus
        });
    }

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