import axios from 'axios';

const api_url = 'http://localhost:8080/aluno';

export const getAllStudents = async () => {
  const { data } = await axios.get(`${api_url}`);
  return data;
};

export const deleteStudentByMatricula = async (matricula) => {
  const { data } = await axios.delete(`${api_url}/${matricula}`);
  return data;
};

export async function createStudent(params) {
  const { data } = await axios.post(api_url, params);
  return data;
}

export const updateStudent = async (matricula, params)  => {
  const { data } = await axios.put(`${api_url}/${matricula}`, params);
  return data;
}