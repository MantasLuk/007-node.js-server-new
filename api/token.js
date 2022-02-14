import { IsValid } from "../lib/IsValid.js";
import { file } from "../lib/file.js";
import { utils } from "../lib/utils.js";


const handler = {};

handler.token = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler.token[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'This HTTPmethod is not supported'
    });
}

handler._token = {};

handler.token.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'session info'
    });
}

//--------------------------------------------------------------

handler.token.post = async (data, callback) => {
    const userObj = data.payload;

    if(!userObj) {
        return callback(400, {
            status: 'error',
            msg: 'JSON obj is not valid'
        });
    }
    
    const [emailError, emailMsg] = IsValid.email(userObj.email);
    if(emailError) {
        return callback(400, {
            status: 'error',
            msg: emailMsg
        });
    }
    const [passwordError, passwordMsg] = IsValid.password(userObj.pass);
    if(passwordError) {
        return callback(400, {
            status: 'error',
            msg: passwordMsg
        });
    }

    // sukuriam sesija:
    // sukuriamas failas: /data/users/[email].json
    userObj.pass = utils.hash(userObj.pass);

    const  creationStatus =  await file.create('/data/tokens', userObj.email + '.json', userObj);
    if(creationStatus !== true) {
        return callback(500, {
            status: 'error',
            msg: creationStatus
        });
    }

    return callback(200, {
        status: 'success',
        msg: 'session is created'
    });
}

//---------------------------------------------------------------

handler.token.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'session is updated'
    });
}

//-----------------------------------------------------------------

handler.token.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'session is deleted'
    });
}

export default handler;