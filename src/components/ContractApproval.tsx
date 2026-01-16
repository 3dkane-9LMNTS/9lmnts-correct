import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useNavigate } from 'react-router-dom';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export default function ContractApproval() {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
  }, [contractId]);

  const fetchServiceDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('contract_id', contractId)
        .single();

      if (error) throw error;
      setService(data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignContract = async () => {
    setSigning(true);
    try {
      // Update service status
      const { error } = await supabase
        .from('services')
        .update({
          status: 'approved',
          signed_at: new Date().toISOString(),
          signed_ip: window.location.hostname
        })
        .eq('contract_id', contractId);

      if (error) throw error;

      // Send invoice email
      await sendInvoice();

      setSigned(true);
    } catch (error) {
      console.error('Error signing contract:', error);
      alert('Error signing contract. Please try again.');
    } finally {
      setSigning(false);
    }
  };

  const sendInvoice = async () => {
    // This would trigger your invoice generation and email sending
    console.log('Sending invoice for:', service.customer_email);
    // Call your invoice service here
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2>Loading contract...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h2>Contract not found</h2>
        <p>Please check your contract ID or contact support.</p>
      </div>
    );
  }

  if (signed) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', padding: '30px', borderRadius: '10px', textAlign: 'center' }}>
          <h2 style={{ color: '#155724' }}>🎉 Contract Signed Successfully!</h2>
          <p>Thank you {service.customer_name}! Your contract has been signed.</p>
          <p><strong>Next Steps:</strong></p>
          <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            <li>Invoice for 50% deposit sent to your email</li>
            <li>Pay invoice to secure your project timeline</li>
            <li>Project begins within 3 business days</li>
            <li>Receive weekly progress updates</li>
          </ol>
          <p style={{ marginTop: '30px' }}>
            <strong>Invoice Amount:</strong> ${service.deposit_amount.toLocaleString()}
          </p>
          <button
            onClick={() => window.location.href = `https://9lmntsstudio.com/invoice/${contractId}`}
            style={{
              background: '#FF7A00',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            💳 Pay Deposit Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg, #FF7A00, #FF5500)', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '10px 10px 0 0' }}>
        <h1 style={{ margin: '0' }}>🚀 9LMNTS Studio</h1>
        <h2 style={{ margin: '10px 0' }}>Service Agreement</h2>
        <p>Contract ID: {contractId}</p>
      </div>

      <div style={{ background: 'white', padding: '30px', border: '1px solid #e5e5e5', borderRadius: '0 0 10px 10px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h3>Client Information</h3>
          <p><strong>Name:</strong> {service.customer_name}</p>
          <p><strong>Company:</strong> {service.customer_company}</p>
          <p><strong>Email:</strong> {service.customer_email}</p>
          <p><strong>Phone:</strong> {service.customer_phone}</p>
        </div>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '30px' }}>
          <h3>Service Details</h3>
          <p><strong>Service:</strong> {service.service_type}</p>
          <p><strong>Project Type:</strong> {service.project_type}</p>
          <p><strong>Timeline:</strong> {service.timeline}</p>
          <p><strong>Estimated Duration:</strong> {service.estimated_duration}</p>
          
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF7A00', margin: '20px 0' }}>
            Total Investment: ${service.total_price.toLocaleString()}
          </div>
          
          <p><strong>Payment Structure:</strong></p>
          <ul>
            <li>50% Deposit: ${service.deposit_amount.toLocaleString()} (due upon approval)</li>
            <li>50% Final: ${service.remaining_balance.toLocaleString()} (due on completion)</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h4>📦 Deliverables</h4>
          {service.deliverables.map((item, index) => (
            <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              ✅ {item}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', padding: '20px', borderRadius: '5px', marginBottom: '30px' }}>
          <h4>📋 Terms & Conditions</h4>
          <ol>
            <li>50% deposit required to begin work</li>
            <li>Work begins within 3 business days of deposit</li>
            <li>Regular progress updates provided weekly</li>
            <li>Final payment due upon project completion</li>
            <li>30-day warranty on all deliverables</li>
            <li>Client retains full ownership of all work</li>
            <li>Confidentiality agreement included</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <h4>Ready to move forward?</h4>
          <p>By signing this contract, you agree to the terms and authorize us to begin your project.</p>
          
          <button
            onClick={handleSignContract}
            disabled={signing}
            style={{
              background: signing ? '#ccc' : '#FF7A00',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: signing ? 'not-allowed' : 'pointer',
              marginTop: '20px'
            }}
          >
            {signing ? '⏳ Signing...' : '📝 Sign Contract & Approve Service'}
          </button>
          
          <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            After signing, you'll receive an invoice for the 50% deposit
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px', color: '#666' }}>
          <p>Questions? Contact us at support@9lmntsstudio.com</p>
          <p>© 2024 9LMNTS Studio - AI Automation Experts</p>
        </div>
      </div>
    </div>
  );
}
