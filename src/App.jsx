import { useState } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";


function App() {
  return (<>
  <Navbar/>


      <div className="m-2 flex justify-center items-center">
      <h1 className="text-blue-600">Vite + React</h1>
      <button className="bg-blue-300 m-2 p-2 active:scale-90 rounded">Click me !</button>
    </div>
  </>

  );
}

export default App;
