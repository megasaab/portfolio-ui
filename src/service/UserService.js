import $api from "../http/https";

export default class UserService {
    static async fetchUsers() {
        return $api.get('/users/all')
    }

    static async addPortfolio() {
        return $api.post('/users/add-portfolio', {})
    }
}