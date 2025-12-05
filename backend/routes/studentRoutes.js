const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the JSON file
const dataPath = path.join(__dirname, '../data/students.json');

// Helper functions to read/write data
const getStudentData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const saveStudentData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataPath, stringifyData);
};

// GET: Fetch all students
router.get('/', (req, res) => {
  const students = getStudentData();
  res.json(students);
});

// POST: Create student
router.post('/', (req, res) => {
  const students = getStudentData();
  // Create a new ID using Date.now()
  const newStudent = { id: Date.now().toString(), ...req.body };
  
  students.push(newStudent);
  saveStudentData(students);
  
  res.status(201).json(newStudent);
});

// PUT: Update student
router.put('/:id', (req, res) => {
  let students = getStudentData();
  const studentId = req.params.id;
  
  const index = students.findIndex(student => student.id === studentId);
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  // Update student data
  students[index] = { ...students[index], ...req.body };
  saveStudentData(students);
  
  res.json(students[index]);
});

// DELETE: Delete student
router.delete('/:id', (req, res) => {
  let students = getStudentData();
  const studentId = req.params.id;
  
  const filteredStudents = students.filter(student => student.id !== studentId);
  saveStudentData(filteredStudents);
  
  res.json({ message: 'Student deleted' });
});

module.exports = router;