import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ArrowLeft, Trash2, Edit, Save, X } from 'lucide-react';

// --- INLINE COMPONENTS (Merged for single-file compatibility) ---

// 1. StudentList Component
const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                    {student.id ? student.id.substring(student.id.length - 6) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {student.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 2. AddStudent Component
const AddStudent = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><Save size={18} /> Save</button>
        </div>
      </form>
    </div>
  );
};

// 3. EditStudent Component
const EditStudent = ({ currentStudent, onSave, onCancel }) => {
  const [formData, setFormData] = useState(currentStudent);

  useEffect(() => {
    setFormData(currentStudent);
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"><Save size={18} /> Update</button>
        </div>
      </form>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [currentStudent, setCurrentStudent] = useState(null);
  const [error, setError] = useState(null);

  // 1. Fetch Data
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // UPDATED PORT TO 5001
      const response = await axios.get('http://localhost:5001/api/students');
      setStudents(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Could not connect to backend. Ensure server is running on port 5001.");
    }
  };

  // 2. Handle Create
  const handleAddStudent = async (studentData) => {
    try {
      // UPDATED PORT TO 5001
      await axios.post('http://localhost:5001/api/students', studentData);
      fetchStudents(); 
      setView('list');
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  // 3. Handle Update
  const handleUpdateStudent = async (studentData) => {
    try {
      // UPDATED PORT TO 5001
      await axios.put(`http://localhost:5001/api/students/${currentStudent.id}`, studentData);
      fetchStudents(); 
      setView('list');
      setCurrentStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    }
  };

  // 4. Handle Delete
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      // UPDATED PORT TO 5001
      await axios.delete(`http://localhost:5001/api/students/${id}`);
      fetchStudents(); 
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Student Records 
            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 font-normal">JSON Storage</span>
          </h1>
          {view === 'list' && (
            <button 
              onClick={() => setView('add')}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={20} /> Add Student
            </button>
          )}
          {view !== 'list' && (
            <button 
              onClick={() => { setView('list'); setCurrentStudent(null); }}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft size={20} /> Back to List
            </button>
          )}
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Connection Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main>
          {view === 'list' && (
            <StudentList 
              students={students} 
              onEdit={(student) => { setCurrentStudent(student); setView('edit'); }}
              onDelete={handleDeleteStudent}
            />
          )}

          {view === 'add' && (
            <AddStudent 
              onSave={handleAddStudent} 
              onCancel={() => setView('list')}
            />
          )}

          {view === 'edit' && currentStudent && (
            <EditStudent 
              currentStudent={currentStudent}
              onSave={handleUpdateStudent}
              onCancel={() => { setView('list'); setCurrentStudent(null); }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;