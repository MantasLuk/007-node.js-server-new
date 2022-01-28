const file = require("../lib/file");
const folder = require("../lib/folder");

async function  servicesSection() {

    //perskaitome kokie failai yra: /data/services
    const fileList = await folder.read('data/services');
    console.log(fileList);

    //gauname sarasa paslaugu JSON failu
    for (const fileName of fileList){
        const fileContent = await file.read('data/services', fileName)
        console.log(fileName);
        console.log(fileContent);
    }
    
    //visus JSON failus issiparsinti, konvertuoji i JS objekta

    


    // atfiltruoti tik validzias ir aktyvias paslaugas, t.y. ju objektus
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