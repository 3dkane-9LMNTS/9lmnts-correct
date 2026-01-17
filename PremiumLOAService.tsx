import { Check, Star, Zap, Brain, Eye, Hand, Mic, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function PremiumLOAService({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedPackage, setSelectedPackage] = useState<'premium' | 'enterprise'>('premium');

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              Premium AI Service
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            <span className="font-futuristic">Lead Orchestrator Agent</span><br />
            <span className="font-graffiti text-[#FF7A00]">+ Event OS</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Complete AI-powered business automation that handles 80% of your workflow while you focus on growth
          </p>
        </div>
      </section>

      {/* L.O.A. Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white text-center mb-16">
            The Four Pillars of L.O.A. Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Brain</h3>
              <p className="text-gray-400">
                AI decision making, lead scoring, and strategic planning
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Eyes</h3>
              <p className="text-gray-400">
                Multi-platform monitoring and real-time data collection
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Hand className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Hands</h3>
              <p className="text-gray-400">
                Automated outreach, follow-ups, and task execution
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Voice</h3>
              <p className="text-gray-400">
                Personalized communication and AI-powered responses
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white text-center mb-16">
            Choose Your L.O.A. Package
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Premium Package */}
            <div className="bg-[#222222] border-2 border-[#FF7A00] rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-[#FF7A00] text-white text-sm rounded-full">
                  MOST POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl text-white font-bold mb-2 text-center">
                L.O.A. Premium
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl text-[#FF7A00] font-bold">$5,000</span>
                <span className="text-gray-400"> setup</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-2xl text-white font-bold">$2,000</span>
                <span className="text-gray-400"> /month</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  AI lead generation & qualification
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Multi-platform monitoring
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Automated outreach sequences
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Event OS integration
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  24/7 priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Monthly performance reports
                </li>
              </ul>
              
              <button 
                onClick={() => onNavigate('start-project', 'premium')}
                className="w-full bg-[#FF7A00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF9500] transition-colors"
              >
                Get Started Premium
              </button>
            </div>

            {/* Enterprise Package */}
            <div className="bg-[#222222] border-2 border-gray-600 rounded-2xl p-8">
              <h3 className="text-2xl text-white font-bold mb-2 text-center">
                L.O.A. Enterprise
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl text-white font-bold">Custom</span>
                <span className="text-gray-400"> pricing</span>
              </div>
              <div className="text-center mb-6">
                <span className="text-2xl text-white font-bold">Starts at</span>
                <span className="text-[#FF7A00]"> $10,000</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Everything in Premium
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Custom AI model training
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Dedicated infrastructure
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  White-label solutions
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-[#FF7A00] mr-3" />
                  Dedicated account manager
                </li>
              </ul>
              
              <button 
                onClick={() => onNavigate('start-project', 'enterprise')}
                className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Contact for Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-white text-center mb-16">
            How L.O.A. Transforms Your Business
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Week 1: Setup</h3>
              <p className="text-gray-400">
                We configure L.O.A. for your industry, integrate with your tools, and train the AI on your specific business needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Week 2: Launch</h3>
              <p className="text-gray-400">
                L.O.A. goes live, starts generating leads, and begins automated outreach while you monitor performance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">Week 3+: Scale</h3>
              <p className="text-gray-400">
                Continuous optimization, monthly strategy sessions, and scaling your automated revenue generation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl text-white mb-6">
            Ready to Automate 80% of Your Workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join businesses that are generating 50+ qualified leads per month with L.O.A.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('start-project', 'premium')}
              className="bg-[#FF7A00] text-white py-4 px-8 rounded-lg font-semibold hover:bg-[#FF9500] transition-colors"
            >
              Start L.O.A. Premium - $5,000
            </button>
            <button 
              onClick={() => onNavigate('start-project', 'enterprise')}
              className="border-2 border-[#FF7A00] text-[#FF7A00] py-4 px-8 rounded-lg font-semibold hover:bg-[#FF7A00] hover:text-white transition-colors"
            >
              Schedule Enterprise Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
