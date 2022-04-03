import $api from "../http/https";

export default class PortfolioService {
    static async getAll() {
        return $api.get('/portfolio/get-all')
    }

    static async getById(id) {
        return $api.get(`/portfolio/get-by-id/${id}`)
    }

    static async getProjectById(id) {
        return $api.get(`/portfolio/get-project-by-id/${id}`)
    }
}