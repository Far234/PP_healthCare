const {Doctor, User, Article, AskSuggestion, ProfileDoctor} = require('../models')
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
            const {name,email,password,role} = req.body

            
        } catch (error) {
            res.send(error)
        }
    }

    static getregisterpagedoctor(req,res){
        try {
            res.render("register_doctor")
            
        } catch (error) {
            res.send(error)
        }
    }

    static async postregisterpagedoctor(req,res){
        try {
            res.send(req.body)
            
        } catch (error) {
            res.send(error)
        }
    }

    static getloginpage(req,res){
        try {
            res.render("login")
            
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
            
            res.send(req.body)
            
        } catch (error) {
            res.send(error)
        }
    }

    static async pageDoctor(req, res){
        try {
            // console.log(req.user);
            // const {id} = req.user

            let data = await Doctor.findByPk(1,{
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
            
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller