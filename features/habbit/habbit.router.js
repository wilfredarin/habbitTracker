import express from "express"
import { getAllHabbit, getHabbitDetailById, updateHabbit,getPrevHabbitDetail,getNextHabbitDetail,addHabbit,
    deleteHabbit
 } from "./habbit.controller.js";

const router = express.Router();

router.route("/").get(getAllHabbit);
router.route("/habbits/:id/:date").get(getHabbitDetailById)
router.route("/habbits/:id/:date").post(updateHabbit)
router.route("/habbits/prev/:id/:date").get(getPrevHabbitDetail)
router.route("/habbits/next/:id/:date").get(getNextHabbitDetail)
router.route("/add-habbit/").post(addHabbit);
router.route("/delete-habbit/:id").delete(deleteHabbit);
export default router;