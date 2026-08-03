import React from 'react';
import { 
  IndianRupee, 
  CalendarDays, 
  Building2, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// --- Dummy Data ---
const revenueData = [
  { name: 'Jan', revenue: 40000, bookings: 240 },
  { name: 'Feb', revenue: 30000, bookings: 139 },
  { name: 'Mar', revenue: 45000, bookings: 380 },
  { name: 'Apr', revenue: 60000, bookings: 390 },
  { name: 'May', revenue: 55000, bookings: 480 },
  { name: 'Jun', revenue: 70000, bookings: 380 },
  { name: 'Jul', revenue: 85000, bookings: 430 },
];

const propertyTypesData = [
  { name: 'Hotels', value: 45 },
  { name: 'Resorts', value: 25 },
  { name: 'Homestays', value: 20 },
  { name: 'Apartments', value: 10 },
];

const recentBookings = [
  { id: 'BK-1001', guest: 'Rahul Sharma', property: 'Taj Mahal Palace', amount: '₹12,500', status: 'Confirmed', date: 'Oct 24, 2026' },
  { id: 'BK-1002', guest: 'Priya Patel', property: 'Goa Beach Resort', amount: '₹8,200', status: 'Pending', date: 'Oct 23, 2026' },
  { id: 'BK-1003', guest: 'Amit Kumar', property: 'Himalayan Homestay', amount: '₹3,500', status: 'Completed', date: 'Oct 22, 2026' },
  { id: 'BK-1004', guest: 'Sneha Gupta', property: 'City Center Apartment', amount: '₹5,800', status: 'Cancelled', date: 'Oct 22, 2026' },
];

const MetricCard = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-50 text-[#2563eb] rounded-lg">
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      </div>
      <div className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">Welcome back. Here is what's happening on SmartStay today.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value="₹3,45,200" icon={IndianRupee} trend="12.5%" isPositive={true} />
        <MetricCard title="Total Bookings" value="1,248" icon={CalendarDays} trend="8.2%" isPositive={true} />
        <MetricCard title="Active Properties" value="156" icon={Building2} trend="3.1%" isPositive={true} />
        <MetricCard title="New Users" value="892" icon={Users} trend="1.4%" isPositive={false} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Revenue Analytics</h3>
              <p className="text-[10px] font-semibold text-slate-500">Monthly revenue breakdown</p>
            </div>
            <button className="text-[10px] font-bold text-[#2563eb] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
              View Report
            </button>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Types Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900">Property Types</h3>
            <p className="text-[10px] font-semibold text-slate-500">Distribution of listings</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyTypesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Bookings</h3>
            <p className="text-[10px] font-semibold text-slate-500">Latest transactions across all properties</p>
          </div>
          <button className="text-[10px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Booking ID</th>
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Guest</th>
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Property</th>
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Amount</th>
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                <th className="py-3 px-5 text-[9px] font-bold uppercase tracking-widest text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700 divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-5 text-[#2563eb]">{booking.id}</td>
                  <td className="py-3 px-5 text-slate-900">{booking.guest}</td>
                  <td className="py-3 px-5">{booking.property}</td>
                  <td className="py-3 px-5 font-bold">{booking.amount}</td>
                  <td className="py-3 px-5">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{booking.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
