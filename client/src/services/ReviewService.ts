import $api from "../http";
import {IReview} from "../models/IReview";

export default class ReviewService {
    static async getReviews() {
        return await $api.get<IReview[]>('/reviews');
    }

    static async createReview(username: string, text: string, rate: number) {
        return await $api.post('/review', {username, text, rate}, {withCredentials: true});
    }
}
