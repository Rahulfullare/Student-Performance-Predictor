let mysql=require("mysql2");
require("dotenv").config();


let conn = mysql.createConnection({
    host:process.env.db_host ,
    user:process.env.db_username ,
    password:process.env.db_password ,
    database:process.env.db_dbname

});


conn.connect((err)=>{
    if(err){
        console.log("Database is not Connected");
    }
    else 
    {
        console.log("Database Connected")
    }
});

module.exports=conn ;