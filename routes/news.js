import express from "express";
import authentication from "../middlewares/authentication.js";
import fetchNews from "../controllers/news.js";

const router = express.Router();

router.use(authentication);

router.get('/news', fetchNews);

export default router;