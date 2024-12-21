import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import API_BASE_URL from './apiConfig';
import API_BASE_URL from '../config/apiConfig';

function ForgotPassword() {
    const [mydata, setData] = React.useState({});

    const onChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const submitValue = (event) => {
        event.preventDefault();

        // Construct the data object
        const data = {
            email: mydata.email
        };

        // Send the data as JSON
        axios.post(`${API_BASE_URL}/password-reset`, data)
		
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                const msg = response.data.message;
                window.location = '/login';
                alert(msg);
            } else {
                alert("You entered the wrong email ID.");
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 from-gray-100 to-gray-200 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-lg">
          <form onSubmit={submitValue} className="space-y-6 p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h1>
            <input 
              type="text" 
              name="email" 
              placeholder="Enter Email ID" 
              onChange={onChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Get Password
            </button>
            <div className="text-center">
              <h4 className="text-sm text-gray-600">
                Back to{' '}
                <Link to="/Login" className="text-black font-semibold hover:underline">
                  Login
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ForgotPassword;
