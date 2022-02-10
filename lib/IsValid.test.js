import { IsValid } from "./IsValid.js";

describe('IsValid.username()', () => {
    describe('Ivestas netinkamas username', () => {
        test('username netinkamo tipo', () => {
            const [err, msg] = IsValid.username();
            expect(err).toBe(true);
            expect(msg).toBe('username type is wrong');
        });
        test('username nera', () => {
            const [err, msg] = IsValid.username(333);
            expect(err).toBe(true);
            expect(msg).toBe('username type is wrong');
        });
        
    });
});

describe('IsValid.email()', () => {
    describe('Ivestas netinkamas email', () => {
        test('email netinkamo tipo', () => {
            const [err, msg] = IsValid.email();
            expect(err).toBe(true);
            expect(msg).toBe('email type is wrong');
        });
        test('email nera', () => {
            const [err, msg] = IsValid.email(333);
            expect(err).toBe(true);
            expect(msg).toBe('email type is wrong');
        });
    });    
});

describe('IsValid.password()', () => {
    describe('Ivestas netinkamas password', () => {
        test('password netinkamo tipo', () => {
            const [err, msg] = IsValid.password();
            expect(err).toBe(true);
            expect(msg).toBe('password type is wrong');
        });
        test('password nera', () => {
            const [err, msg] = IsValid.password(333);
            expect(err).toBe(true);
            expect(msg).toBe('password type is wrong');
        });
    });    
});