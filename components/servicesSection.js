const file = require("../lib/file");
const folder = require("../lib/folder");
const utils = require("../lib/utils");

async function  servicesSection() {
    function isValid(service) { // atfiltruoti tik validzias ir aktyvias paslaugas, t.y. ju objektus
        if(typeof service !== 'object' 
            || service === null
            || Array.isArray(service)
            || Object.keys(service).length !== 3
            || !service.icon
            || !service.title
            || !service.description
            || typeof service.icon !== 'string'
            || typeof service.title !== 'string'
            || typeof service.description !== 'string'
            || service.icon.length > 20
            || service.title.length > 40
            || service.description.length > 200) {
            return false;
        }
        return true;
    }

    const services = [];
    //perskaitome kokie failai yra: /data/services
    const fileList = await folder.read('data/services');
    //gauname sarasa paslaugu JSON failu
    for (const fileName of fileList){
        
        if (utils.fileExtension(fileName) === 'json'){ //apsauga , kad skaitytu tik json failus
            const fileContent = await file.read('data/services', fileName);
            const obj = utils.parseJSONtoObject(fileContent); //visus JSON failus issiparsinti, konvertuoji i JS objekta (funkcija yra utils.js)
            if(obj && isValid(obj)) {
                services.push(obj);
            }
        }
    }
    console.log(services);

    

    //su ciklu sukonstruoti galutini paslaugu HTML
    //ta HTML istatyti i reikiama vieta return stringe






    return `<section class="container bg-gradient services">
        <div class="row">
            <h2>Services</h2>
            <p>Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back into the development of the asset through its charitable foundation.</p>
        </div>
        <div class="row services-list">
            <div class="service">
                <i class="icon fa fa-plane"></i>
                <h3 class="title">Paid Search and Social Management</h3>
                <p class="description">Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back</p>
            </div>
            <div class="service">
                <i class="icon fa fa-globe"></i>
                <h3 class="title">Direct Response Content</h3>
                <p class="description">Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back</p>
            </div>
            <div class="service">
                <i class="icon fa fa-bath"></i>
                <h3 class="title">CRO and Retention Optimizations</h3>
                <p class="description">Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back</p>
            </div>
        </div>
    </section>`;
}

module.exports = servicesSection;