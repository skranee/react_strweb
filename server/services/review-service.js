import reviewModel from "../models/review-model.js";

class ReviewService {
    async getReviews() {
        return reviewModel.find();
    }

    async createReview(username, text, rate) {
        return await reviewModel.create({
            username: username,
            text: text,
            rate: rate
        })
    }
}

export default new ReviewService();
