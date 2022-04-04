import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";

export default class Store {
    user = {};
    isAuth = false;
    portfolio = {};



    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setPortfolio(portfolio) {
        this.portfolio = portfolio;
    }



    async login(email, password) {
        localStorage.removeItem('token')
        try {
            const res = await AuthService.login(email.toLowerCase(), password);
            localStorage.setItem('token', res.data.token);
            this.setAuth(true);
            const user = {
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                portfolioId: res.data.portfolioId,
                _id: res.data._id
            }
            this.setUser(user);
            return res;
        } catch (error) {
            return error;
        }
    }

    async register(email, password, firstName, lastName) {
        try {
            const res = await AuthService.registration(email.toLowerCase(), password, firstName, lastName);
            return res;
        } catch (error) {
            return error;
        }
    }

    async logout() {
        localStorage.removeItem('token');
        this.setAuth(false);
        this.setUser({});
    }

    async checkAuth() {
        try {
            const res = await AuthService.checkAuth();
            const user = {
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                portfolioId: res.data.portfolioId,
                _id: res.data._id
            }
            this.setAuth(true);
            this.setUser(user);
            return res
        } catch (error) {
            console.log(error);
        }
    }

}