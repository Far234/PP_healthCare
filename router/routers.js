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

router.get("/logout",Controller.logout)



const user = function(req, res, next) {
    console.log('Time:', Date.now())
    // console.log(req.session)
    if (req.session.patientid) {
        next()
    }
    else{
        let err = "login first"
        res.redirect(`/login?err=${err}`)
    }
}

const doctor = function(req, res, next) {
    console.log('Time:', Date.now())
    console.log(req.session)
    if (req.session.doctorid && req.session.role) {
        next()
    }
    else{
        let err = "login first"
        res.redirect(`/login?err=${err}`)
    }
}


router.get("/doctor",doctor,Controller.pageDoctor)
router.post("/doctor",doctor, Controller.postSaran)

router.get("/doctor/addArticle",doctor, Controller.formAddArticle)
router.post("/doctor/addArticle",doctor, Controller.postAddArticle)



// router.get("/user")

module.exports = router


