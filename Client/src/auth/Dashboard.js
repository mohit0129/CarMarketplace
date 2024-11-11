import React, { useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";

function Dashboard(){
    const [Dashboard,setDashboard] = React.useState("");

    function logout(){
        localStorage.clear();
        window.location='Login';
    }

    useEffect(() => {
        if(localStorage.getItem("name")) {
            var a = localStorage.getItem("name")
            setDashboard(a);
        }
        else{
            window.location = "Login"
        }
    })
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg">
          <form className="space-y-6 p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>
            <p className="text-center text-lg text-gray-700">Hi, {Dashboard}</p>
            <div className="space-y-4">
              <Link 
                to="/ChangePassword" 
                className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Change Password
              </Link>
              <Link 
                to="/Profile" 
                className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Your Profile
              </Link>
              <button 
                onClick={logout} 
                type="button" 
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>

    )
}
export default Dashboard;