import crypto from 'crypto';
import config from '../config.js';

/**
 * Bendro pobudzio pagalbiniu funkciju rinkinys.
 */
const utils = {};

/**
 * Atsitiktiniu simboliu kratinys. Dydi galima nurodyti.
 * @param {number} size Norimo teksto ilgis (default: 20)
 * @returns {string} tekstas
 */
utils.randomString = (size = 20) => {
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const inter = abc.length;
    let text = '';

    for (let i = 0; i < size; i++) {
        const index = Math.floor(Math.random() * inter);
        text += abc[index];
    }

    return text;
}

/**
 * Norimo teksto uzkodavimas/sifravimas su `sha512` algoritmu.
 * @param {string} text Norimas uzsifruoti tekstas.
 * @returns {string|boolean} Sekmes atveju - uzsifruotas tekstas (šifras), klaidos - `false`. 
 */
utils.hash = (text) => {
    if (typeof text === 'string' && text !== '') {
        return crypto.createHmac('sha512', config.hashingSecret).update(text).digest('hex');
    }
    return false;
}

/**
 * Failo pletinio radimas is nuorodos. 
 * @param {string} url Nuorodos stringas
 * @returns {string} Failo pletinys
 */
utils.fileExtension = (url) => {
    // css/pages/home.css -> css
    // css/pages/home.min.css -> css
    // css/pages/home.min.css?v=2.0.7 -> css

    const pathParts = url.split('?')[0].split('.');
    return pathParts[pathParts.length - 1];
}

/**
 * JSON konvertavimas i JS objekta.
 * @param {string} text JSON stringas 
 * @returns {*|boolean} Sekmes atveju - validi JS reiksme, klaidos - `false`.
 */
utils.parseJSONtoObject = (text) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return false;
    }
}

/**
 * Is uzklausos `header.cookie` gauto string'o isparsintas objektas.
 * @param {string} text Cookie string
 * @returns {object} Cookie objektas (e.g. `{...}`)
 */
utils.parseCookies = (text) => {
    const obj = {};

    if (typeof text === 'string' && text !== '') {
        const cookieParts = text.split(';');

        for (const cookie of cookieParts) {
            const [key, value] = cookie.trim().split('=');
            obj[key] = value;
        }
    }

    return obj;
}

export { utils };