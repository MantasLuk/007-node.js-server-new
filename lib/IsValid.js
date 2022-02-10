class IsValid {
    
    static username(text) {
        if (typeof text !== 'string') {
            return [true, 'username type is wrong'];
        }
        return [false, 'Username is valid'];
    }

    static email(text) {
        if (typeof text !== 'string') {
            return [true, 'email type is wrong'];
        }
        return [false, 'email is valid'];
    }

    static password(text) {
        if (typeof text !== 'string') {
            return [true, 'password type is wrong'];
        }
        return [false, 'password is valid'];
    }
}

export { IsValid }