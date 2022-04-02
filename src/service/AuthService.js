import $api from "../http/https";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/login', { email, password });
    };

    static async registration(email, password, firstName, lastName) {
        return $api.post('/auth/register', { email, password, firstName, lastName });
    };


    static async checkAuth() {
        return $api.get('/auth/check-auth');
    };
};