import $api from "../http/https";

export default class PortfolioService {
    static async getAll() {
        return $api.get('/portfolio/get-all')
    }

    static async getById(id) {
        return $api.get(`/portfolio/get-by-id/${id}`)
    }
}