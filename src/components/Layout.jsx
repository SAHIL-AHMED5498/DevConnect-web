import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { Toaster } from "react-hot-toast";


const Layout = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (user) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      //console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      if (err.status == 401) {
        navigate("/login");
        return;
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
   
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <Footer />
      
    </div>
  );
};

export default Layout;
