import axios from 'axios';

const API_URL = 'http://localhost:5011/api/Students';

const studentService = {
  createStudent: async (studentData) => {
    try {
      const response = await axios.post(`${API_URL}/create`, studentData);
      return response.data;
    } catch (error) {
      console.log("FULL BACKEND ERROR:", error.response?.data);
      throw error.response ? error.response.data : new Error('Network error');
   }
  },

  getAllStudents: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.log("FULL BACKEND ERROR:", error.response?.data);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log("FULL BACKEND ERROR:", error.response?.data);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.log("FULL BACKEND ERROR:", error.response?.data);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  deleteStudent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log("FULL BACKEND ERROR:", error.response?.data);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default studentService;
