const IsValid = require("./IsValid.js");

describe('IsValid.username()', () => {
    describe('Ivestas netinkamas username', () => {
        test('username nera', () => {
            expect(IsValid.username('')).toBe('Forgot to type username');
        });
        test('username yra per trumpas', () => {
            expect(IsValid.username('Ba')).toBe('Username is too short');
        });
        test('username yra per ilgas', () => {
            expect(IsValid.username('Babababarabananasasis')).toBe('Username is too long');
        });
        test('username negali tureti paskutinio simbolio "."', () => {
            expect(IsValid.username('.Babaranas*.')).toBe('dot (.) symbol can not be last');
        });
        test('username negali tureti paskutinio simbolio "_"', () => {
            expect(IsValid.username('Babaranas*_')).toBe('_ symbol can not be last');
        });
        test('username negali tureti pirmo simbolio "_"', () => {
            expect(IsValid.username('_Babaranas*')).toBe('_ symbol can not be first');
        });
        test('username negali dvieju _ simboliu is eiles', () => {
            expect(IsValid.username('Baba__ranas*')).toBe('more than one _ symbol in a row');
        });
        test('username negali dvieju . simboliu is eiles', () => {
            expect(IsValid.username('Baba..ranas*')).toBe('more than one . symbol in a row');
        });
        test('username negali tureti pradzioje "."', () => {
            expect(IsValid.username('.Babaranas*')).toBe('dot (.) symbol can not be first');
        });
        test('username yra netinkamas simbolis', () => {
            expect(IsValid.username('Babaranas*')).toBe('Username can not contain this symbol (*)');
        });
        test('username yra tinkamas', () => {
            expect(IsValid.username('Babaranas12')).toBeTruthy();
        });
    });
});

describe('IsValid.email()', () => {
    describe('Ivestas netinkamas email', () => {
        test('email nera', () => {
            expect(IsValid.email('')).toBe('Forgot to type email');
        });
        test('Netinkamas email (nera @)', () => {
            expect(IsValid.email('brokerisLukas.com')).toBe('There is no @ symbol');
        });
        test('@ pradzioje', () => {
            expect(IsValid.email('@brokerisLukas.com')).toBe('@ symbol can not be first');
        });
        test('Netinkamas email (du @ simboliai)', () => {
            expect(IsValid.email('brokeris@Lu@kas.com')).toBe('more than one @ symbol');
        });
        test('Netinkamas email (yra tarpas)', () => {
            expect(IsValid.email('broke ris@Lukas.com')).toBe('There is a gap in the text');
        });
        test('. negali buti paskutinis simbolis', () => {
            expect(IsValid.email('brokeris@Lukas.com.')).toBe('dot (.) symbol can not be last');
        });
        test('. negali buti pirmas simbolis', () => {
            expect(IsValid.email('.brokeris@Lukas.com')).toBe('dot (.) symbol can not be first');
        });
        test('. negali buti paeiliui', () => {
            expect(IsValid.email('brokeri..s@Lukas.com')).toBe('more than one . symbol in a row');
        });
        test('Tinkamas email', () => {
            expect(IsValid.email('brokeris@Lukas.com')).toBeTruthy();
        });
        test('Tinkamas email', () => {
            expect(IsValid.email('broker!$@Lukas.com')).toBeTruthy();
        });
    });
});


describe('IsValid.password()', () => {
    describe('Ivestas netinkamas password', () => {
        test('password nera', () => {
            expect(IsValid.password('')).toBe('Forgot to type password');
        });
        test('password yra per trumpas', () => {
            expect(IsValid.password('weee567ew')).toBe('Password is too short');
        });
        test('password neturi didziosios raides', () => {
            expect(IsValid.password('eeeorrrrttoyytfweassdddss')).toBe('Password should contain at least one capital letter');
        });
        test('password neturi skaiciaus', () => {
            expect(IsValid.password('Aoooooooooossaoooo')).toBe('Password should contain at least one number');
        });
        test('password neturi simbolio', () => {
            expect(IsValid.password('Aooo1oooooossaoooo')).toBe('Password should contain at least one special symbol');
        });
        test('Tinkamas password', () => {
            expect(IsValid.password('Aooo1oooooossaoooo!')).toBeTruthy();
        });
        
    });
});