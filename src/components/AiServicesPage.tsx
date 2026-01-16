import React, { useState, useEffect } from 'react';
import { Clock, Zap, Shield, Star, ArrowRight, Check } from 'lucide-react';

export function AiServicesPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 42,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const total = prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds;
        if (total <= 0) return prev;
        
        const newTotal = total - 1;
        return {
          days: Math.floor(newTotal / 86400),
          hours: Math.floor((newTotal % 86400) / 3600),
          minutes: Math.floor((newTotal % 3600) / 60),
          seconds: newTotal % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: 'ai-sales-machine',
      title: 'AI Sales Machine',
      description: 'Automated lead qualification and booking system that captures and qualifies leads 24/7, integrates with your calendar, and sends real-time notifications.',
      features: [
        'Smart lead qualification',
        'Calendar integration',
        'Real-time notifications',
        'Performance dashboard',
        'Custom branding'
      ],
      price: 2000,
      deposit: 1000,
      icon: <Zap className="w-8 h-8" />,
      popular: true
    },
    {
      id: 'content-engine',
      title: 'Content Repurposing Engine',
      description: 'AI-powered content generation and repurposing system that creates blog posts, social media content, and marketing materials automatically.',
      features: [
        'Multi-format content creation',
        'SEO optimization',
        'Social media integration',
        'Analytics tracking',
        'Automated scheduling'
      ],
      price: 1500,
      deposit: 750,
      icon: <Star className="w-8 h-8" />
    },
    {
      id: 'email-agent',
      title: 'Email Support Agent',
      description: 'Intelligent customer service automation that handles inquiries, provides instant responses, and escalates complex issues.',
      features: [
        '24/7 automated responses',
        'Ticket management',
        'Knowledge base integration',
        'Multi-language support',
        'Analytics dashboard'
      ],
      price: 1000,
      deposit: 500,
      icon: <Shield className="w-8 h-8" />
    }
  ];

  const handlePayment = (service: typeof services[0]) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.target = '_blank';

    const formData = {
      cmd: '_xclick',
      business: '9lmntstudio@gmail.com',
      item_name: `${service.title} - 50% Deposit`,
      amount: service.deposit,
      currency_code: 'USD',
      custom: JSON.stringify({
        service: service.id,
        timestamp: Date.now()
      }),
      return: window.location.href,
      cancel_return: window.location.href,
      notify_url: 'https://loax9lmnts.app.n8n.cloud/webhook/paypal-payment'
    };
    
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] to-[#FF5500] bg-clip-text text-transparent">
            AI Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your business with our AI-powered automation solutions. Each service is deployed instantly and customized to your needs.
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-[#222222] rounded-xl p-6 max-w-md mx-auto border border-[#FF7A00]/20">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 mr-2 text-[#FF7A00]" />
              <span className="text-lg font-semibold">Launch Discount Ends In:</span>
            </div>
            <div className="flex justify-center space-x-4 text-2xl font-mono font-bold">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[#FF7A00]">:</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[#FF7A00]">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[#FF7A00]">:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Save 50% on launch pricing!</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className={`bg-[#222222] rounded-xl p-8 border-2 transition-all duration-300 hover:transform hover:scale-105 ${
              service.popular ? 'border-[#FF7A00]' : 'border-[#333333]'
            }`}>
              {service.popular && (
                <div className="bg-[#FF7A00] text-[#1A1A1A] text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex items-center mb-4">
                <div className="bg-[#FF7A00]/20 p-3 rounded-lg mr-4">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#FF7A00]">${service.price}</span>
                    <span className="text-gray-400 ml-2">/project</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{service.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#FF7A00]">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 text-[#FF7A00] flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Pay 50% deposit to start:</div>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-[#FF7A00]">${service.deposit}</span>
                  <span className="text-gray-400 ml-2">USD</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate?.('start-project')}
                className="w-full bg-[#FF7A00] text-[#1A1A1A] font-semibold py-4 px-6 rounded-lg hover:bg-[#FF5500] transition-colors flex items-center justify-center group"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#222222] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#FF7A00]">How quickly will I get my AI service?</h3>
              <p className="text-gray-300">Once your payment is confirmed, we automatically create your GitHub repository, deploy to Netlify, and send your login credentials within 24 hours.</p>
            </div>
            <div className="bg-[#222222] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#FF7A00]">Can I customize the AI service?</h3>
              <p className="text-gray-300">Yes! Each service comes with a full admin dashboard where you can customize branding, responses, workflows, and integrations.</p>
            </div>
            <div className="bg-[#222222] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#FF7A00]">What if I need help?</h3>
              <p className="text-gray-300">We provide full support including documentation, video tutorials, and direct access to our development team for any customization needs.</p>
            </div>
            <div className="bg-[#222222] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#FF7A00]">Is there ongoing support?</h3>
              <p className="text-gray-300">Yes! All services include 6 months of maintenance, updates, and priority support. Extended support plans are available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
