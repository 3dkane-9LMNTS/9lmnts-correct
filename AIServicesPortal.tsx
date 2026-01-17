import { useState } from 'react';
import { Brain, Bot, Zap, Target, MessageSquare, BarChart3, Users, TrendingUp, ArrowRight, Check, Star } from 'lucide-react';

export function AIServicesPortal({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const aiServices = [
    {
      id: 'lead-generation',
      title: 'AI Lead Generation',
      description: 'Automated prospect identification and qualification using advanced AI algorithms',
      icon: Target,
      features: [
        'Multi-platform prospect scanning',
        'AI-powered lead scoring',
        'Automated qualification',
        'Real-time lead updates'
      ],
      price: '$1,500/month',
      action: 'Start Lead Generation'
    },
    {
      id: 'content-creation',
      title: 'AI Content Creation',
      description: 'Generate marketing content, social posts, and outreach materials automatically',
      icon: MessageSquare,
      features: [
        'Blog post generation',
        'Social media content',
        'Email campaigns',
        'Personalized messaging'
      ],
      price: '$1,000/month',
      action: 'Start Content Creation'
    },
    {
      id: 'business-automation',
      title: 'Business Process Automation',
      description: 'Automate repetitive tasks and streamline your workflow',
      icon: Zap,
      features: [
        'Workflow automation',
        'Task scheduling',
        'Process optimization',
        'Integration with existing tools'
      ],
      price: '$2,000/month',
      action: 'Start Automation'
    },
    {
      id: 'data-analytics',
      title: 'AI Data Analytics',
      description: 'Get insights and predictions from your business data',
      icon: BarChart3,
      features: [
        'Real-time dashboards',
        'Predictive analytics',
        'Performance tracking',
        'Custom reports'
      ],
      price: '$1,500/month',
      action: 'Start Analytics'
    },
    {
      id: 'customer-support',
      title: 'AI Customer Support',
      description: '24/7 automated customer service and support',
      icon: Users,
      features: [
        'Chatbot integration',
        'Ticket automation',
        'Knowledge base management',
        'Customer satisfaction tracking'
      ],
      price: '$1,200/month',
      action: 'Start Support'
    },
    {
      id: 'growth-optimization',
      title: 'AI Growth Optimization',
      description: 'Optimize your marketing and sales for maximum growth',
      icon: TrendingUp,
      features: [
        'A/B testing automation',
        'Conversion optimization',
        'Marketing campaign optimization',
        'ROI tracking'
      ],
      price: '$2,500/month',
      action: 'Start Optimization'
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleGetStarted = (serviceId: string) => {
    onNavigate('start-project', serviceId);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              AI Services
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            <span className="font-futuristic">AI-Powered</span><br />
            <span className="font-graffiti text-[#FF7A00]">Business Solutions</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Transform your business with our comprehensive AI services. From lead generation to customer support, 
            we have the AI solutions to scale your operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map((service) => (
              <div
                key={service.id}
                className={`bg-[#222222] border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 ${
                  selectedService === service.id
                    ? 'border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20'
                    : 'border-gray-700 hover:border-[#FF7A00]/50'
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#FF7A00] rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-semibold">{service.title}</h3>
                    <p className="text-[#FF7A00] font-bold">{service.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-[#FF7A00] mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetStarted(service.id);
                  }}
                  className="w-full bg-[#FF7A00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF9500] transition-colors flex items-center justify-center gap-2"
                >
                  {service.action}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L.O.A. Premium CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-[#222222] border-2 border-[#FF7A00] rounded-2xl p-12">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-16 h-16 text-[#FF7A00] mr-4" />
              <h2 className="text-3xl text-white font-bold">
                Want Everything?
              </h2>
            </div>
            
            <h3 className="text-2xl text-[#FF7A00] font-bold mb-4">
              L.O.A. Premium - Complete AI Automation
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get all AI services plus our exclusive Lead Orchestrator Agent that coordinates everything. 
              The ultimate solution for businesses that want complete automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="text-center">
                <div className="text-3xl text-white font-bold">$5,000</div>
                <div className="text-gray-400">Setup Fee</div>
              </div>
              <div className="text-gray-500 text-2xl">+</div>
              <div className="text-center">
                <div className="text-3xl text-white font-bold">$2,000</div>
                <div className="text-gray-400">Per Month</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('premium-loa')}
                className="bg-[#FF7A00] text-white py-4 px-8 rounded-lg font-semibold hover:bg-[#FF9500] transition-colors flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Get L.O.A. Premium
              </button>
              <button
                onClick={() => onNavigate('loa-command')}
                className="border-2 border-[#FF7A00] text-[#FF7A00] py-4 px-8 rounded-lg font-semibold hover:bg-[#FF7A00] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Bot className="w-5 h-5" />
                Try L.O.A. Command
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white text-center mb-16">
            How Our AI Services Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">1</span>
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Consultation</h3>
              <p className="text-gray-400">
                We analyze your business needs and customize AI solutions for your specific requirements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">2</span>
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Setup</h3>
              <p className="text-gray-400">
                Our team configures and integrates AI services with your existing systems
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">3</span>
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Launch</h3>
              <p className="text-gray-400">
                Go live with AI-powered automation and start seeing immediate results
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">4</span>
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Optimize</h3>
              <p className="text-gray-400">
                Continuous monitoring and improvement for maximum performance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
