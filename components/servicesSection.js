const file = require("../lib/file");
const folder = require("../lib/folder");
const utils = require("../lib/utils");

async function  servicesSection() {
    function isValid(service) { // atfiltruoti tik validzias ir aktyvias paslaugas, t.y. ju objektus
        if(
            typeof service !== 'object' 
            || service === null
            || Array.isArray(service)
            || Object.keys(service).length !== 4
            || typeof service.isActive !== 'boolean'
            || !service.icon
            || typeof service.icon !== 'string'
            || service.icon.length > 20
            || !service.title
            || typeof service.title !== 'string'
            || service.title.length > 40
            || !service.description
            || typeof service.description !== 'string'
            || service.description.length > 200){
            return false;
        }
        return true;
    }

    let servicesHTML = '';
     //perskaitome kokie failai yra: /data/services
    const filesList = await folder.read('data/services');
    //gauname sarasa paslaugu JSON failu
    for (const fileName of filesList) {
        if (utils.fileExtension(fileName) !== 'json') {
            continue;
        }

        const fileContent = await file.read('data/services', fileName);
        const obj = utils.parseJSONtoObject(fileContent); //visus JSON failus issiparsinti, konvertuoji i JS objekta (funkcija yra utils.js)
        if (!obj || !isValid(obj) || !obj.isActive) {
            continue;
        }

        servicesHTML += `<div class="service">
                            <i class="icon fa fa-${obj.icon}"></i>
                            <h3 class="title">${obj.title}</h3>
                            <p class="description">${obj.description}</p>
                        </div>`;

    }
    


//ta HTML istatyti i reikiama vieta return stringe
    return `<section class="container bg-gradient services">
        <div class="row">
            <h2>Services</h2>
            <p>Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back into the development of the asset through its charitable foundation.</p>
        </div>
        <div class="row services-list">${servicesHTML}</div>
    </section>`;
}

module.exports = servicesSection;