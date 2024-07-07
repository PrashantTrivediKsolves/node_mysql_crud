// get all students list...

const db = require("../config/db");

const getStudents= async(req,res)=>
  {
    try{
      const [data]=await db.query("SELECT * FROM student");
      if(!data)
        {
          return res.status(404).end({
            success:false,
            message:"No record found"
          })
        }
       return res.status(200).send({
          success:true,
          message:"All Students Records",
          totalStudents:data.length,
          data:data
        })
    }
    catch(error)
    {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error in Get All Student API"
      })
    }
   
  }

  // Get student by id

   const getStudentById=async(req,res)=>
    {
      try{
        const studentId=req.params.id;
        if(!studentId)
          {
            return res.status(404).send({
              success:false,
              message:"Invalid or Provided student id"
            })
          }
          // const data=await db.query(`SELECT * FROM students WHERE id=`+studentId);  // can create the problem of the sql enjection....

          const data=await db.query(`SELECT * FROM student where id=?`,[studentId]);// to prevent from the sql enjection...

          if(!data)
            {
              return res.status(404).send({
                success:false,
              message:"no record found"
              })
            }
            res.status(200).send({
              success:true,
              studentDetails:data[0]
            })
      }
      catch(error)
      {
        console.log(error);
      }
    }

    // create student 
    const createStudent= async(req,res)=>
      {
        try{
          const {id,name,fees,medium}=req.body;
          if(!name||!fees|| !medium)
            {
              return res.status(500).send({
                success:false,
                message:"provide all fields"
              })
            }
            const data=await db.query(`INSERT INTO student (id,name,fees,medium) VALUES(?,?,?,?)`,[id,name,fees,medium]);
            if(!data)
              {
                return res.status(404).send({
                  success:false,
                  message:"Error In insert query"
                })
              }
              res.status(201).send({
                success:true,
                message:"new record is created"
              })
        }
        catch(error)
        {
          console.log(error);
          res.status(500).send({
            success:false,
            message:"Error In Create Student API"
          })
        }
      }

      // update student 

      const updateStudent=async(req,res)=>
        {
          try{
            const studentyId=req.params.id;
            if(!studentyId)
              {
                return res.status(404).send({
                  success:false,
                  message:"Invalid Id or provide id"
                })
              }

              const {name,fees,medium}=req.body;
              const data=await db.query(`UPDATE  student SET name = ?, fees = ? ,medium = ? WHERE id = ?`,[name,fees,medium,studentyId]);
              if(!data)
                {
                  return res.status(404).send({
                    success:false,
                    message:"Error In update query"
                  })
                }

                res.status(200).send({
                  success:true,
                  message:"student details updated"
                })

          }
          catch(error)
          {
          console.log(error);
          res.status(500).send({
            success:false,
            message:"Error In Update Student API",
            error
          })
          }
        }

// delete student

const deleteStudent=async(req,res)=>
  {
    try{
      const studentId=req.params.id;
      if(!studentId)
        {
          return res.status(404).send({
            success:false,
            message:"please provide the valid id"
          })
        }

        await db.query(`DELETE FROM student WHERE id=?`,[studentId])

        res.status(200).send({
          success:true,
          message:"student deleted success full"
        })
    }
    catch(error)
    {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error In Delete Student API",
        error
      })
    }
  }

  module.exports={
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
  }