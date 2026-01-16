import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Calendar, Mail, Phone, User, Building2, Globe, MessageSquare } from 'lucide-react';

interface StartProjectPageProps {
  selectedPlan?: string;
  onNavigate: (page: string) => void;
}

export function StartProjectPage({ selectedPlan, onNavigate }: StartProjectPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plan: selectedPlan || '',
    projectType: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    description: '',
  });

  const plans = [
    { name: 'Basic Boost', price: '$1,500 CAD', value: 'basic' },
    { name: 'Standard Pro', price: '$3,000 CAD', value: 'standard' },
    { name: 'Premium Elite', price: '$5,000 CAD', value: 'premium' },
    { name: 'Custom Scale', price: 'Custom Pricing', value: 'custom' },
  ];

  const projectTypes = [
    'Brand Identity & Logo Design',
    'Website Design & Development',
    'E-commerce Platform',
    'Mobile App Design',
    'Marketing Campaign',
    'Full Digital Transformation',
    'Other',
  ];

  const timelines = [
    'ASAP (Rush)',
    '2-4 Weeks',
    '1-2 Months',
    '2-3 Months',
    '3+ Months',
    'Flexible',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData);
    setStep(5); // Show success message
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.plan !== '';
      case 2:
        return formData.projectType !== '' && formData.timeline !== '';
      case 3:
        return formData.name !== '' && formData.email !== '';
      default:
        return true;
    }
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-[#FF7A00] rounded-full flex items-center justify-center">
              <Check size={40} className="text-[#1A1A1A]" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Project</span>{' '}
            <span className="font-graffiti text-[#FF7A00]">Submitted!</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for choosing 9LMNTS Studio! We've received your project details and will get back to you within 24 hours to discuss the next steps.
          </p>
          <div className="bg-[#222222] border border-[#FF7A00]/20 rounded-lg p-8 mb-8">
            <h3 className="text-white text-xl mb-4">What Happens Next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#1A1A1A]">1</span>
                </div>
                <div>
                  <h4 className="text-white mb-1">Initial Review</h4>
                  <p className="text-gray-400 text-sm">We'll review your project details and prepare a tailored proposal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#1A1A1A]">2</span>
                </div>
                <div>
                  <h4 className="text-white mb-1">Discovery Call</h4>
                  <p className="text-gray-400 text-sm">Schedule a free consultation to discuss your vision in detail</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#1A1A1A]">3</span>
                </div>
                <div>
                  <h4 className="text-white mb-1">Proposal & Timeline</h4>
                  <p className="text-gray-400 text-sm">Receive a detailed proposal with scope, timeline, and investment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#1A1A1A]">4</span>
                </div>
                <div>
                  <h4 className="text-white mb-1">Kick-Off</h4>
                  <p className="text-gray-400 text-sm">Start bringing your vision to life with the 9LMNTS process</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all inline-flex items-center gap-2"
          >
            Back to Home
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl text-white mb-4">
            <span className="font-futuristic">Start Your</span>{' '}
            <span className="font-graffiti text-[#FF7A00]">Project</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Let's bring your vision to life in {4 - step + 1} simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= num
                      ? 'bg-[#FF7A00] text-[#1A1A1A]'
                      : 'bg-[#222222] text-gray-400 border border-[#FF7A00]/20'
                  }`}
                >
                  {step > num ? <Check size={20} /> : num}
                </div>
                {num < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step > num ? 'bg-[#FF7A00]' : 'bg-[#222222]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Select Plan</span>
            <span>Project Details</span>
            <span>Contact Info</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-[#222222] border border-[#FF7A00]/20 rounded-lg p-8">
          {/* Step 1: Select Plan */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Choose Your Plan</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.value}
                    onClick={() => handleInputChange('plan', plan.value)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.plan === plan.value
                        ? 'border-[#FF7A00] bg-[#FF7A00]/10'
                        : 'border-[#FF7A00]/20 hover:border-[#FF7A00]/40'
                    }`}
                  >
                    <h3 className="text-white text-xl mb-2">{plan.name}</h3>
                    <p className="text-[#FF7A00] text-lg">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Project Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Project Type *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white focus:border-[#FF7A00] focus:outline-none"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Expected Timeline *</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white focus:border-[#FF7A00] focus:outline-none"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Project Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={5}
                    placeholder="Tell us about your project vision, goals, and any specific requirements..."
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your Company Inc."
                      className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Website (if applicable)</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#FF7A00]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl text-white mb-6">Review Your Information</h2>
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#FF7A00]/20">
                  <h3 className="text-[#FF7A00] mb-4">Selected Plan</h3>
                  <p className="text-white text-xl">
                    {plans.find((p) => p.value === formData.plan)?.name || 'Not selected'}
                  </p>
                  <p className="text-gray-400">
                    {plans.find((p) => p.value === formData.plan)?.price}
                  </p>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#FF7A00]/20">
                  <h3 className="text-[#FF7A00] mb-4">Project Details</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>
                      <span className="text-white">Type:</span> {formData.projectType || 'Not specified'}
                    </p>
                    <p>
                      <span className="text-white">Timeline:</span> {formData.timeline || 'Not specified'}
                    </p>
                    {formData.description && (
                      <p>
                        <span className="text-white">Description:</span> {formData.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#FF7A00]/20">
                  <h3 className="text-[#FF7A00] mb-4">Contact Information</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>
                      <span className="text-white">Name:</span> {formData.name}
                    </p>
                    <p>
                      <span className="text-white">Email:</span> {formData.email}
                    </p>
                    {formData.phone && (
                      <p>
                        <span className="text-white">Phone:</span> {formData.phone}
                      </p>
                    )}
                    {formData.company && (
                      <p>
                        <span className="text-white">Company:</span> {formData.company}
                      </p>
                    )}
                    {formData.website && (
                      <p>
                        <span className="text-white">Website:</span> {formData.website}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#FF7A00]/20">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all ${
                step === 1
                  ? 'bg-[#333333] text-gray-500 cursor-not-allowed'
                  : 'bg-transparent border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00]/10'
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all ${
                  isStepValid()
                    ? 'bg-[#FF7A00] text-[#1A1A1A] hover:bg-[#FF7A00]/90'
                    : 'bg-[#333333] text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all inline-flex items-center gap-2"
              >
                Submit Project
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
