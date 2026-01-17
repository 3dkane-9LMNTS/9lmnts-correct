import { useState } from 'react';
import { Brain, Eye, Hand, Mic, Zap, Target, TrendingUp, Users, MessageSquare, Calendar, DollarSign, BarChart3, Settings, Play, Pause } from 'lucide-react';

export function LOACommandCenter({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'brain' | 'eyes' | 'hands' | 'voice'>('brain');
  const [isProcessing, setIsProcessing] = useState(false);

  const executeCommand = async () => {
    if (!command.trim()) return;
    
    setIsProcessing(true);
    
    // Add to history
    setCommandHistory(prev => [command, ...prev.slice(0, 9)]);
    
    // Simulate L.O.A. processing
    setTimeout(() => {
      setIsProcessing(false);
      setCommand('');
    }, 2000);
  };

  const quickCommands = {
    brain: [
      "Analyze market for SaaS companies",
      "Score leads from CRM",
      "Create strategy for Q1 growth",
      "Identify high-value prospects"
    ],
    eyes: [
      "Monitor LinkedIn for tech founders",
      "Track competitor pricing",
      "Find leads matching criteria",
      "Scan industry forums"
    ],
    hands: [
      "Send email campaign to warm leads",
      "Create follow-up sequence",
      "Book meetings with prospects",
      "Update CRM with new data"
    ],
    voice: [
      "Generate personalized message",
      "Create proposal for project",
      "Handle pricing objection",
      "Draft follow-up email"
    ]
  };

  const recentActivity = [
    { type: 'lead', message: 'Found 12 new qualified leads', time: '2 min ago', icon: Target },
    { type: 'email', message: 'Sent campaign to 50 prospects', time: '15 min ago', icon: MessageSquare },
    { type: 'meeting', message: '3 meetings scheduled today', time: '1 hour ago', icon: Calendar },
    { type: 'revenue', message: 'Pipeline value: $15,000', time: '2 hours ago', icon: DollarSign },
  ];

  const metrics = [
    { label: 'Leads Generated', value: '47', change: '+12%', icon: Users },
    { label: 'Conversion Rate', value: '23%', change: '+5%', icon: TrendingUp },
    { label: 'Active Campaigns', value: '3', change: '0%', icon: MessageSquare },
    { label: 'Revenue This Month', value: '$8,500', change: '+18%', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white font-bold mb-2">
                L.O.A. Command Center
              </h1>
              <p className="text-gray-400">
                Give commands to your Lead Orchestrator Agent
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#FF7A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9500] transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Active
              </button>
              <button className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                <Pause className="w-4 h-4" />
                Pause
              </button>
              <button 
                onClick={() => onNavigate('admin')}
                className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#222222] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#FF7A00]/20 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-[#FF7A00]" />
                  </div>
                  <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl text-white font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Interface */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Command Input */}
            <div className="bg-[#222222] border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FF7A00]" />
                Command L.O.A.
              </h2>
              
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  placeholder="Enter command for L.O.A..."
                  className="flex-1 bg-[#1A1A1A] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00]"
                />
                <button
                  onClick={executeCommand}
                  disabled={isProcessing}
                  className="bg-[#FF7A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF9500] disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Execute'}
                </button>
              </div>

              {/* Command History */}
              <div className="space-y-2">
                <h3 className="text-sm text-gray-400 mb-2">Recent Commands:</h3>
                {commandHistory.map((cmd, index) => (
                  <div key={index} className="text-sm text-gray-300 bg-[#1A1A1A] px-3 py-2 rounded">
                    {cmd}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Commands */}
            <div className="bg-[#222222] border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl text-white font-semibold mb-4">Quick Commands</h2>
              
              {/* Pillar Tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  { id: 'brain', icon: Brain, label: 'Brain' },
                  { id: 'eyes', icon: Eye, label: 'Eyes' },
                  { id: 'hands', icon: Hand, label: 'Hands' },
                  { id: 'voice', icon: Mic, label: 'Voice' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#FF7A00] text-white'
                        : 'bg-[#1A1A1A] text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Command Lists */}
              <div className="space-y-2">
                {quickCommands[activeTab].map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => setCommand(cmd)}
                    className="w-full text-left text-sm text-gray-300 bg-[#1A1A1A] px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-6">L.O.A. Activity Feed</h2>
          
          <div className="bg-[#222222] border border-gray-700 rounded-lg p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 last:pb-0 border-b border-gray-700 last:border-0">
                  <div className="w-10 h-10 bg-[#FF7A00]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-[#FF7A00]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.message}</div>
                    <div className="text-sm text-gray-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl text-white font-semibold mb-6">Performance Analytics</h2>
          
          <div className="bg-[#222222] border border-gray-700 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg text-white font-medium mb-4">Lead Generation Trend</h3>
                <div className="h-48 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-gray-500" />
                  <span className="text-gray-400 ml-2">Chart visualization</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg text-white font-medium mb-4">Conversion Funnel</h3>
                <div className="h-48 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-gray-500" />
                  <span className="text-gray-400 ml-2">Funnel visualization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
