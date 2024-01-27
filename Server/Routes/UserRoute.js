const express = require("express");
const router = express.Router();
const RegistercontrolUser = require("../Controller/UserController");
const { requireSingn } = require("../Middlewares/UserMidleware");
//Routing

router.get("/", RegistercontrolUser.getAllusers);
router.get("/:id", requireSingn, RegistercontrolUser.getuser);
router.post("/", RegistercontrolUser.createuser);
router.delete("/:id", requireSingn, RegistercontrolUser.deleteuser);
router.put("/:id", requireSingn, RegistercontrolUser.updateuser);
router.post("/Login", RegistercontrolUser.logincontroller);
module.exports = router;
