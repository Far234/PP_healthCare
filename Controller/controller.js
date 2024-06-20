
const { where } = require("sequelize")
const {Doctor, User, Article, AskSuggestion, ProfileDoctor} = require("../models")
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
            const { err } = req.query
            
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
            if (error.name === "SequelizeValidationError") {
                let err = error.errors
                res.redirect(`/register/doctor?err=${err}`)
            }
        }
    }

    static async postregisterpagedoctor(req,res){
        try {
            const {name,email,password,role} = req.body

            let data = await Doctor.create({name,role,email,password})

            await ProfileDoctor.create({DoctorId:data.id})
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
            if (name === undefined) {
                let err = "incomplete input please check again"
                res.redirect(`/login?err=${err}`)
            }
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
                        
                        res.redirect("/ user")

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
                        req.session.role = role

                        res.redirect("/doctor")
                        // res.send("login completed")
                    }
                    else{
                        res.redirect(`/login?err=${err}`)
                    }
                }
            }
            
        } catch (error) {
            res.send(error)
        }
    }

    static logout(req,res){
        try {
            req.session.destroy((err => {
                if(err){
                    res.redirect("/login")
                }
                else{
                    res.redirect("/login")
                }
            }))
        } catch (error) {
            res.send(error)
        }

    }


    static async pageDoctor(req, res){
        try {
            // console.log(req.user);
            // const {id} = req.user
            const {doctorid} = req.session
            let DoctorId = doctorid
            let data = await Doctor.findByPk(DoctorId,{
                include:{
                    model : AskSuggestion,
                    where :{
                        suggestion:null
                    },
                    include:{
                        model: User,
                        
                    }
                }
            })
            if (data === null) {
                data = await Doctor.findByPk(1)
            }
            // console.log(data);
            // res.send(data)
            res.render("pageDoctor",{data,title : `page Doctor`})
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postSaran(req, res){
        try {
            const {suggestion, id} = req.body
            // console.log(req.body);
            await AskSuggestion.update({suggestion},
                {
                    where:{
                    id: id
                }
            }
            )
            res.redirect(`/doctor`)
        } catch (error) {
            res.send(error)
        }
    }
    static async formAddArticle(req,res){
        try {
            res.render("formAddArticle", {title:`Form Add Article`})
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddArticle(req,res){
        try {

            const {doctorid} = req.session
            let DoctorId = doctorid
            // console.log(`-------------------`,req.Session);
            // console.log(`--------------------------`,doctorid);
            const {img, title, description} = req.body
            await Article.create({ title, img, description, DoctorId})
            res.redirect("/doctor/article")
        } catch (error) {
            console.log(error);
            res.send(error)

        }
    }

    static async showMyArticle(req,res){
        try {
            const {doctorid} = req.session
            let data = await Article.findAll({
                where:{
                    DoctorId:doctorid
                }
            })
            res.render("articlePersonal", {data, title:`My Article`})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async formEditArticle(req, res){
        try {
            // const {doctorid} = req.session
            const {id} = req.params
            // console.log(`-----------------------------`,id);
            let data = await Article.findByPk(id)
            // res.send(data)
            res.render("formEditArticle", {data, title:`Form Edit`})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditArticle(req,res){
        try {
            const {id} = req.params
            const {img, title, description} = req.body
            await Article.update({img, title, description},{
                where:{
                    id:id
                }
            })
            req.redirect("/doctor/myArticle")
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteArticle(req,res){
        try {
            const {id} = req.params
            await Article.destroy({
                where:{
                    id:id
                }
            })
            res.redirect("/doctor/myArticle")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async showProfile(req,res){
        try {
            const {doctorid} = req.session
            let data = await ProfileDoctor.findAll({
                where:{
                    DoctorId:doctorid
                }
            })
            // res.send(data)
            if (data.length === 1) {
                res.render("pageProfile", {title:`Page Profile`})
            }else{
                res.send(`tidak ditemukan`)
            }
        } catch (error) {
            res.send(error)
        }
    }
    static async addProfile(req, res){
        try {
            res.render("addProfile", {title:`form Add Profile`})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller