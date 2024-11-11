import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from './apiConfig';

function Profile() {
    const [mydata, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        createdAt: '',  // Change created to createdAt to align with the backend field name
		lastLogin: ''
    });
    const [id, setId] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        if (storedId) {
            setId(storedId);

            // Fetch profile data based on the user ID
            axios.get(`${API_BASE_URL}/get-profile`, {
                params: { id: storedId }
            })
            .then((response) => {
                const userData = response.data;
                console.log('Fetched user data:', userData); // Debugging line
                if (userData) {
                    setData({
                        name: userData.name || '',
                        email: userData.email || '',
                        mobile: userData.mobile || '',
						createdAt: formatDate(userData.createdAt),  // Format the date
						lastLogin: formatDate(userData.lastLogin)
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching profile data', error);
            });
        }
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();  // You can format it as per your requirements
    };

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
            id: id,
            name: mydata.name,
            email: mydata.email,
            mobile: mydata.mobile,
        };

        // Send the updated data as JSON
        axios.post(`${API_BASE_URL}/update-profile`, data)
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                const msg = response.data.message;
                alert(msg);
                window.location = "/Dashboard"; // Fixed typo from "Dashbord" to "Dashboard"
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg">
        <form onSubmit={submitValue} className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Created on: {mydata.createdAt}</p>
            <p className="text-sm text-gray-600">Last Login: {mydata.lastLogin}</p>
          </div>
          <input 
            type="text" 
            name="id" 
            placeholder="Enter ID" 
            value={id} 
            disabled 
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input 
            type="text" 
            name="name" 
            placeholder="Enter Name" 
            onChange={onChange} 
            value={mydata.name} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input 
            type="text" 
            name="email" 
            placeholder="Enter Email ID" 
            onChange={onChange} 
            value={mydata.email} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input 
            type="number" 
            name="mobile" 
            placeholder="Enter Mobile No" 
            onChange={onChange} 
            value={mydata.mobile} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
        </>
    );
}

export default Profile;
