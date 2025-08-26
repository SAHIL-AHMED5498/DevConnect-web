import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../store/requestSlice';
import axios from 'axios';
import {BASE_URL} from "../utils/constants"

const Request = () => {
const requests=useSelector(store=>store?.requests);
  const dispatch=useDispatch();


  const fetchRequest=async()=>{
    const res=await axios.get(BASE_URL+"/user/recieved/requests",{withCredentials:true});
    //console.log(res.data);
    dispatch(addRequests(res.data))
  }
 useEffect(()=>{
  fetchRequest();
 },[]);

 if(!requests){
  return(<div>loading requests...</div>)
 }
 if(requests.length===0){
  return(<div>No requests </div>)
 }

 const reviewReq=async(status,_id)=>{

  const res=await axios.post(BASE_URL+"/request/review"+"/"+status+"/"+_id,{},{withCredentials:true});
  console.log(res)

  fetchRequest();

 }




  return (
    <>
    {requests&&<div className='sm:px-10 mt-2'>
      
      
      <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Requests :</li>
  
        {requests.map((c)=>{
            const {_id,about,name,age,profileImg}=c.fromUserId;

            return(<div key={_id} className='sm:mx-10'>

    <li className="list-row ">
    <div><img className="size-10 rounded-box" src={profileImg}/></div>

    <div>
      {/* <div>{name} | {age}</div> */}
      <div className="text-xs uppercase font-semibold opacity-60">{name} | {age}</div>
        <p className="list-col-wrap text-xs">
    {about}
    </p>
    </div>
  
    <button className="btn btn-success" onClick={()=>reviewReq("accepted",_id)}>Accept </button>
   <button className="btn btn-error" onClick={()=>reviewReq("rejected",_id)}>Reject</button>


  </li>
            </div>)
        })}
  



  
</ul>
      
      
      </div>}
      
    </>
  )
}

export default Request
