let db = require("../../db.js");

exports.createCourse=(CourseName)=>{
    return new Promise((resolve , reject)=>{
            db.query("insert into courses(CourseName) values(?)",[CourseName],(err,result)=>{
                    if(err){
                        reject("Course Not Save ...")
                    }
                    else{
                        resolve("Course Save Succesfully ...")
                    }
            });
    });
}

exports.viewAllCourse=()=>{
    return new Promise((resolve , reject)=>{
            db.query("select *from Courses",(err,result)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(result)
                    }
            });
    });
}

// exports.getCourseById=(cid)=>{
//         return new Promise((resolve , reject)=>{
//                 db.query("select * from courses where cid = ?",[cid],(err,result)=>{
//                         if(err){
//                             reject(err)
//                         }
//                         else{
//                             resolve(result)
//                         }
//                 });
//         });
// };

exports.getCourseById = (cid) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Courses WHERE cid = ?", [cid], (err, result) => {
            if (err) reject(err);
            else if (result.length === 0) resolve(null);
            else resolve(result[0]); // Return single course object
        });
    });
};


exports.deleteCourseById=(cid)=>{
      return new Promise((resolve , reject)=>{
            db.query("delete from courses where cid=?",[cid],(err,reuslt)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve("Success ...")
                    }
            });
      });
}


/*
exports.updateCourse = (cid, CourseName) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE courses SET CourseName = ? WHERE CourseId = ?", [CourseName, cid], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                reject("Course not found");
            } else {
                resolve("Course updated successfully");
            }
        });
    });
};
*/


exports.updateCourse=(cid,CourseName)=>{
     return new Promise((resolve , reject)=>{
           db.query("update courses set CourseName=? where cid=?",[CourseName,cid],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve("Course Updated Succesfully ...")
                }
           }) 
     });
}
     