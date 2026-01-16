import { Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface PricingPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pricingTiers = [
    {
      name: 'Basic Boost',
      price: '$1,000.00',
      planValue: 'basic',
      description: 'Startups/Small Projects',
      features: [
        'Initial Concept',
        '1 Revision Round',
        'Basic Mockups',
        'Mobile Responsive',
        'Basic Design Assets',
        '2 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: false,
    },
    {
      name: 'Standard Pro',
      price: '$1,500.00',
      planValue: 'standard',
      description: 'Growing Businesses',
      features: [
        'Everything in Basic Boost',
        'Full Wireframe',
        '2 Revision Rounds',
        'Full Design System Overview',
        'Component Library',
        'Interactive Prototype',
        '4 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: false,
    },
    {
      name: 'Premium Elite',
      price: '$2,000.00',
      planValue: 'premium',
      description: 'Established Brands',
      features: [
        'Everything in Standard Pro',
        'Full UX Research',
        'Unlimited Revisions',
        'Full Design System Documentation',
        'Advanced Animations',
        'Priority Support',
        'Developer Handoff',
        'Style Guide',
        '6 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: true,
    },
    {
      name: 'Custom Scale',
      price: 'Custom',
      planValue: 'custom',
      description: 'High-End/Large Scope',
      features: [
        'Large-scale Applications',
        'Full Brand Overhaul',
        'Retainer Work Available',
        'Dedicated Team',
        'Custom Timeline',
        'White Label Solutions',
        'Ongoing Support',
        '24/7 Availability',
      ],
      cta: 'Contact for Quote',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'What is included in each tier?',
      answer: 'Each tier builds on the previous one. Basic Boost covers initial concepts and mockups, Standard Pro adds wireframes and design systems, Premium Elite includes full UX research and unlimited revisions, and Custom Scale is tailored to your specific needs.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Absolutely! You can upgrade at any time during the project. We\'ll credit your previous payment toward the higher tier.',
    },
    {
      question: 'What does "Full Design System" include?',
      answer: 'A full design system includes color palettes, typography scales, component libraries, spacing guidelines, and comprehensive documentation for consistent implementation across all platforms.',
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for projects over $1,500.00 CAD. Contact us to discuss milestone-based payment options.',
    },
    {
      question: 'What is the delivery timeline?',
      answer: 'Basic Boost takes 2 weeks, Standard Pro takes 4 weeks, Premium Elite takes 6 weeks, and Custom Scale timelines are negotiated based on project scope.',
    },
    {
      question: 'What files do I receive?',
      answer: 'You receive all design files (Figma/Adobe), exported assets, documentation, and for Premium Elite and above, developer-ready specs and style guides.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            <span className="font-futuristic">The</span> <span className="font-graffiti text-[#FF7A00]">Element Levels</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect tier for your project. All plans include our signature 
            9 Elements approach to digital excellence
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.slice(0, 3).map((tier, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg transition-all ${
                  tier.popular
                    ? 'bg-[#222222] border-2 border-[#FF7A00] shadow-lg shadow-[#FF7A00]/20 scale-105'
                    : 'bg-[#222222] border border-[#FF7A00]/20'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#FF7A00] text-[#1A1A1A] text-sm rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-white text-2xl mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl text-[#FF7A00]">{tier.price}</span>
                  <span className="text-gray-400 ml-2">CAD</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-400 flex items-start">
                      <span className="text-[#FF7A00] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('start-project', tier.planValue)}
                  className={`w-full py-3 rounded-lg transition-all ${
                    tier.popular
                      ? 'bg-[#FF7A00] text-[#1A1A1A] hover:bg-[#FF7A00]/90'
                      : 'bg-transparent border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00]/10'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              All prices in Canadian Dollars (CAD). Need a custom solution?{' '}
              <a href="#" className="text-[#FF7A00] hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Compare All Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-white mb-4">
              <span className="font-futuristic">Compare All</span> <span className="font-graffiti text-[#FF7A00]">Features</span>
            </h2>
            <p className="text-gray-400">Detailed feature comparison across all tiers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-[#222222] rounded-lg border border-[#FF7A00]/20">
              <thead>
                <tr className="border-b border-[#FF7A00]/20">
                  <th className="text-left p-4 text-white">Features</th>
                  <th className="text-center p-4 text-white">Basic Boost</th>
                  <th className="text-center p-4 text-white">Standard Pro</th>
                  <th className="text-center p-4 text-white bg-[#FF7A00]/10">
                    Premium Elite
                    <div className="text-xs text-[#FF7A00] mt-1">Popular</div>
                  </th>
                  <th className="text-center p-4 text-white">Custom Scale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Initial Concept', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Mobile Responsive', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Basic Design Assets', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Revision Rounds', basic: '1', standard: '2', premium: 'Unlimited', custom: 'Unlimited' },
                  { feature: 'Basic Mockups', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Full Wireframe', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Component Library', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Interactive Prototype', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Design System Overview', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Full UX Research', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Full Design System Documentation', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Advanced Animations', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Developer Handoff', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Style Guide', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Priority Support', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Dedicated Team', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'White Label Solutions', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'Retainer Work Available', basic: false, standard: false, premium: false, custom: true },
                  { feature: '24/7 Availability', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'Delivery Time', basic: '2 weeks', standard: '4 weeks', premium: '6 weeks', custom: 'Custom' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-[#FF7A00]/10 hover:bg-[#FF7A00]/5 transition-colors">
                    <td className="p-4 text-gray-300">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="text-[#FF7A00] mx-auto" size={20} />
                        ) : (
                          <span className="text-gray-600">—</span>
                        )
                      ) : (
                        <span className="text-gray-300 text-sm">{row.basic}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="text-[#FF7A00] mx-auto" size={20} />
                        ) : (
                          <span className="text-gray-600">—</span>
                        )
                      ) : (
                        <span className="text-gray-300 text-sm">{row.standard}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-[#FF7A00]/5">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="text-[#FF7A00] mx-auto" size={20} />
                        ) : (
                          <span className="text-gray-600">—</span>
                        )
                      ) : (
                        <span className="text-gray-300 text-sm">{row.premium}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.custom === 'boolean' ? (
                        row.custom ? (
                          <Check className="text-[#FF7A00] mx-auto" size={20} />
                        ) : (
                          <span className="text-gray-600">—</span>
                        )
                      ) : (
                        <span className="text-gray-300 text-sm">{row.custom}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-white mb-4">
              <span className="font-futuristic">Frequently Asked</span> <span className="font-graffiti text-[#FF7A00]">Questions</span>
            </h2>
            <p className="text-gray-400">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#222222] rounded-lg border border-[#FF7A00]/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FF7A00]/5 transition-colors"
                >
                  <span className="text-white pr-4">{faq.question}</span>
                  <HelpCircle
                    className={`text-[#FF7A00] flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Still Have</span> <span className="font-graffiti text-[#FF7A00]">Questions?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our team is ready to help you choose the perfect plan
          </p>
          <button className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}