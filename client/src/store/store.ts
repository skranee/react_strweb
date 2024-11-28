import { makeAutoObservable } from "mobx";
import {IUser} from "../models/IUser";
import axios from "axios";
import AuthService from "../services/UserService";
import {API_URL} from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import ReviewService from "../services/ReviewService";
import ProductService from "../services/ProductService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            localStorage.setItem('role', this.user.role)
            if(response.status === 200) {
                window.location.replace('http://localhost:5173/')
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username: string, password: string, role = 'user') {
        try {
            const response = await AuthService.registration(username, password, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            if(response.status === 200) {
                window.location.replace('http://localhost:5173/')
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth () {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true)
            this.setUser(response.data.user);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async getReviews() {
        try {
            const response = await ReviewService.getReviews()
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async createReview(username: string, text: string, rate: number) {
        try {
            const response = await ReviewService.createReview(username, text, rate);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async createProduct(userId: string, name: string, description: string, price: number, image: string) {
        try {
            const response = await ProductService.createProduct(userId, name, description, price, image);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async getProducts() {
        try {
            const response = await ProductService.getProducts();
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async editProduct(userId: string, productId: string, name: string, description: string, price: number, image: string) {
        try {
            const response = await ProductService.editProduct(userId, productId, name, description, price, image);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteProduct(userId: string, productId: string) {
        try {
            const response = await ProductService.deleteProduct(userId, productId);
            return response.data;
        } catch(e) {
            console.log(e.response?.data?.message);
        }
    }
};
