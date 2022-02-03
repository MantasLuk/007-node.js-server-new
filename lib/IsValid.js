
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
        //leistini simboliai: a-z 0-9 _ 
        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
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
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            return 'wrong email'
        } 
        return true;
    }
    
    
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

module.exports = IsValid;