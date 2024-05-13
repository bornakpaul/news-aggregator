import express from "express";
import authentication from "../middlewares/authentication.js";
import { savePrefs } from "../controllers/prefs.js";

const router = express.Router();

router.use(authentication);

router.post('/save', savePrefs);

export default router;