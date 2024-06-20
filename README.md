// npx sequelize-cli model:generate --name User --attributes name:string,password:string,email:string,role:string
// npx sequelize-cli model:generate --name Doctor --attributes name:string,role:string,email:string,password:string
// npx sequelize-cli model:generate --name Article --attributes title:string,img:string,description:text,DoctorId:integer
// npx sequelize-cli model:generate --name ProfileDoctor --attributes name:string,description:string,age:integer,DoctorId:integer
// npx sequelize-cli model:generate --name AskSuggestion --attributes asking:string,suggestion:string,UserId:integer,DoctorId:integer
//--------------------------------------------------------
new added data
npx sequelize migration:generate --name add-new-column-profilePicture-profileDoctor-table