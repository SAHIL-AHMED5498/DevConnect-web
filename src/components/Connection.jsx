import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../store/connectionSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Connection = () => {

    const dispatch=useDispatch();
    const connections=useSelector((store)=>store?.connections);


    const fetchConnections=async()=>{

        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        //console.log(res)
            dispatch(addConnections(res.data))

    }

    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections){
        return <div>no connection present</div>
    }




  return (
    <>{connections&& <>
     

      <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Connections :</li>
  
        {connections.map((c)=>{
            const {_id,about,name,age,profileImg}=c;

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
  
    {/* <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
    </button> */}
    <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
    </button>
  </li>
            </div>)
        })}
  



  
</ul>
    </>}</>
   
  )
}

export default Connection
