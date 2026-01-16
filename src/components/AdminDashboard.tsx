import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  Wallet, 
  Layers, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  CreditCard,
  RefreshCw,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import portfolioImage from 'figma:asset/0efcb9b1a3b9794f47a28fd25091901fd8a44db2.png'; // Mocking the import or using the unsplash one

// Real-time data fetching
const SUPABASE_URL = 'https://vfrxxfviaykafzbxpehw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RTetHqO5W4m95lRXs7aUzQ_TY8BtfWV';

// Real data interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  service_type: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

interface Project {
  id: string;
  customer_id: string;
  service_type: string;
  status: string;
  netlify_url: string;
  created_at: string;
}

// Real-time data fetching hook
const useRealData = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real customers
        const customersResponse = await fetch(`${SUPABASE_URL}/customers?order=created_at.desc`, {
          headers: { 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        // Fetch real projects
        const projectsResponse = await fetch(`${SUPABASE_URL}/projects?order=created_at.desc`, {
          headers: { 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        // Calculate real revenue
        const totalRevenue = customersData.reduce((sum: number, customer: Customer) => 
          sum + (customer.payment_status === 'completed' ? customer.amount : 0), 0);
        setRevenue(totalRevenue);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching real data:', error);
        setLoading(false);
      }
    };

    fetchData();
    
    // Real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { customers, projects, revenue, loading };
};

// Using the Unsplash image found
const PORTFOLIO_IMG = "https://images.unsplash.com/photo-1614178674352-569ec57837e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwM2QlMjBhYnN0cmFjdCUyMGN5YW4lMjBkYXJrJTIwZ2xhc3MlMjBzcGhlcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NzI4ODM3OHww&ixlib=rb-4.1.0&q=80&w=1080";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

// Mock Data for Charts
const chartData1 = [
  { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, { value: 60 }, { value: 75 }
];
const chartData2 = [
  { value: 60 }, { value: 55 }, { value: 40 }, { value: 35 }, { value: 30 }, { value: 25 }, { value: 20 }
];
const chartData3 = [
  { value: 20 }, { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, { value: 55 }
];

const pieData = [
  { name: 'Sound Clash', value: 45, color: '#00D4FF' },
  { name: 'Wedding OS', value: 30, color: '#10B981' },
  { name: 'Corporate', value: 25, color: '#2A3441' },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Use real data instead of mock data
  const { customers, projects, revenue, loading } = useRealData();
  
  // Calculate real metrics
  const activeProjects = projects.filter((p: Project) => p.status !== 'completed').length;
  const completedProjects = projects.filter((p: Project) => p.status === 'completed').length;
  const totalCustomers = customers.length;
  const recentCustomers = customers.slice(0, 5);
  
  // Real service breakdown for pie chart
  const serviceBreakdown = customers.reduce((acc: Record<string, number>, customer: Customer) => {
    const serviceName = customer.service_type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.entries(serviceBreakdown).map(([name, value]: [string, unknown]) => ({
    name,
    value: Math.round((Number(value) / customers.length) * 100),
    color: name.includes('Sales') ? '#00D4FF' : name.includes('Content') ? '#10B981' : '#2A3441'
  }));

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans selection:bg-[#00D4FF] selection:text-black">
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col p-6 hidden lg:flex">
        {/* User Profile */}
        <div className="flex items-center gap-4 mb-10 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#E91E63] p-[2px]">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div>
            <h3 className="text-sm font-bold">Ryan Crawford</h3>
            <p className="text-xs text-white/40">@homeui89 • <span className="text-[#10B981]">PRO</span></p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Wallet} label="Assets" />
          <NavItem icon={Layers} label="Projects" />
          <NavItem icon={PieChart} label="Analytics" />
          <NavItem icon={Users} label="Clients" />
          <NavItem icon={CreditCard} label="Billing" />
        </nav>

        {/* Bottom CTA */}
        <div className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00D4FF]/5 group-hover:bg-[#00D4FF]/10 transition-colors" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] flex items-center justify-center mb-3">
              <Plus size={18} />
            </div>
            <h4 className="text-sm font-bold mb-1">Create New Project</h4>
            <p className="text-xs text-white/40 mb-3">Launch a new OS instance</p>
            <button className="w-full py-2 bg-[#00D4FF] text-black text-xs font-bold rounded-lg hover:bg-[#33E0FF] transition-colors">
              Create Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
        {/* Background Gradients */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#E91E63]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Header */}
        <header className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <Layers size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Studio Overview</h1>
              <p className="text-xs text-white/40">Manage your 9LMNTS projects</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/10 text-xs font-bold flex items-center gap-2 ml-4 hover:bg-white/5 transition-colors">
              Deposit <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full bg-[#1A1A1A] border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF]/50 w-64 transition-all"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#E91E63] rounded-full border border-[#1A1A1A]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Top Cards Row */}
        <section className="mb-8 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Active Projects</h2>
            <div className="flex gap-4 text-xs font-bold text-white/40">
              <span className="text-white">24H</span>
              <span className="hover:text-white cursor-pointer">WEEK</span>
              <span className="hover:text-white cursor-pointer">MONTH</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="AI Sales Machine" 
              value={`$${customers.filter((c: Customer) => c.service_type === 'ai-sales-machine').reduce((sum: number, c: Customer) => sum + c.amount, 0).toFixed(2)}`} 
              change={`+${customers.filter((c: Customer) => c.service_type === 'ai-sales-machine').length}`} 
              data={chartData1} 
              color="#00D4FF"
              icon="music"
            />
            <StatCard 
              title="Content Repurposing" 
              value={`$${customers.filter((c: Customer) => c.service_type === 'content-repurposing-engine').reduce((sum: number, c: Customer) => sum + c.amount, 0).toFixed(2)}`} 
              change={`+${customers.filter((c: Customer) => c.service_type === 'content-repurposing-engine').length}`} 
              data={chartData2} 
              color="#E91E63" 
              isDown
              icon="heart"
            />
            <StatCard 
              title="Email Support Agent" 
              value={`$${customers.filter((c: Customer) => c.service_type === 'email-support-agent').reduce((sum: number, c: Customer) => sum + c.amount, 0).toFixed(2)}`} 
              change={`+${customers.filter((c: Customer) => c.service_type === 'email-support-agent').length}`} 
              data={chartData3} 
              color="#F59E0B"
              icon="briefcase"
            />
          </div>
        </section>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Left Column: Transactions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Activities</h2>
              <button className="text-xs font-bold text-[#00D4FF] hover:text-white transition-colors">
                View All <ChevronRight size={12} className="inline" />
              </button>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden p-6">
              {/* Tabs */}
              <div className="flex gap-8 mb-8 border-b border-white/5 pb-1">
                {['Transactions', 'Deposits', 'Withdrawals'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-4 text-sm font-bold relative transition-colors ${
                      activeTab === tab.toLowerCase() ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 text-xs font-bold text-white/40 uppercase tracking-wider mb-4 px-2">
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-1">Project</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1 text-right">Status</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {recentCustomers.map((customer: Customer, index: number) => (
                  <TableRow 
                    key={customer.id}
                    date={new Date(customer.created_at).toLocaleDateString()} 
                    amount={`$${customer.amount.toFixed(2)}`} 
                    project={customer.service_type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())} 
                    type="Payment" 
                    status={customer.payment_status === 'completed' ? 'Completed' : 'Pending'} 
                    isPositive={customer.payment_status === 'completed'} 
                  />
                ))}
                {recentCustomers.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    No recent transactions yet. Your first customer will appear here!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Portfolio & Assets */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Portfolio Card */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
               {/* Background Image Effect */}
               <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 mix-blend-screen"
                style={{ 
                  backgroundImage: `url(${PORTFOLIO_IMG})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]" />

               <div className="relative z-10 flex flex-col h-full min-h-[220px]">
                 <div className="flex justify-between items-start mb-auto">
                   <div className="p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10">
                     <Layers size={16} className="text-[#00D4FF]" />
                   </div>
                   <span className="px-3 py-1 rounded-full bg-[#00D4FF] text-black text-xs font-bold">
                     New
                   </span>
                 </div>

                 <div>
                   <h3 className="text-xl font-bold mb-1">Studio Portfolio</h3>
                   <p className="text-xs text-white/60 mb-6 max-w-[200px]">
                     Track all your active OS instances and real-time revenue streams.
                   </p>
                   
                   <div className="flex gap-3">
                     <button className="flex-1 py-3 rounded-xl bg-[#00D4FF] text-black font-bold text-xs hover:bg-[#33E0FF] transition-colors shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                       Connect Wallet
                     </button>
                     <div className="flex-1 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 text-xs font-mono flex items-center justify-center">
                       0x83...f92a
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Total Asset Chart */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h3 className="text-sm font-bold text-white/60">Total Revenue</h3>
                   <div className="text-2xl font-bold flex items-center gap-2">
                     ${revenue.toFixed(2)}
                     <span className="px-2 py-0.5 rounded-md bg-[#10B981]/20 text-[#10B981] text-xs font-bold">+{totalCustomers}</span>
                   </div>
                 </div>
                 <select className="bg-[#1A1A1A] border border-white/10 text-xs rounded-lg px-2 py-1 text-white/60 outline-none">
                   <option>USDT</option>
                   <option>CAD</option>
                 </select>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-1/2 h-[120px] relative min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={pieData}
                          innerRadius={40}
                          outerRadius={55}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RePieChart>
                    </ResponsiveContainer>
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Wallet size={20} className="text-white/40" />
                    </div>
                 </div>
                 
                 <div className="w-1/2 space-y-3">
                   {pieData.map((item) => (
                     <div key={item.name} className="flex items-center justify-between text-xs">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                         <span className="text-white/60">{item.name}</span>
                       </div>
                       <span className="font-bold">{item.value}%</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

// Sub-components

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active 
        ? 'bg-[#1A1A1A] text-[#00D4FF] border border-[#00D4FF]/20 shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
        : 'text-white/40 hover:text-white hover:bg-white/5'
    }`}>
      <Icon size={20} className={`transition-colors ${active ? 'text-[#00D4FF]' : 'group-hover:text-white'}`} />
      <span className="font-medium text-sm">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]" />}
    </button>
  );
}

function StatCard({ title, value, change, data, color, isDown = false, icon }: any) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
          {icon === 'music' && <Users size={18} />}
          {icon === 'heart' && <Wallet size={18} />}
          {icon === 'briefcase' && <CreditCard size={18} />}
        </div>
        <ArrowUpRight size={18} className="text-white/20" />
      </div>

      <div className="mb-6">
        <h3 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
        <div className="text-2xl font-bold flex items-end gap-2">
          {value}
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isDown ? 'bg-[#E91E63]/20 text-[#E91E63]' : 'bg-[#10B981]/20 text-[#10B981]'}`}>
            {change}
          </span>
        </div>
      </div>

      <div className="h-16 w-full -mx-2 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              fill={`url(#color-${title})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TableRow({ date, amount, project, type, status, isPositive }: any) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="col-span-1 text-sm font-medium text-white/60 group-hover:text-white">
        {date}
      </div>
      <div className="col-span-1 text-sm font-bold text-white">
        {amount}
      </div>
      <div className="col-span-1">
        <div className="text-sm font-medium text-white/80">{project}</div>
        <div className="text-xs text-white/40">{type}</div>
      </div>
      <div className="col-span-1">
        <span className={`text-xs font-bold ${isPositive ? 'text-[#10B981]' : 'text-[#E91E63]'}`}>
          {isPositive ? 'Buy' : 'Sell'}
        </span>
      </div>
      <div className="col-span-1 text-right">
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
          status === 'Completed' ? 'bg-[#10B981]/20 text-[#10B981]' :
          status === 'Pending' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
          'bg-[#E91E63]/20 text-[#E91E63]'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}
