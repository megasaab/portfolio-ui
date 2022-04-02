import $api from "../http/https";

export default class UserService {
    static async fetchUsers() {
        return $api.get('/users/all')
    }
}