const contactsSection = require("../components/contectsSection copy");
const heroSection = require("../components/heroSection");
const servicesSection = require("../components/servicesSection");
const PageTemplate = require("../lib/Page")



class HomePage extends PageTemplate{
    constructor(){
        super();
        this.isHomePage = true;
    }


    mainHTML(){
        return heroSection() + 
                servicesSection() + 
                contactsSection();
    }
}

module.exports = HomePage;