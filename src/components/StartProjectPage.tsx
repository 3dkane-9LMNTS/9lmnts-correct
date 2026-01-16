import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const StartProjectPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plan: '',
    projectType: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    description: ''
  });

  const plans = [
    { value: 'basic', name: 'AI Sales Machine', price: '$2,000', features: ['Lead Generation', 'Automated Funnels', 'Email Campaigns'] },
    { value: 'standard', name: 'Content Repurposing Engine', price: '$1,500', features: ['Multi-platform', 'AI Optimization', 'Scheduling'] },
    { value: 'premium', name: 'Email Support Agent', price: '$1,000', features: ['24/7 Support', 'AI Responses', 'Multi-language'] }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Send service confirmation email instead of direct payment
    try {
      // Get service details based on plan
      const serviceDetails = {
        basic: { name: 'AI Sales Machine', price: 2000, serviceType: 'ai-sales-machine' },
        standard: { name: 'Content Repurposing Engine', price: 1500, serviceType: 'content-repurposing-engine' },
        premium: { name: 'Email Support Agent', price: 1000, serviceType: 'email-support-agent' },
        custom: { name: 'Custom AI Solution', price: 0, serviceType: 'custom' }
      };

      const service = serviceDetails[formData.plan as keyof typeof serviceDetails];
      
      if (!service) {
        alert('Please select a valid plan');
        return;
      }

      // Create service confirmation
      const confirmationData = {
        ...formData,
        serviceName: service.name,
        totalPrice: service.price,
        depositAmount: service.price / 2,
        serviceType: service.serviceType,
        timestamp: new Date().toISOString()
      };

      // Send to your service confirmation endpoint
      const response = await fetch('/api/send-service-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationData)
      });

      if (response.ok) {
        setStep(5); // Show success message
      } else {
        throw new Error('Failed to send service confirmation');
      }
      
    } catch (error) {
      console.error('Service confirmation error:', error);
      alert('Failed to send service confirmation. Please try again.');
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.plan !== '';
      case 2:
        return formData.projectType !== '' && formData.timeline !== '';
      case 3:
        return formData.name !== '' && formData.email !== '' && formData.phone !== '';
      case 4:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#1A1A1A', color: 'white', minHeight: '100vh' }}>
      <div style={{ background: '#2A2A2A', padding: '30px', borderRadius: '10px', border: '1px solid #FF7A00' }}>
        
        <h1 style={{ color: '#FF7A00', textAlign: 'center', marginBottom: '30px' }}>Start Your AI Project</h1>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              style={{
                width: '60px',
                height: '4px',
                background: step >= stepNum ? '#FF7A00' : '#333',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>

        {/* Step 1: Select Plan */}
        {step === 1 && (
          <div>
            <h2 style={{ color: '#FF7A00', marginBottom: '20px' }}>Choose Your Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {plans.map((plan) => (
                <div
                  key={plan.value}
                  onClick={() => handleInputChange('plan', plan.value)}
                  style={{
                    border: formData.plan === plan.value ? '2px solid #FF7A00' : '1px solid #333',
                    padding: '20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: formData.plan === plan.value ? '#FF7A00' : 'transparent'
                  }}
                >
                  <h3 style={{ color: '#FF7A00', marginBottom: '10px' }}>{plan.name}</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>{plan.price}</p>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: '5px', color: '#ccc' }}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div>
            <h2 style={{ color: '#FF7A00', marginBottom: '20px' }}>Project Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                >
                  <option value="">Select project type...</option>
                  <option value="ai-sales">AI Sales Automation</option>
                  <option value="content-marketing">Content Marketing</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                >
                  <option value="">Select timeline...</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="2-3 months">2-3 months</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div>
            <h2 style={{ color: '#FF7A00', marginBottom: '20px' }}>Contact Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your Company"
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#FF7A00' }}>Project Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={4}
                  style={{ width: '100%', padding: '10px', background: '#1A1A1A', border: '1px solid #FF7A00', borderRadius: '5px', color: 'white' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 style={{ color: '#FF7A00', marginBottom: '20px' }}>Review Your Information</h2>
            <div style={{ background: '#333', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ color: '#FF7A00', marginBottom: '15px' }}>Selected Plan</h3>
              <p style={{ color: 'white', fontSize: '18px', marginBottom: '10px' }}>
                {plans.find((p) => p.value === formData.plan)?.name || 'Not selected'}
              </p>
              <p style={{ color: '#ccc', marginBottom: '20px' }}>
                {plans.find((p) => p.value === formData.plan)?.price}
              </p>
              
              <h3 style={{ color: '#FF7A00', marginBottom: '15px' }}>Contact Information</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Company:</strong> {formData.company}</p>
              <p><strong>Website:</strong> {formData.website}</p>
              <p><strong>Description:</strong> {formData.description}</p>
            </div>
          </div>
        )}

        {/* Step 5: Success Message */}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', padding: '30px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2 style={{ color: '#155724', marginBottom: '20px' }}>🎉 Service Confirmation Sent!</h2>
              <p style={{ fontSize: '18px', marginBottom: '15px' }}>Thank you for your interest in 9LMNTS Studio!</p>
              <p style={{ marginBottom: '20px' }}>We've sent a detailed service confirmation and contract to your email.</p>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '5px', margin: '20px 0', textAlign: 'left' }}>
                <h4 style={{ color: '#FF7A00', marginBottom: '15px' }}>📋 What's Next:</h4>
                <ol style={{ lineHeight: '1.8' }}>
                  <li><strong>Check your email</strong> for service confirmation</li>
                  <li><strong>Review the contract</strong> and service details</li>
                  <li><strong>Sign the contract</strong> to approve the service</li>
                  <li><strong>Pay the 50% deposit</strong> to secure your timeline</li>
                  <li><strong>Project begins</strong> within 3 business days</li>
                </ol>
              </div>
              
              <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
                <p><strong>📧 Check your inbox:</strong> {formData.email}</p>
                <p><strong>📄 Contract ID:</strong> Will be in your email</p>
                <p><strong>💰 Deposit Amount:</strong> ${formData.plan === 'basic' ? '1000' : formData.plan === 'standard' ? '750' : '500'}</p>
              </div>
              
              <div style={{ marginTop: '30px' }}>
                <p style={{ marginBottom: '15px' }}>Didn't receive the email?</p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    background: '#FF7A00',
                    color: 'white',
                    padding: '12px 25px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  🔄 Resend Confirmation
                </button>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '12px 25px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  📝 Start New Project
                </button>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
              <p>Questions? Contact us at support@9lmntsstudio.com</p>
              <p>© 2024 9LMNTS Studio - AI Automation Experts</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button
            onClick={handleBack}
            disabled={step === 1}
            style={{
              background: step === 1 ? '#333' : 'transparent',
              color: step === 1 ? '#999' : '#FF7A00',
              padding: '12px 25px',
              border: step === 1 ? '1px solid #333' : '1px solid #FF7A00',
              borderRadius: '5px',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            ← Back
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              style={{
                background: isStepValid() ? '#FF7A00' : '#333',
                color: isStepValid() ? 'white' : '#999',
                padding: '12px 25px',
                border: '1px solid #FF7A00',
                borderRadius: '5px',
                cursor: isStepValid() ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                background: '#FF7A00',
                color: 'white',
                padding: '12px 25px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Submit Project ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartProjectPage;
