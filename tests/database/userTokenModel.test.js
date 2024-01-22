const pool = require('../../database/dbConfig');
const {createUserToken, getUserToken, deleteUserToken, getUserByToken, checkTokenValid} = require('../../database/userTokenModel');

describe('User Token Model', () => {

    let test_token = NaN

    it('should create a user token in the database', async () => {
        const res = await createUserToken(1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('token');
        test_token = res.token
    });

    it('should get a user token from the database by user_id', async () => {
        const res = await getUserToken(1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('token');
    });

    it('should get a user from the database by token', async () => {
        const res = await getUserByToken(test_token);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('username');
        expect(res).toHaveProperty('email');
        expect(res).toHaveProperty('password');
    });

    it('should check if a token is valid', async () => {
        const res = await checkTokenValid('doxchtzvj8kc8hxoolg2ji00zo2zzam0');
        expect(res).toBe(true);
    });

    it('should delete a user token from the database by token', async () => {
        const res = await deleteUserToken(test_token);
        expect(res).toBe(undefined);
    });
});