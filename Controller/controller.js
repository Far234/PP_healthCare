const { where } = require("sequelize")
const {Doctor,User} = require("../models")
const bcrypt = require('bcryptjs')

class Controller{
    static landingpage(req,res){
        try {
            res.render("landingPage")
            
        } catch (error) {
            res.send(error)
        }
    }

    static registeras(req,res){
        try {
            res.render("registeras")
            
        } catch (error) {
            res.send(error)
        }
    }

    static getregisterpage(req,res){
        try {
            res.render("register")
            
        } catch (error) {
            res.send(error)
        }
    }

    static async postregisterpage(req,res){
        try {
            // console.log(req.body)
            const {name,email,password,role} = req.body

            await User.create({name,email,password,role})

            res.redirect("/login")

            
        } catch (error) {
            res.send(error)
        }
    }

    static getregisterpagedoctor(req,res){
        try {
            // let data = Doctor.findAll()
            res.render("register_doctor")
            
        } catch (error) {
            res.send(error)
        }
    }

    static async postregisterpagedoctor(req,res){
        try {
            const {name,email,password,role} = req.body

            await Doctor.create({name,role,email,password})

            res.redirect("/login")
            
        } catch (error) {
            res.send(error)
        }
    }

    static getloginpage(req,res){
        try {
            const {err}= req.query
            res.render("login",{err})
            
        } catch (error) {
            res.send(error)
        }
    }

    static async postlogin(req,res){
        try {
            //findOne dari database,check apabila doctor atau patient
            //kalau user ada check password/compare di databse
            // kalau tidak sama, ga bisa ke main home page, out error
            // kalau sama redirect main home
            //findOne sebelumnya buat kondisi untuk role user,apabila patient 
            //({where:{name:req.nody.name,role}})
            
            const {name,password,role} = req.body
            // console.log(req.body)

            if (role === "Patient") {
                let data = await User.findOne({where:{name:name}})
                let err = "username or password is wrong"
                // console.log(data)
                if (!data) {
                    res.redirect(`/login?err=${err}`)
                }
                if(data){
                    let checkvalid = bcrypt.compareSync(password,data.password)
                    if (checkvalid === true) {
                        req.sessions.patientid = data.id
                        
                        res.redirect("/home")
                        // res.send("login completed")
                    }else{
                        res.redirect(`/login?err=${err}`)
                    }
                }
            }
            else if(role === "Doctor"){
                let data = await Doctor.findOne({where:{name:name}})
                let err = "username or password is wrong"
                // console.log(data)
                if (!data) {
                    res.redirect(`/login?err=${err}`)
                }
                if(data){
                    let checkvalid = bcrypt.compareSync(password,data.password)
                    if (checkvalid === true) {
                        req.session.doctorid = data.id
                        res.redirect("/home")
                        // res.send("login completed")
                    }
                    else{
                        res.redirect(`/login?err=${err}`)
                    }
                }
            }
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async gethomepage(req,res){
        try {
            res.render("home")
            
        } catch (error) {
            res.send()
        }
    }

}

module.exports = Controller