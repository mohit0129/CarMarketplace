import { Home, Users, List, DollarSign, Key } from "lucide-react";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-100 p-4">
      <nav className="space-y-2">
        <Link to="../AdminDashboard">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
            AdminDashboard
          </button>
        </Link>
        <Link to="../UserManagement">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
            UserManagement
          </button>
        </Link>
        <Link to="../CarManagement">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
            CarManagement
          </button>
        </Link>
        <Link to="../BookingManagement">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
          BookingManagement
          </button>
        </Link>
        <Link to="../PaymentManagement">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
            PaymentManagement
          </button>
        </Link>
      </nav>
    </aside>
  );
}