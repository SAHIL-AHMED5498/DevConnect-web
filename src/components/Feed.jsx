import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeedUser } from '../store/feedSlice';
import axios from 'axios';

const Feed = ({user}) => {
  const dispatch=useDispatch();

  const handlelRequest=async(status,_id)=>{
   // console.log(status,_id);
    const fetchurl=`${BASE_URL}/request/send/${status}/${_id}`
    const res=axios.post(fetchurl,{},{withCredentials:true});
    dispatch(removeFeedUser(_id));

    console.log(res);
    
  }
    //console.log(user)
    const {name,age,about,profileImg,_id}=user
  return (
  <div className="card bg-base-300 w-80 shadow-sm">
  <figure>
    <img
    className='w-full h-60 object-cover rounded-lg'
      src={profileImg}
      alt="Profile-Img" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name} | {age}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center">
         <button className="btn btn-primary" onClick={()=>handlelRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handlelRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default Feed
