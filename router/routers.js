const express = require('express')
const Controller = require('../Controller/controller')
const router = express()


router.get("/",Controller.landingpage)


router.get("/register",Controller.registeras)

router.get("/register/patient",Controller.getregisterpage)
router.post("/register/patient",Controller.postregisterpage)

router.get("/register/doctor",Controller.getregisterpagedoctor)
router.post("/register/doctor",Controller.postregisterpagedoctor)

router.get("/login",Controller.getloginpage)
router.post("/login",Controller.postlogin)

router.use(function(req, res, next) {
    console.log('Time:', Date.now())
    console.log(req.session)
    next()
})


router.get("/doctor",Controller.pageDoctor)
router.post("/doctor", Controller.postSaran)
router.get("/doctor/addArticle", Controller.formAddArticle)
router.post("/doctor/addArticle", Controller.postAddArticle)
router.get("/doctor/myArticle", Controller.showMyArticle)
router.get("/doctor/article/edit/:id", Controller.formEditArticle)
router.post("/doctor/article/edit/:id", Controller.postEditArticle)
router.get("/doctor/article/delete/:id", Controller.deleteArticle)



// router.get("/user")

module.exports = router


