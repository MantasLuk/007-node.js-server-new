import { IsValid } from "../components/IsValid.js";

console.log('hello, from auth pages');

const formDOM = document.querySelector('.form');
const errorsDOM =formDOM.querySelector('.form-errors');
const allInputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');


submitDOM.addEventListener('click', (e) => {
    e.preventDefault();
    //formos validacija - pirmine reiksmiu patikra
    const errors =[];
    const passwordValues= [];
    for(const inputDOM of allInputsDOM) {
        const { value, dataset } = inputDOM;
        const validationRule = dataset.validation;
        if(!validationRule) {
            console.error("ERROR: input turi tureti 'data-validation' attribute");
            continue;
        }
        const validationFunction = IsValid[validationRule];
        if(typeof validationFunction !== 'function') {
            console.error("ERROR: nenumatyta validavimo funkcija", validationRule);
            continue;
        }
        //tikrinama konkrecios formos reiksmes teisinguma:
        const valueState = validationFunction(value);
            
        if(valueState !== true) {
            errors.push(valueState);
        } 

        if(validationRule === 'password'){
            passwordValues.push(value);
        }
    }

    // jeigu formoje yra daugiau nei 1 psw, tai patikrinti ar visi vienodi
    if(passwordValues.length > 1){
        const initialPassword = passwordValues[0];
        for (let i=1; i < passwordValues.length; i++){
            if(initialPassword !==passwordValues[i]){
                errors.push('Passwords do not match!')
                break;
            }
        }
    }

    //jeigu rado klaidu, jas atvaizduoja
    if(errors.length) {
        console.log('Correct errors, please....');
        errorsDOM.innerText = errors.join('\n');
    } else {
        console.log('Good to GO!');
        errorsDOM.innerText = '';
    }

    //siusti duomenis
});
