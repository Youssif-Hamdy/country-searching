import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar"; 

const RootLayout = () => {
  return (
    <div className="root-layout flex flex-col min-h-screen">
      <Navbar /> 
      <main className="flex-grow">
        <Outlet />
      </main>
     
    </div>
  );
};

export default RootLayout;
