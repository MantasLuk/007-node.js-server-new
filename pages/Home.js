import { contactsSection } from "../components/contectsSection.js";
import { heroSection } from "../components/heroSection.js";
import { servicesSection } from "../components/servicesSection.js";
import { PageTemplate } from "../lib/Page.js";



class HomePage extends PageTemplate{
    constructor(){
        super();
        this.isHomePage = true;
    }


    async mainHTML() {
        return heroSection() + await servicesSection() + contactsSection();
    }
}

export { HomePage };