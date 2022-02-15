import crypto from 'crypto';
import config from '../config.js';

const utils = {};

utils.randomString = (size = 20) => {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const inter = abc.length;
    let text = '';
    for (let i = 0; i < size; i++) {
        const index = Math.floor(Math.random() * inter);
        text += abc[index];
    }
    return text;
}; 


utils.hash = (text) => {
    if (typeof text === 'string' && text !== ''){
        return crypto.createHmac('sha256', config.hashingSecret).update(text).digest('hex')
    } else {
        return false;
    }
}


utils.fileExtension = (url) => {
    // css/pages/home.css -> css
    // css/pages/home.min.css -> css
    // css/pages/home.min.css?v=2.0.7 -> css

    const pathParts = url.split('?')[0].split('.');
    return pathParts[pathParts.length - 1];
}


//JSON parsina i JS objekta
utils.parseJSONtoObject = (text) => {
    try {
        return JSON.parse(text)
    } catch (error) {
        return false;
    }
}
export { utils };