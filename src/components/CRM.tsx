import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  User,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowLeft
} from 'lucide-react';

interface CRMProps {
  onNavigate: (page: string) => void;
}

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  project: string;
  status: 'active' | 'prospect' | 'completed' | 'on-hold';
  revenue: string;
  nextMeeting?: string;
  avatar?: string;
}

export function CRM({ onNavigate }: CRMProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clients: Client[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      company: 'TechCorp Inc.',
      email: 'marcus@techcorp.com',
      phone: '+1 (555) 123-4567',
      location: 'Toronto, ON',
      project: 'Corporate Clash - Enterprise',
      status: 'active',
      revenue: '$15,000 CAD',
      nextMeeting: 'Dec 15, 2025',
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      company: 'Club Vertex',
      email: 'sarah@clubvertex.com',
      phone: '+1 (555) 234-5678',
      location: 'Vancouver, BC',
      project: 'Sound Clash OS',
      status: 'active',
      revenue: '$8,500 CAD',
      nextMeeting: 'Dec 18, 2025',
    },
    {
      id: '3',
      name: 'Emma & James Wilson',
      company: 'Personal',
      email: 'emmajames@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Montreal, QC',
      project: 'The Union: Wedding OS',
      status: 'completed',
      revenue: '$5,000 CAD',
    },
    {
      id: '4',
      name: 'David Park',
      company: 'Startup Summit',
      email: 'david@startupsummit.com',
      phone: '+1 (555) 456-7890',
      location: 'Calgary, AB',
      project: 'Corporate Clash - Event',
      status: 'active',
      revenue: '$12,000 CAD',
      nextMeeting: 'Dec 20, 2025',
    },
    {
      id: '5',
      name: 'Lisa Chen',
      company: 'InnovateCo',
      email: 'lisa@innovateco.com',
      phone: '+1 (555) 567-8901',
      location: 'Toronto, ON',
      project: 'Custom Web Platform',
      status: 'prospect',
      revenue: '$0 CAD',
      nextMeeting: 'Dec 16, 2025',
    },
    {
      id: '6',
      name: 'Michael Rodriguez',
      company: 'Club Neon',
      email: 'michael@clubneon.com',
      phone: '+1 (555) 678-9012',
      location: 'Toronto, ON',
      project: 'Sound Clash OS - Quote',
      status: 'prospect',
      revenue: '$0 CAD',
    },
    {
      id: '7',
      name: 'Jennifer Kim',
      company: 'Fashion Forward',
      email: 'jen@fashionforward.com',
      phone: '+1 (555) 789-0123',
      location: 'Vancouver, BC',
      project: 'E-commerce Platform',
      status: 'on-hold',
      revenue: '$7,000 CAD',
    },
    {
      id: '8',
      name: 'Ryan Taylor',
      company: 'Beat Productions',
      email: 'ryan@beatprod.com',
      phone: '+1 (555) 890-1234',
      location: 'Ottawa, ON',
      project: 'Music Platform MVP',
      status: 'completed',
      revenue: '$10,500 CAD',
    },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    prospect: clients.filter(c => c.status === 'prospect').length,
    completed: clients.filter(c => c.status === 'completed').length,
    'on-hold': clients.filter(c => c.status === 'on-hold').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'prospect': return '#FF7A00';
      case 'completed': return '#00D4FF';
      case 'on-hold': return '#E91E63';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A0F1E] to-[#0D1829] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#00D4FF]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <button
                onClick={() => onNavigate('admin')}
                className="flex items-center gap-2 text-[#00D4FF] hover:text-[#00D4FF]/80 mb-4"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
              <h1 className="text-4xl text-white mb-2">
                Client <span className="text-[#00D4FF]">Relationship Manager</span>
              </h1>
              <p className="text-gray-400">Manage and track all your client relationships</p>
            </div>
            <button className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all flex items-center gap-2">
              <Plus size={20} />
              Add New Client
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-4 flex-wrap">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-[#00D4FF] text-[#0A0F1E]'
                    : 'bg-[#1A2332] text-gray-400 hover:bg-[#1A2332]/80'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search clients, companies, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1A2332] border border-[#00D4FF]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF]/50"
              />
            </div>
            <button className="px-6 py-3 bg-[#1A2332] border border-[#00D4FF]/20 rounded-lg text-[#00D4FF] hover:bg-[#1A2332]/80 transition-all flex items-center gap-2">
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Clients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-[#1A2332] border border-[#00D4FF]/20 rounded-xl p-6 hover:border-[#00D4FF]/50 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00D4FF] to-[#10B981] rounded-full flex items-center justify-center text-white">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white">{client.name}</div>
                      <div className="text-gray-400 text-sm">{client.company}</div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-[#0D1829] rounded-lg transition-all">
                    <MoreVertical className="text-gray-400" size={18} />
                  </button>
                </div>

                {/* Status Badge */}
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs mb-4"
                  style={{ 
                    backgroundColor: `${getStatusColor(client.status)}20`,
                    color: getStatusColor(client.status)
                  }}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </div>

                {/* Project Info */}
                <div className="mb-4 pb-4 border-b border-[#00D4FF]/10">
                  <div className="text-gray-400 text-xs mb-1">Current Project</div>
                  <div className="text-white text-sm">{client.project}</div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Mail size={14} />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Phone size={14} />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={14} />
                    {client.location}
                  </div>
                </div>

                {/* Revenue & Next Meeting */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Revenue</div>
                    <div className="text-[#10B981]">{client.revenue}</div>
                  </div>
                  {client.nextMeeting && (
                    <div className="text-right">
                      <div className="text-gray-400 text-xs mb-1">Next Meeting</div>
                      <div className="text-white text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        {client.nextMeeting}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedClient(client);
                      onNavigate('client-portal');
                    }}
                    className="flex-1 px-4 py-2 bg-[#00D4FF] text-[#0A0F1E] rounded-lg hover:bg-[#00D4FF]/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button className="px-4 py-2 bg-[#0D1829] text-[#00D4FF] rounded-lg hover:bg-[#0D1829]/80 transition-all">
                    <Edit size={16} />
                  </button>
                  <button className="px-4 py-2 bg-[#0D1829] text-[#E91E63] rounded-lg hover:bg-[#0D1829]/80 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto text-gray-400 mb-4" size={48} />
              <div className="text-white text-xl mb-2">No clients found</div>
              <div className="text-gray-400">Try adjusting your search or filters</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
