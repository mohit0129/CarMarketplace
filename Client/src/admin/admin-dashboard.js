import { Bell, ChevronDown, Home, Users, List, DollarSign, Key, Search } from "lucide-react"

export default function Component() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header Bar */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="text-2xl font-bold">Logo</div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input className="pl-8 rounded-md border px-3 py-2" placeholder="Search..." />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <span>User Profile</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-100 p-4">
          <nav className="space-y-2">
            {[
              { icon: Home, label: "Dashboard" },
              { icon: Users, label: "Users" },
              { icon: List, label: "Listings" },
              { icon: DollarSign, label: "Transactions" },
              { icon: Key, label: "Rentals" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-200 rounded">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Revenue Graph</h2>
              <div className="h-64 bg-gray-200" />
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Activity Chart</h2>
              <div className="h-64 bg-gray-200" />
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
              <div className="space-y-2">
                {["Add New Listing", "View Reports", "Manage Users"].map((label) => (
                  <button key={label} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">New Listings Table</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Listed</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, property: "Sunset Apartment", price: "$250,000", date: "2023-06-15" },
                      { id: 2, property: "Mountain View House", price: "$450,000", date: "2023-06-14" },
                      { id: 3, property: "Downtown Loft", price: "$350,000", date: "2023-06-13" },
                    ].map((listing) => (
                      <tr key={listing.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.property}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 1, property: "Sunset Apartment", type: "Sale", amount: "$250,000", date: "2023-06-15" },
                        { id: 2, property: "Mountain View House", type: "Rent", amount: "$2,500/mo", date: "2023-06-14" },
                        { id: 3, property: "Downtown Loft", type: "Sale", amount: "$350,000", date: "2023-06-13" },
                        { id: 4, property: "Seaside Villa", type: "Rent", amount: "$3,000/mo", date: "2023-06-12" },
                        { id: 5, property: "Country Cottage", type: "Sale", amount: "$180,000", date: "2023-06-11" },
                      ].map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.property}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}