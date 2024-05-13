import express from "express";
import authentication from "../middlewares/authentication.js";
import { savePrefs, fetchPrefs } from "../controllers/prefs.js";

const router = express.Router();

router.use(authentication);

router.post('/preferences', savePrefs);
router.get('/preferences', fetchPrefs);

export default router;