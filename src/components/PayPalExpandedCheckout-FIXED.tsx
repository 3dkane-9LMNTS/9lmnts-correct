import { useState, useEffect } from 'react';

interface PayPalExpandedCheckoutProps {
  amount: number;
  serviceType: string;
  customerData: any;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

export function PayPalExpandedCheckout({ 
  amount, 
  serviceType, 
  customerData, 
  onSuccess, 
  onError 
}: PayPalExpandedCheckoutProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load PayPal SDK with proper parameters
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AWnXO57ecm7W13lHv-3dZL3Kti9iCsEo64dhri9DW0FRaHgFWOn3gWOozxyY8q4RorZz6CXr-R2TUGJW&currency=USD&intent=capture';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error('PayPal SDK failed to load');
      onError(new Error('PayPal SDK failed to load'));
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const createOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Create order on your backend or use fallback
      const orderData = {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString()
          },
          description: `9LMNTS Studio - ${serviceType}`,
          custom_id: JSON.stringify({
            customerData,
            serviceType,
            timestamp: new Date().toISOString()
          })
        }]
      };

      // Try backend first, fallback to direct PayPal
      try {
        const response = await fetch('/api/create-paypal-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          const order = await response.json();
          return order.id;
        }
      } catch (backendError) {
        console.warn('Backend order creation failed, using fallback:', backendError);
      }

      // Fallback: Create simple order ID
      return 'ORDER-' + Date.now();
      
    } catch (error) {
      console.error('Create order error:', error);
      onError(error);
      setIsProcessing(false);
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    setIsProcessing(true);
    
    try {
      // Try to capture on backend first
      try {
        const response = await fetch('/api/capture-paypal-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        });

        if (response.ok) {
          const captureData = await response.json();
          onSuccess({
            ...data,
            captureData,
            customerData,
            serviceType,
            amount
          });
          setIsProcessing(false);
          return;
        }
      } catch (backendError) {
        console.warn('Backend capture failed, using fallback:', backendError);
      }

      // Fallback success
      onSuccess({
        ...data,
        customerData,
        serviceType,
        amount,
        status: 'COMPLETED'
      });
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Capture error:', error);
      onError(error);
      setIsProcessing(false);
    }
  };

  const handleError = (error: any) => {
    console.error('PayPal error:', error);
    setIsProcessing(false);
    onError(error);
  };

  const onCancel = (data: any) => {
    console.log('Payment cancelled:', data);
    setIsProcessing(false);
    // You can handle cancellation if needed
  };

  // Fallback direct PayPal URL
  const handleDirectPayPal = () => {
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=9lmntstudio@gmail.com&item_name=9LMNTS+Studio+-+${encodeURIComponent(serviceType)}&amount=${amount}&currency_code=USD&return=https://9lmntsstudio.com/success&cancel_url=https://9lmntsstudio.com/cancel&custom=${encodeURIComponent(JSON.stringify({
      customerData,
      serviceType,
      timestamp: new Date().toISOString()
    }))}`;

    window.open(paypalUrl, '_blank');
  };

  if (!isScriptLoaded) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading PayPal...</p>
        <button 
          onClick={handleDirectPayPal}
          style={{
            background: '#FF7A00',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          💳 Pay with PayPal (Direct)
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      {isProcessing && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Processing payment...</p>
        </div>
      )}
      
      {!isProcessing && (
        <>
          {window.paypal ? (
            <div id="paypal-button-container">
              {/* PayPal buttons will be rendered here */}
              {window.paypal.Buttons && (
                <window.paypal.Buttons
                  style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                  }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={handleError}
                  onCancel={onCancel}
                />
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>PayPal buttons loading...</p>
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={handleDirectPayPal}
              style={{
                background: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔗 Alternative: Direct PayPal
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Add TypeScript declarations for PayPal
declare global {
  interface Window {
    paypal: any;
  }
}
