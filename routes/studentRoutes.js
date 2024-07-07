const express = require("express");
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

// router object

const router=express.Router();

// routes

// get all students list

router.get("/getAll",getStudents);

// get student by id
router.get("/get/:id",getStudentById)

// create student || post

router.post("/create",createStudent)


// update student

router.put("/update/:id",updateStudent)


// delete student 

router.delete("/delete/:id",deleteStudent);




module.exports=router;