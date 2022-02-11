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

    const formData = {
        username: allInputsDOM[0].value,
        email: allInputsDOM[1].value,
        password: allInputsDOM[2].value,
    }


    //jeigu rado klaidu, jas atvaizduoja
    if(errors.length) {
        console.log('Correct errors, please....');
        errorsDOM.innerText = errors.join('\n');
    } else {
        errorsDOM.innerText = '';

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {

                try {
                    const obj = JSON.parse(this.responseText)
                    errorsDOM.innerHTML = obj.msg;
                    
                } catch (error) {
                    errorsDOM.innerHTML = 'Bad message from server'
                }
            }
        };
        xhttp.open("POST", "/api/account", true);
        xhttp.send(JSON.stringify(formData));
    }

    //siusti duomenis
});
