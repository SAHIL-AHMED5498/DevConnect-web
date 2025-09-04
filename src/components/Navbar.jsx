import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router'
import { removeUser } from '../store/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeFeed } from '../store/feedSlice';
import toast from 'react-hot-toast';
import { MessageCircle } from "lucide-react";

const Navbar = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const requests=useSelector(store=>store?.requests);
  const dispatch=useDispatch();

 const handleChat = () => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-orange-100 shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
    >
      <MessageCircle className="text-blue-500 mr-3" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">
          ✨Chat feature is under development 🚧
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Stay tuned! We’re working on something exciting.
        </p>
      </div>
    </div>
  ));
};

    const handleLogout=async()=>{
      dispatch(removeUser());
      dispatch(removeFeed());
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      navigate("/login");
    }
  
  return (
    <>
        <div className="navbar bg-base-300 shadow-sm">

  <div className="flex-1 flex items-center gap-1">
    <Link to={"/"} className="btn btn-ghost text-xl" >👨🏻‍💻Dev-Connect</Link>
  
  </div>

  

  <div className="flex items-center gap-2 sm:gap-8 mr-3 sm:mx-10 ">

    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    {/*https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp */}

{user && (
  <div className="relative">
    <button
      onClick={() => navigate("/requests")}
      className="btn btn-square btn-ghost relative"
    >
      <svg
        className="size-[1.2em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </g>
      </svg>
    </button>

    
    {<span className="absolute top-3 right-2 block h-2 w-2 rounded-full bg-red-400"></span>}
  </div>
)}


    {user&&<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img 
            alt="Tailwind CSS Navbar component"
            src={user.profileImg||"/img/profile3.svg"} />
        </div>
      </div>



      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
           
          </Link>
        </li>

         <li>
          <Link to={""} onClick={handleChat} className="justify-between">
            Chats
            <span className="badge text-amber-500 bg-amber-50">New</span>
          </Link>
        </li>

        <li><Link to={"/connections"}>Connections</Link></li>
        


       
        <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
      </ul>



    </div>}




  </div>



</div>
    </>
  )
}

export default Navbar
