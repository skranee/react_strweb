import reviewService from "../services/review-service.js";

class ReviewController {
    async getReview(req, res, next) {
        try {
            const news = await reviewService.getReviews();
            return res.json(news);
        } catch(e) {
            next(e);
        }
    }

    async createReview(req, res, next) {
        try {
            const { text, username, rate } = req.body;
            const newReview = await reviewService.createReview(username, text, rate);
            return res.json(newReview);
        } catch(e) {
            next(e);
        }
    }
}

export default new ReviewController();
