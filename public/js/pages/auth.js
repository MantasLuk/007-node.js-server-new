console.log('hello, from auth pages');

const formDOM = document.querySelector('.form');
const errorsDOM =formDOM.querySelector('.form-errors');
const allInputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');


const minUserNameLength = 4;
const maxUserNameLength = 20;
const minPasswordLength = 12;
const validation = {};

validation.username = (text) => {
    text = text.trim();
    if(text.length < minUserNameLength ) {
        return 'Username is too short';
    }
    if(text.length > maxUserNameLength ) {
        return 'Username is too long';
    }
    //leistini simboliai: a-z 0-9 _ 
    const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    for(const t of text) {
        if(!allowedSymbols.includes(t)) {
            return `Username can not contain this symbol (${t})`;
        }
    }
    return true;
}

validation.email = (text) => {
    return true;
}

validation.password = (text) => {
    if(text.length < minPasswordLength){
        return 'Password is too short'
    }
    return true;
}

submitDOM.addEventListener('click', (e) => {
    e.preventDefault();
    //formos validacija - pirmine reiksmiu patikra
    const errors =[];
    let passwordValues= [];
    for(const inputDOM of allInputsDOM) {
        const { value, dataset } = inputDOM;
        const validationRule = dataset.validation;
        const validationFunction = validation[validationRule];

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

    //jeihu rado klaidu, jas atvaizduoja
    if(errors.length) {
        console.log('Correct errors, please....');
        errorsDOM.innerText = errors.join('\n');
    } else {
        console.log('Goot to GO!');
        errorsDOM.innerText = '';
    }

    //siusti duomenis
})
