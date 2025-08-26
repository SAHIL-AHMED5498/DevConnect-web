import { useState } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./store/store";
import Connection from "./components/Connection";
import Request from "./components/Request";


function App() {
  return (<>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Body/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<Connection/>}/>
          <Route path="/requests" element={<Request/>}/>
        </Route>

      </Routes>

      </BrowserRouter>
      </Provider>
  </>

  );
}

export default App;
