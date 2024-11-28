import $api from '../http'
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username: string, password: string) {
        return $api.post<AuthResponse>('/login', {username, password}, {withCredentials: true});
    }

    static async registration(username:string , password: string, role: string) {
        return $api.post<AuthResponse>('/registration', {username, password, role}, {withCredentials: true});
    }

    static async logout() {
        return $api.post('/logout', {withCredentials: true});
    }
}
