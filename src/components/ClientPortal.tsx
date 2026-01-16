import { useState } from 'react';
import {
  Download,
  Upload,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Video,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  Send,
  Paperclip,
} from 'lucide-react';

interface ClientPortalProps {
  onNavigate: (page: string) => void;
}

export function ClientPortal({ onNavigate }: ClientPortalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');

  const projectInfo = {
    name: 'Corporate Clash - Enterprise Launch',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 75,
    startDate: 'Nov 1, 2025',
    deadline: 'Dec 15, 2025',
    totalCost: '$15,000 CAD',
    paid: '$7,500 CAD',
    remaining: '$7,500 CAD',
  };

  const milestones = [
    {
      title: 'Discovery & Planning',
      status: 'completed',
      date: 'Nov 5, 2025',
      description: 'Initial requirements gathering and project scope definition',
    },
    {
      title: 'Design Phase',
      status: 'completed',
      date: 'Nov 18, 2025',
      description: 'UI/UX design mockups and brand integration',
    },
    {
      title: 'Development Sprint 1',
      status: 'in-progress',
      date: 'Dec 2, 2025',
      description: 'Core features implementation and backend setup',
    },
    {
      title: 'Testing & QA',
      status: 'upcoming',
      date: 'Dec 10, 2025',
      description: 'Quality assurance testing and bug fixes',
    },
    {
      title: 'Launch & Deployment',
      status: 'upcoming',
      date: 'Dec 15, 2025',
      description: 'Final deployment and go-live preparation',
    },
  ];

  const files = [
    {
      name: 'Corporate_Clash_Design_Mockups.pdf',
      type: 'pdf',
      size: '4.2 MB',
      uploadedBy: '9LMNTS Studio',
      date: 'Nov 18, 2025',
    },
    {
      name: 'Brand_Guidelines_TechCorp.pdf',
      type: 'pdf',
      size: '2.1 MB',
      uploadedBy: 'TechCorp Inc.',
      date: 'Nov 10, 2025',
    },
    {
      name: 'App_Screenshots_v2.zip',
      type: 'zip',
      size: '12.8 MB',
      uploadedBy: '9LMNTS Studio',
      date: 'Dec 1, 2025',
    },
    {
      name: 'Demo_Video_Preview.mp4',
      type: 'video',
      size: '45.3 MB',
      uploadedBy: '9LMNTS Studio',
      date: 'Dec 5, 2025',
    },
  ];

  const messages = [
    {
      sender: '9LMNTS Studio',
      message: 'Hey! We\'ve just completed the design phase. Please review the mockups and let us know your thoughts.',
      timestamp: 'Dec 8, 2025 - 10:30 AM',
      isClient: false,
    },
    {
      sender: 'Marcus Chen',
      message: 'Looks amazing! Love the networking grid feature. Can we add a dark mode toggle?',
      timestamp: 'Dec 8, 2025 - 2:15 PM',
      isClient: true,
    },
    {
      sender: '9LMNTS Studio',
      message: 'Absolutely! Dark mode is already built into our Event OS platform. We\'ll make sure it\'s fully customized for your brand.',
      timestamp: 'Dec 8, 2025 - 3:45 PM',
      isClient: false,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-[#10B981]" size={20} />;
      case 'in-progress':
        return <Clock className="text-[#FF7A00]" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="text-[#E91E63]" size={24} />;
      case 'image':
        return <ImageIcon className="text-[#10B981]" size={24} />;
      default:
        return <FileText className="text-[#00D4FF]" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A0F1E] to-[#0D1829] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#00D4FF]/20">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('crm')}
            className="flex items-center gap-2 text-[#00D4FF] hover:text-[#00D4FF]/80 mb-4"
          >
            <ArrowLeft size={20} />
            Back to CRM
          </button>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl text-white mb-2">{projectInfo.name}</h1>
              <p className="text-gray-400">{projectInfo.client}</p>
            </div>
            <div 
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: '#FF7A0020', color: '#FF7A00' }}
            >
              {projectInfo.status}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Project Progress</span>
              <span className="text-[#00D4FF]">{projectInfo.progress}%</span>
            </div>
            <div className="w-full bg-[#1A2332] rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#10B981] transition-all"
                style={{ width: `${projectInfo.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1A2332] p-4 rounded-lg border border-[#00D4FF]/20">
              <div className="text-gray-400 text-sm mb-1">Start Date</div>
              <div className="text-white">{projectInfo.startDate}</div>
            </div>
            <div className="bg-[#1A2332] p-4 rounded-lg border border-[#00D4FF]/20">
              <div className="text-gray-400 text-sm mb-1">Deadline</div>
              <div className="text-white">{projectInfo.deadline}</div>
            </div>
            <div className="bg-[#1A2332] p-4 rounded-lg border border-[#00D4FF]/20">
              <div className="text-gray-400 text-sm mb-1">Total Cost</div>
              <div className="text-white">{projectInfo.totalCost}</div>
            </div>
            <div className="bg-[#1A2332] p-4 rounded-lg border border-[#00D4FF]/20">
              <div className="text-gray-400 text-sm mb-1">Remaining</div>
              <div className="text-[#FF7A00]">{projectInfo.remaining}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-[#0D1829] border-b border-[#00D4FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {['overview', 'files', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-[#00D4FF] text-[#00D4FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Milestones */}
              <div className="lg:col-span-2">
                <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6">
                  <h2 className="text-white text-2xl mb-6">Project Milestones</h2>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-[#0D1829] rounded-lg"
                      >
                        <div className="mt-1">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-white">{milestone.title}</div>
                            <div className="text-gray-400 text-sm flex items-center gap-1">
                              <Calendar size={14} />
                              {milestone.date}
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm">{milestone.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="lg:col-span-1">
                <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6">
                  <h2 className="text-white text-2xl mb-6">Payment Status</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-[#0D1829] rounded-lg">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Total Project</div>
                        <div className="text-white text-xl">{projectInfo.totalCost}</div>
                      </div>
                      <DollarSign className="text-[#00D4FF]" size={32} />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg">
                      <div>
                        <div className="text-[#10B981] text-sm mb-1">Paid</div>
                        <div className="text-white text-xl">{projectInfo.paid}</div>
                      </div>
                      <CheckCircle className="text-[#10B981]" size={32} />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-lg">
                      <div>
                        <div className="text-[#FF7A00] text-sm mb-1">Remaining</div>
                        <div className="text-white text-xl">{projectInfo.remaining}</div>
                      </div>
                      <Clock className="text-[#FF7A00]" size={32} />
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all">
                    Make Payment
                  </button>
                </div>

                {/* Next Steps */}
                <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6 mt-6">
                  <h2 className="text-white text-xl mb-4">Next Steps</h2>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-[#00D4FF] mt-0.5 flex-shrink-0" size={16} />
                      Review and approve design mockups
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-[#00D4FF] mt-0.5 flex-shrink-0" size={16} />
                      Provide brand assets and content
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="text-[#FF7A00] mt-0.5 flex-shrink-0" size={16} />
                      Schedule testing session (Dec 10)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div>
              <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-2xl">Project Files</h2>
                  <button className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all flex items-center gap-2">
                    <Upload size={20} />
                    Upload File
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-[#0D1829] rounded-lg hover:bg-[#0D1829]/80 transition-all"
                    >
                      <div className="p-3 bg-[#1A2332] rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm mb-1 truncate">{file.name}</div>
                        <div className="text-gray-400 text-xs">{file.size} • {file.uploadedBy}</div>
                        <div className="text-gray-500 text-xs">{file.date}</div>
                      </div>
                      <button className="p-2 hover:bg-[#1A2332] rounded-lg transition-all">
                        <Download className="text-[#00D4FF]" size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#00D4FF]/20">
                <h2 className="text-white text-2xl">Project Messages</h2>
              </div>

              {/* Messages List */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isClient ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${msg.isClient ? 'bg-[#00D4FF]/20' : 'bg-[#0D1829]'} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`text-sm ${msg.isClient ? 'text-[#00D4FF]' : 'text-white'}`}>
                          {msg.sender}
                        </div>
                      </div>
                      <div className="text-gray-300 mb-2">{msg.message}</div>
                      <div className="text-gray-500 text-xs">{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-[#00D4FF]/20">
                <div className="flex gap-4">
                  <button className="p-3 bg-[#0D1829] rounded-lg hover:bg-[#0D1829]/80 transition-all">
                    <Paperclip className="text-[#00D4FF]" size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#0D1829] border border-[#00D4FF]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF]/50"
                  />
                  <button className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all flex items-center gap-2">
                    <Send size={20} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
