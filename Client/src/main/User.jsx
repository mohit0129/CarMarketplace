import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");


  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const storedName = localStorage.getItem("name");

    if (storedName) {
      const formattedName = toTitleCase(storedName);
      setName(formattedName);
    }

  }, []);

  const navigateTo = (path) => {
    navigate(path);
    setIsUserMenuOpen(false); // Close menu after navigation
  };

  function logout() {
    localStorage.clear()
    window.location = 'login'
    toast.success("Successfully logged out!");
  }

  return (
    <div className="relative flex items-center space-x-2 ml-4">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <CircleUserRound className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:block">
          {name}
        </span>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          <ul className="text-sm text-gray-700 dark:text-gray-300">
            <li>
              <button
                onClick={() => navigateTo('/dashboard')}
                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('/profile')}
                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
