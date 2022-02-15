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

    const savedUserDataJSON = await file.read('/data/users', userObj.email + '.json')
    if (!savedUserDataJSON) {
        return callback(400, {
            status: 'error',
            msg: 'Invalid email and password match'
        });
    }

    const savedUserData = utils.parseJSONtoObject(savedUserDataJSON)
    if (!savedUserData) {
        return callback(500, {
            status: 'error',
            msg: 'Internal server error while trying to ger user info'
        });
    }

    userObj.pass = utils.hash(userObj.pass);
    if (userObj.pass !== savedUserData.pass) {
        return callback(400, {
            status: 'error',
            msg: 'Invalid email and password match'
        });
    }

    const userData = {
        email: userObj.email,
        expire: Date.now() + 7 * 86400000 //galioja 7 dienas
    }

    const token = utils.randomString(20)

    const  creationStatus =  await file.create('/data/tokens', token + '.json', userData);
    if(creationStatus !== true) {
        return callback(500, {
            status: 'error',
            msg: creationStatus
        });
    }

    const cookies = [
        'login-token=' + token,
        'path=/',
        'domain=localhost',
        'max-age=86400',
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ];

    return callback(200, {
        status: 'success',
        msg: 'Sesija sukurta'
    }, {
        'Set-Cookie': cookies.join('; '),
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