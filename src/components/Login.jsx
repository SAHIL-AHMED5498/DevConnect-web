import  { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [error,setError]=useState("");
  const [email,setEmail]=useState("test1@gmail.com");
  const [pass,setPass]=useState("Test1@123");
  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [isUser,setIsUser]=useState(true);

  const handleGuestLogin=async()=>{

      const res=await axios.post(`${BASE_URL}/signIn`,{
      email:"test1@gmail.com",
      password:"Test1@123"
      
    },{withCredentials:true})
      // console.log(res);
    dispatch(addUser(res.data));
    navigate("/");


  }

  const handleIsUser=()=>{
    setIsUser(!isUser)
  }

  const handleClick=async()=>{
    // console.log(email);
    // console.log(pass);
try{
  if(isUser){

      const res=await axios.post(`${BASE_URL}/signIn`,{
      email:email,
      password:pass
      
    },{withCredentials:true})
      // console.log(res);
    dispatch(addUser(res.data));
    navigate("/");
  }
  else{
    const res=await axios.post(`${BASE_URL}/signUp`,{email:email,password:pass,name:name,age:age, skills: "[`skill1`,`skill2`,`skill3`]", about:"new user", profileImg: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"},{withCredentials:true})
    console.log(res);
    dispatch(addUser(res.data));
    navigate("/");
  }
  


  

}
catch(err){
    if (err.response) {
      // Server responded with a status outside 2xx
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data); 
      setError(err.response.data);
      
    // your actual error message from backend
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      // Request made but no response received
      console.error("No response received:", err.request);
    } else {
      // Something else happened
      console.error("Error setting up request:", err.message);
    }
}
  
  }


  return (
    <div className='w-screen h-screen items-start flex justify-center sm:mt-4'>

    <div className="card w-96 bg-base-200 card-lg shadow-sm flex items-center justify-center">



  <div className="card-body flex flex-col items-center justify-center">

    <legend className="fieldset-legend">{(isUser)?"Login":"Sign up"}</legend>


    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  {!isUser&&<label className="label">Name</label>}
  {!isUser&&<input type="text" className="input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>}

    {!isUser&&<label className="label">Age</label>}
  {!isUser&&<input type="text" className="input" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>}

  <label className="label">Email</label>
  <input type="text" className="input"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  placeholder="Email" />

  <label className="label">Passowrd</label>
  <input type="text" className="input"
  value={pass}
  onChange={(e)=>setPass(e.target.value)}
  placeholder="Password" />

  
</fieldset>
   
    <div className="justify-center items-center card-actions flex flex-col">
      <button className="btn btn-primary active:scale-95" onClick={handleClick}>{(isUser)?"Login":"SignUp"}</button>
      <button className="btn btn-accent active:scale-95" onClick={handleGuestLogin}>guest login</button>
    </div>
    {error&& <p className='font-semibold text-sm text-red-600'>{error}</p>}
    {isUser&&<p className='cursor-pointer' onClick={handleIsUser}>not a user? <span className='text-blue-400 font-bold'>Sign Up</span></p>}
     {!isUser&&<p className='cursor-pointer' onClick={handleIsUser}>Already a user? <span className='text-blue-400 font-bold'>Sign In</span></p>}

  </div>


</div>

    </div>
  )
}

export default Login
