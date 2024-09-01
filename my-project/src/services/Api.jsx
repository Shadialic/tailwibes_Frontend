import interceptor from '../utils/interceptors/Interceptors'
const teacherApi=interceptor;

export async function RegisterTeacher(data){
  try{
    const response=await teacherApi.post('/register',data)
    return response.data
  }catch(err){
    console.log(err);
    
  }
}
export async function LoginTeacher(data){
  try{
    const response=await teacherApi.post('/login',data)
    return response.data
  }catch(err){
    console.log(err);
    
  }
}
export async function PostStudents(data){
  try{
    const response=await teacherApi.post('/postStudent',data)
    return response.data
  }catch(err){
    console.log(err);
  }
}
export async function getStudents(id){
  try{
    const response=await teacherApi.get(`/getStudent/${id}`)
    return response.data
  }catch(err){
    console.log(err);
  }
}
export async function EditStudents(data,id){
  try{
    const response=await teacherApi.put(`/editStudent/${id}`,data)
    return response.data
  }catch(err){
    console.log(err);
  }
}
export async function DeleteStudent(id){
  try{
    const response=await teacherApi.delete(`/deleteStudent/${id}`)
    return response.data
  }catch(err){
    console.log(err);
  }
}
export async function DeleteAllStudent(){
  try{
    const response=await teacherApi.delete(`/deleteAllStudent`)
    return response.data
  }catch(err){
    console.log(err);
  }
}
export async function searchStudents(search) {
  try {
    const response = await teacherApi.get(`/searchStudent?search=${search}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
