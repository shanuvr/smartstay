import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  // Mock data for Platform Revenue (Area Chart)
  const revenueData = [
    { name: 'Jan', revenue: 15000, subscriptions: 4000 },
    { name: 'Feb', revenue: 18000, subscriptions: 4500 },
    { name: 'Mar', revenue: 22000, subscriptions: 5100 },
    { name: 'Apr', revenue: 20500, subscriptions: 5800 },
    { name: 'May', revenue: 26000, subscriptions: 6200 },
    { name: 'Jun', revenue: 32000, subscriptions: 7500 },
    { name: 'Jul', revenue: 38000, subscriptions: 8400 },
  ];

  // Mock data for User Growth (Bar Chart)
  const userGrowthData = [
    { name: 'Jan', guests: 1200, partners: 150 },
    { name: 'Feb', guests: 1800, partners: 180 },
    { name: 'Mar', guests: 2200, partners: 220 },
    { name: 'Apr', guests: 2800, partners: 290 },
    { name: 'May', guests: 3500, partners: 340 },
    { name: 'Jun', guests: 4100, partners: 400 },
    { name: 'Jul', guests: 5200, partners: 480 },
  ];

  // Mock data for Property Distribution (Pie Chart)
  const propertyTypesData = [
    { name: 'Hotels', value: 400 },
    { name: 'Resorts', value: 150 },
    { name: 'Villas', value: 80 },
    { name: 'Lodges', value: 60 },
    { name: 'Club Houses', value: 40 },
  ];
  
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Header section without the metric boxes */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time overview of platform growth, revenue, and user engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Financial Growth</h2>
              <p className="text-xs text-slate-500">Commissions and Subscription Revenue</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 7 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                <Area type="monotone" name="Total Revenue" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" name="Subscriptions" dataKey="subscriptions" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Property Types</h2>
            <p className="text-xs text-slate-500">Distribution across the platform</p>
          </div>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {propertyTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-3">
            {propertyTypesData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-sm text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Registration Growth Bar Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">User Acquisition</h2>
            <p className="text-xs text-slate-500">Monthly new guests vs new partners joining the platform</p>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                <Bar yAxisId="left" name="New Guests" dataKey="guests" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar yAxisId="right" name="New Partners" dataKey="partners" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
