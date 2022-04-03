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

    static async editPortfolio(id, portfolio) {
        return $api.post(`/portfolio/edit-portfolio`, { id, portfolio })
    }

    static async editProject(id, project) {
        return $api.post(`/portfolio/edit-project`, { id, project })
    }

    static async createProject(project) {
        return $api.post(`/portfolio/create-project`, project )
    }

    static async deleteProject(id) {
        return $api.post(`/portfolio/delete-project`, {id} )
    }
}