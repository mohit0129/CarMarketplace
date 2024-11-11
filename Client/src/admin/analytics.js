import React, { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Line, Bar, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Custom components to replace shadcn/ui components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
)

const CardHeader = ({ children }) => <div className="p-6">{children}</div>
const CardTitle = ({ children }) => <h2 className="text-xl font-semibold mb-2">{children}</h2>
const CardDescription = ({ children }) => <p className="text-gray-500">{children}</p>
const CardContent = ({ children }) => <div className="p-6 pt-0">{children}</div>

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const DropdownMenu = ({ children }) => <div className="relative">{children}</div>
const DropdownMenuTrigger = ({ children }) => children
const DropdownMenuContent = ({ children, className = "" }) => (
  <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}>
    {children}
  </div>
)
const DropdownMenuItem = ({ children, onSelect }) => (
  <a
    href="#"
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    onClick={(e) => {
      e.preventDefault()
      onSelect()
    }}
  >
    {children}
  </a>
)

export default function CarMarketplaceAnalytics() {
  const [dateRange, setDateRange] = useState("Last 30 Days")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const revenueData = [
    { date: "2023-05-01", sales: 5000, rentals: 2000 },
    { date: "2023-05-15", sales: 6000, rentals: 2500 },
  ]

  const userGrowthData = [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 150 },
  ]

  const carListingsData = [
    { name: "SUV", value: 400 },
    { name: "Sedan", value: 300 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Marketplace Analytics</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              className="w-[180px]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange}
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {isDropdownOpen && (
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => {
                setDateRange("Last 7 Days")
                setIsDropdownOpen(false)
              }}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                setDateRange("Last 30 Days")
                setIsDropdownOpen(false)
              }}>
                Last 30 Days
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Sales and rental revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Line
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#1f77b4" />
                <Line type="monotone" dataKey="rentals" stroke="#ff7f0e" />
              </Line>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user sign-ups per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Bar
                data={userGrowthData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#6baed6" />
              </Bar>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Car Listings</CardTitle>
            <CardDescription>Distribution of car categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <Pie
                data={carListingsData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Tooltip />
              </Pie>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
