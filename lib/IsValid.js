
class IsValid {
    static username(text){
            const minUserNameLength = 4;
            const maxUserNameLength = 20;

            text = text.trim();

        if(text === '') {
            return 'Forgot to type username';
        }
        if(text.length < minUserNameLength ) {
            return 'Username is too short';
        }
        if(text.length > maxUserNameLength ) {
            return 'Username is too long';
        }
        if(text.slice(-1) === '.'){
            return 'dot (.) symbol can not be last'
        }
        if(text.slice(-1) === '_'){
            return '_ symbol can not be last'
        }
        if(text.indexOf('_') == 0){
            return '_ symbol can not be first'
        }
        if(text.indexOf('.') == 0){
            return 'dot (.) symbol can not be first'
        }
        if(text.split('__').length -1 == true){
            return 'more than one _ symbol in a row'
        }
        if(text.split('..').length -1 == true){
            return 'more than one . symbol in a row'
        }
        //leistini simboliai: a-z 0-9 _ .
        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.';
        for(const t of text) {
            if(!allowedSymbols.includes(t)) {
                return `Username can not contain this symbol (${t})`; // 
            }
        }
        return true;
    }

    static email(text){
        if(text === ''){
            return 'Forgot to type email'
        }
        if(!text.includes('@')){
            return 'There is no @ symbol'
        }
        if(text.indexOf('@') == 0){
            return '@ symbol can not be first'
        }
        if(text.split('@').length -1 >= 2){
            return 'more than one @ symbol'
        }
        if(text.split(' ').length -1 > 0){
            return 'There is a gap in the text'
        } 
        if(text.slice(-1) === '.'){
            return 'dot (.) symbol can not be last'
        }
        if(text.indexOf('.') == 0){
            return 'dot (.) symbol can not be first'
        }
        if(text.split('..').length -1 == true){
            return 'more than one . symbol in a row'
        }
        return true;
    };
    
    
    static password(text){
        const minPasswordLength = 12;

        if(text === ''){
            return 'Forgot to type password'
        }
        if(text.length < minPasswordLength){
            return 'Password is too short'
        }
        if(text.split(/[A-Z]/).length <= 1) {
            return 'Password should contain at least one capital letter'
        }
        if(text.split(/[0-9]/).length <= 1) {
            return 'Password should contain at least one number'
        }
        if(text.split(/(?=.*[!@#$%^&*?<>_'":;`[])/).length <= 1) {
            return 'Password should contain at least one special symbol'
        }
        return true;
    }
};

export { IsValid };