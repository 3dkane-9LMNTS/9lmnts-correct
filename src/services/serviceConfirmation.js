import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function sendServiceConfirmation(customerData) {
  const { plan, projectType, timeline, name, email, company, phone, website, description } = customerData;
  
  // Get service details
  const services = {
    basic: {
      name: 'AI Sales Machine',
      price: 2000,
      deposit: 1000,
      duration: '4-6 weeks',
      features: [
        'AI-powered lead generation system',
        'Automated sales funnel creation',
        'Email campaign automation',
        'CRM integration',
        'Performance analytics dashboard',
        'Lead scoring algorithm',
        'Sales script generation',
        'Follow-up automation'
      ],
      deliverables: [
        'Custom AI sales system',
        'Lead generation database',
        'Email templates (20+)',
        'Sales funnel setup',
        'Analytics dashboard',
        'Training documentation',
        '3 months support',
        'Performance optimization'
      ]
    },
    standard: {
      name: 'Content Repurposing Engine',
      price: 1500,
      deposit: 750,
      duration: '3-4 weeks',
      features: [
        'Multi-platform content adaptation',
        'AI-powered content optimization',
        'Automated scheduling system',
        'Brand voice analysis',
        'Content performance tracking',
        'SEO optimization',
        'Social media integration',
        'Content calendar automation'
      ],
      deliverables: [
        'Content repurposing system',
        'Platform-specific templates',
        'Automated scheduling tool',
        'Brand voice guide',
        'Performance analytics',
        'Content calendar',
        '2 months support',
        'Optimization recommendations'
      ]
    },
    premium: {
      name: 'Email Support Agent',
      price: 1000,
      deposit: 500,
      duration: '2-3 weeks',
      features: [
        'AI-powered email responses',
        'Customer sentiment analysis',
        'Priority ticket routing',
        'Knowledge base integration',
        'Response time optimization',
        'Multi-language support',
        'Escalation automation',
        'Performance monitoring'
      ],
      deliverables: [
        'AI email assistant',
        'Response templates',
        'Knowledge base setup',
        'Ticketing system',
        'Analytics dashboard',
        'Training documentation',
        '1 month support',
        'Performance reports'
      ]
    }
  };

  const service = services[plan];
  const contractId = `CONTRACT-${Date.now()}`;
  
  // Create service record
  const { data: serviceRecord, error } = await supabase
    .from('services')
    .insert([{
      contract_id: contractId,
      customer_name: name,
      customer_email: email,
      customer_company: company,
      customer_phone: phone,
      service_type: service.name,
      service_plan: plan,
      project_type: projectType,
      timeline: timeline,
      website: website,
      description: description,
      total_price: service.price,
      deposit_amount: service.deposit,
      remaining_balance: service.price - service.deposit,
      estimated_duration: service.duration,
      status: 'awaiting_approval',
      features: service.features,
      deliverables: service.deliverables,
      created_at: new Date().toISOString()
    }])
    .select();

  if (error) {
    console.error('Error creating service record:', error);
    return { error: 'Failed to create service record' };
  }

  // Generate contract PDF (simplified - in production use PDF generation library)
  const contractUrl = `https://9lmntsstudio.com/contract/${contractId}`;
  
  // Send confirmation email
  const emailContent = {
    to: email,
    subject: `🎉 9LMNTS Studio - Service Confirmation: ${service.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Service Confirmation - 9LMNTS Studio</title>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF7A00, #FF5500); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .service-card { background: #f8f9fa; border-left: 4px solid #FF7A00; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .price { font-size: 32px; font-weight: bold; color: #FF7A00; margin: 20px 0; }
          .features { margin: 20px 0; }
          .feature-item { padding: 8px 0; border-bottom: 1px solid #eee; }
          .cta-button { background: #FF7A00; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; color: #666; margin-top: 30px; font-size: 14px; }
          .timeline { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .contract-section { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🚀 9LMNTS Studio</div>
          <h1>Service Confirmation</h1>
          <p>Thank you for choosing us for your AI automation needs!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>We're excited to work with ${company} on your <strong>${projectType}</strong> project! Below you'll find your detailed service proposal and contract.</p>
          
          <div class="service-card">
            <h3>🎯 ${service.name}</h3>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Estimated Timeline:</strong> ${service.duration}</p>
            <p><strong>Target Completion:</strong> ${timeline}</p>
            
            <div class="price">
              Total Investment: $${service.price.toLocaleString()}
            </div>
            
            <p><strong>Payment Structure:</strong></p>
            <ul>
              <li>50% Deposit: $${service.deposit.toLocaleString()} (due upon approval)</li>
              <li>50% Final: $${(service.price - service.deposit).toLocaleString()} (due on completion)</li>
            </ul>
          </div>

          <div class="timeline">
            <h4>📅 Project Timeline</h4>
            <p><strong>Start Date:</strong> Within 3 business days of approval</p>
            <p><strong>Estimated Completion:</strong> ${service.duration}</p>
            <p><strong>Milestones:</strong> Weekly progress updates</p>
          </div>

          <h4>🚀 What's Included</h4>
          <div class="features">
            <h5>Key Features:</h5>
            ${service.features.map(feature => `<div class="feature-item">✅ ${feature}</div>`).join('')}
            
            <h5>Deliverables:</h5>
            ${service.deliverables.map(deliverable => `<div class="feature-item">📦 ${deliverable}</div>`).join('')}
          </div>

          <div class="contract-section">
            <h4>📋 Service Agreement</h4>
            <p><strong>Contract ID:</strong> ${contractId}</p>
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Total Price:</strong> $${service.price.toLocaleString()}</p>
            <p><strong>Client:</strong> ${name} - ${company}</p>
            
            <p><strong>Terms:</strong></p>
            <ul>
              <li>50% deposit required to begin work</li>
              <li>Work begins within 3 business days of deposit</li>
              <li>Regular progress updates provided</li>
              <li>Final payment due upon completion</li>
              <li>30-day warranty on all deliverables</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${contractUrl}" class="cta-button">📝 Review & Sign Contract</a>
            <p><small>Click to review full terms and conditions</small></p>
          </div>

          <h4>📞 Next Steps</h4>
          <ol>
            <li>Review the service proposal above</li>
            <li>Click the contract link to review full terms</li>
            <li>Sign the contract to approve the service</li>
            <li>Receive invoice for 50% deposit</li>
            <li>Project begins upon deposit confirmation</li>
          </ol>

          <h4>❓ Questions?</h4>
          <p>We're here to help! Reach out anytime:</p>
          <ul>
            <li>📧 Email: support@9lmntsstudio.com</li>
            <li>📱 Phone: (555) 123-4567</li>
            <li>💬 Live chat: 9lmntsstudio.com</li>
          </ul>

          <div class="footer">
            <p>9LMNTS Studio | AI Automation Experts</p>
            <p><small>This is an automated confirmation. Please do not reply to this email.</small></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Send email (using your email service - Resend, SendGrid, etc.)
  try {
    // Example with Resend:
    // const { data: emailData, error: emailError } = await resend.emails.send(emailContent);
    
    console.log('Service confirmation sent to:', email);
    console.log('Contract ID:', contractId);
    console.log('Service Record ID:', serviceRecord[0].id);
    
    return {
      success: true,
      contractId,
      serviceRecordId: serviceRecord[0].id,
      customerEmail: email,
      serviceName: service.name,
      totalPrice: service.price
    };
    
  } catch (error) {
    console.error('Error sending service confirmation:', error);
    return { error: 'Failed to send service confirmation' };
  }
}
