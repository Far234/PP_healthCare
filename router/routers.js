const express = require('express')
const Controller = require('../Controller/controller')
const router = express()



router.get("/",Controller.landingpage)
router.post("/login",)

router.get("/register")
router.post("/register")

// router.get("/user")

module.exports = router


