/**
 * Playing Books Podcast - Donation Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Note: Mobile menu toggle is handled by app.js
  // We don't need to duplicate that functionality here

  // Setup payment buttons
  setupPaymentButtons();
});

/**
 * Sets up event listeners for payment buttons
 */
function setupPaymentButtons() {
  // PayPal button
  const paypalBtn = document.querySelector('.paypal-btn');
  if (paypalBtn) {
    paypalBtn.addEventListener('click', function() {
      // Use a valid PayPal donation URL format
      window.open('https://www.paypal.com/donate?business=worthscope%40yahoo.com&currency_code=USD&item_name=Donation%20to%20Playing%20Books%20Podcast', '_blank');
    });
  }

  // Apple Pay button
  const applePayBtn = document.querySelector('.applepay-btn');
  if (applePayBtn) {
    applePayBtn.addEventListener('click', function() {
      // For demonstration purposes, show a success message directly
      // In a real implementation, this would use the Apple Pay JS API with proper merchant validation
      showPaymentSuccess('Apple Pay');

      // Provide feedback to the user about the demo nature
      console.log('Apple Pay demo: In a production environment, this would process a real Apple Pay transaction.');

      /*
      // The following code is commented out as it requires proper Apple Pay merchant validation
      // which would need to be set up on a real server

      // Check if Apple Pay is available
      if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
        // Define payment request
        const paymentRequest = {
          countryCode: 'US',
          currencyCode: 'USD',
          supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
          merchantCapabilities: ['supports3DS'],
          total: {
            label: 'Worthscope - Playing Books Podcast',
            amount: '10.00' // Default donation amount
          }
        };

        // Create Apple Pay session
        try {
          const session = new ApplePaySession(3, paymentRequest);

          // Handle payment authorization
          session.onpaymentauthorized = function(event) {
            // In production, you would send the payment token to your server
            console.log('Payment authorized: ', event.payment);

            // Simulate successful payment
            session.completePayment(ApplePaySession.STATUS_SUCCESS);

            // Show success message
            showPaymentSuccess('Apple Pay');
          };

          // Handle validation errors
          session.onvalidatemerchant = function(event) {
            // In production, you would validate the merchant session with your server
            fetch('/apple-pay-merchant-validate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                validationURL: event.validationURL
              })
            })
            .then(response => response.json())
            .then(merchantSession => {
              session.completeMerchantValidation(merchantSession);
            })
            .catch(error => {
              console.error('Error validating merchant:', error);
              session.abort();
            });
          };

          // Begin session
          session.begin();
        } catch (error) {
          console.error('Error starting Apple Pay session:', error);
          alert('Sorry, there was an error processing your Apple Pay payment. Please try another payment method.');
        }
      } else {
        alert('Apple Pay is not available on this device or browser. Please try another payment method.');
      }
      */
    });
  }

  // Google Pay button
  const googlePayBtn = document.querySelector('.googlepay-btn');
  if (googlePayBtn) {
    googlePayBtn.addEventListener('click', function() {
      // Check if Google Pay API is available
      if (window.google && window.google.payments && window.google.payments.api) {
        // Define Google Pay client
        const paymentsClient = new google.payments.api.PaymentsClient({
          environment: 'TEST' // 'PRODUCTION' for live environment
        });

        // Define payment data request
        const paymentDataRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                'gateway': 'example',
                'gatewayMerchantId': 'exampleGatewayMerchantId'
              }
            }
          }],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Worthscope - Playing Books Podcast'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '10.00',
            currencyCode: 'USD'
          }
        };

        // Check if Google Pay is available
        paymentsClient.isReadyToPay({
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: paymentDataRequest.allowedPaymentMethods
        })
        .then(function(response) {
          if (response.result) {
            // Show Google Pay button and handle payment
            paymentsClient.loadPaymentData(paymentDataRequest)
              .then(function(paymentData) {
                // In production, you would send the payment token to your server
                console.log('Payment authorized: ', paymentData);

                // Show success message
                showPaymentSuccess('Google Pay');
              })
              .catch(function(error) {
                console.error('Error processing Google Pay payment: ', error);
                alert('Sorry, there was an error processing your Google Pay payment. Please try another payment method.');
              });
          } else {
            alert('Google Pay is not available on this device or browser. Please try another payment method.');
          }
        })
        .catch(function(error) {
          console.error('Error checking Google Pay availability: ', error);
          alert('Sorry, there was an error checking Google Pay availability. Please try another payment method.');
        });
      } else {
        // Load Google Pay API if not available
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/js/pay.js';
        script.onload = function() {
          alert('Google Pay API loaded. Please try again.');
        };
        script.onerror = function() {
          alert('Could not load Google Pay API. Please try another payment method.');
        };
        document.head.appendChild(script);
      }
    });
  }

  // Meta Pay button
  const metaPayBtn = document.querySelector('.metapay-btn');
  if (metaPayBtn) {
    metaPayBtn.addEventListener('click', function() {
      // For demonstration purposes, show a success message directly
      // In a real implementation, this would use the Meta Pay API with a valid App ID
      showPaymentSuccess('Meta Pay');

      // Provide feedback to the user about the demo nature
      console.log('Meta Pay demo: In a production environment, this would process a real Meta Pay transaction.');

      /*
      // The following code is commented out as it requires a valid Meta App ID
      // which would need to be registered with Meta/Facebook

      // Check if Facebook SDK is loaded
      if (window.FB) {
        // Initialize Meta Pay with a valid App ID
        // You would need to register your app at https://developers.facebook.com/
        FB.init({
          appId: 'YOUR_VALID_META_APP_ID', // Replace with a valid Facebook App ID
          version: 'v18.0',
          xfbml: true
        });

        // Define payment parameters
        const paymentParameters = {
          action: 'donate',
          product: {
            name: 'Donation to Playing Books Podcast',
            description: 'Support our podcast with your donation',
            price: '10.00',
            currency: 'USD'
          },
          billing_address_required: true
        };

        // Open Meta Pay dialog
        FB.ui({
          method: 'pay',
          action: 'donate',
          product: paymentParameters.product,
          billing_address_required: paymentParameters.billing_address_required
        }, function(response) {
          if (response && response.payment_id) {
            // In production, you would verify the payment with your server
            console.log('Payment successful: ', response);

            // Show success message
            showPaymentSuccess('Meta Pay');
          } else if (response && response.error_code) {
            console.error('Meta Pay error: ', response);
            alert('Sorry, there was an error processing your Meta Pay payment. Please try another payment method.');
          } else {
            // User canceled the payment
            console.log('Payment canceled');
          }
        });
      } else {
        // Load Facebook SDK if not available
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        script.onload = function() {
          alert('Meta Pay API loaded. Please try again.');
        };
        script.onerror = function() {
          alert('Could not load Meta Pay API. Please try another payment method.');
        };
        document.head.appendChild(script);
      }
      */
    });
  }

  // Credit/Debit Card button
  const creditCardBtn = document.querySelector('.creditcard-btn');
  if (creditCardBtn) {
    creditCardBtn.addEventListener('click', function() {
      // Show credit card form
      showCreditCardForm();
    });
  }

  // Donation button in header (redirect to current page to avoid confusion)
  const donateBtn = document.querySelector('.donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default action since we're already on the donation page
      // Scroll to payment options section
      document.querySelector('.payment-options').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/**
 * Shows a success message after a successful payment
 * @param {string} method - The payment method used
 */
function showPaymentSuccess(method) {
  // Create success message container
  const successContainer = document.createElement('div');
  successContainer.className = 'payment-success';
  successContainer.style.position = 'fixed';
  successContainer.style.top = '0';
  successContainer.style.left = '0';
  successContainer.style.width = '100%';
  successContainer.style.backgroundColor = '#4CAF50';
  successContainer.style.color = 'white';
  successContainer.style.padding = '20px';
  successContainer.style.textAlign = 'center';
  successContainer.style.zIndex = '1000';
  successContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

  // Add success message
  successContainer.innerHTML = `
    <h3 style="margin: 0; font-size: 1.2rem;">Thank You for Your Donation!</h3>
    <p style="margin: 10px 0 0;">Your payment via ${method} has been processed successfully.</p>
    <button style="background: white; color: #4CAF50; border: none; padding: 5px 15px; margin-top: 10px; border-radius: 4px; cursor: pointer;">Close</button>
  `;

  // Add to document
  document.body.appendChild(successContainer);

  // Handle close button
  const closeButton = successContainer.querySelector('button');
  closeButton.addEventListener('click', function() {
    document.body.removeChild(successContainer);
  });

  // Auto-remove after 10 seconds
  setTimeout(function() {
    if (document.body.contains(successContainer)) {
      document.body.removeChild(successContainer);
    }
  }, 10000);
}

/**
 * Shows the credit card form for direct payments
 */
function showCreditCardForm() {
  // Check if form already exists
  if (document.getElementById('credit-card-form-container')) {
    return;
  }

  // Create form container
  const formContainer = document.createElement('div');
  formContainer.id = 'credit-card-form-container';
  formContainer.style.position = 'fixed';
  formContainer.style.top = '0';
  formContainer.style.left = '0';
  formContainer.style.width = '100%';
  formContainer.style.height = '100%';
  formContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
  formContainer.style.display = 'flex';
  formContainer.style.justifyContent = 'center';
  formContainer.style.alignItems = 'center';
  formContainer.style.zIndex = '1000';

  // Create form content
  formContainer.innerHTML = `
    <div class="credit-card-form" style="background-color: #fdfce9; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; color: #1695a0;">Enter Payment Details</h3>
        <button id="close-form-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
      </div>

      <form id="credit-card-form">
        <div class="form-group">
          <label for="cc-name">Name on Card</label>
          <input type="text" id="cc-name" name="cc-name" required autocomplete="cc-name">
        </div>

        <div class="form-group">
          <label for="cc-number">Card Number</label>
          <input type="text" id="cc-number" name="cc-number" required autocomplete="cc-number" placeholder="XXXX XXXX XXXX XXXX">
        </div>

        <div style="display: flex; gap: 15px;">
          <div class="form-group" style="flex: 1;">
            <label for="cc-exp">Expiration (MM/YY)</label>
            <input type="text" id="cc-exp" name="cc-exp" required autocomplete="cc-exp" placeholder="MM/YY">
          </div>

          <div class="form-group" style="flex: 1;">
            <label for="cc-csc">Security Code</label>
            <input type="text" id="cc-csc" name="cc-csc" required autocomplete="cc-csc" placeholder="CVC">
          </div>
        </div>

        <div class="form-group">
          <label for="cc-address">Billing Address</label>
          <input type="text" id="cc-address" name="cc-address" required autocomplete="street-address">
        </div>

        <div style="display: flex; gap: 15px;">
          <div class="form-group" style="flex: 2;">
            <label for="cc-city">City</label>
            <input type="text" id="cc-city" name="cc-city" required autocomplete="address-level2">
          </div>

          <div class="form-group" style="flex: 1;">
            <label for="cc-state">State</label>
            <input type="text" id="cc-state" name="cc-state" required autocomplete="address-level1">
          </div>

          <div class="form-group" style="flex: 1;">
            <label for="cc-zip">ZIP Code</label>
            <input type="text" id="cc-zip" name="cc-zip" required autocomplete="postal-code">
          </div>
        </div>

        <div class="form-group">
          <label for="cc-amount">Donation Amount ($)</label>
          <input type="number" id="cc-amount" name="cc-amount" value="10" min="1" step="1" required>
        </div>

        <button type="submit" class="payment-btn" style="background-color: #1695a0; color: white; padding: 12px; border: none; border-radius: 4px; width: 100%; margin-top: 20px; cursor: pointer; font-weight: 600;">Complete Donation</button>
      </form>
    </div>
  `;

  // Add to document
  document.body.appendChild(formContainer);

  // Handle close button
  const closeButton = document.getElementById('close-form-btn');
  closeButton.addEventListener('click', function() {
    document.body.removeChild(formContainer);
  });

  // Handle form submission
  const form = document.getElementById('credit-card-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form
    if (validateCreditCardForm()) {
      // In production, you would send the payment information to your server
      console.log('Processing credit card payment...');

      // Simulate processing
      const processingMessage = document.createElement('div');
      processingMessage.style.textAlign = 'center';
      processingMessage.style.marginTop = '20px';
      processingMessage.innerHTML = '<p style="color: #1695a0;"><i class="fas fa-spinner fa-spin"></i> Processing your payment...</p>';
      form.appendChild(processingMessage);

      // Simulate successful payment after 2 seconds
      setTimeout(function() {
        // Remove form
        document.body.removeChild(formContainer);

        // Show success message
        showPaymentSuccess('Credit Card');
      }, 2000);
    }
  });

  // Add input formatting and validation
  setupCreditCardValidation();
}

/**
 * Validates the credit card form
 * @returns {boolean} Whether the form is valid
 */
function validateCreditCardForm() {
  const name = document.getElementById('cc-name').value.trim();
  const number = document.getElementById('cc-number').value.replace(/\s/g, '');
  const exp = document.getElementById('cc-exp').value.trim();
  const csc = document.getElementById('cc-csc').value.trim();
  const address = document.getElementById('cc-address').value.trim();
  const city = document.getElementById('cc-city').value.trim();
  const state = document.getElementById('cc-state').value.trim();
  const zip = document.getElementById('cc-zip').value.trim();

  // Simple validation
  if (name.length < 3) {
    alert('Please enter a valid name');
    return false;
  }

  if (number.length < 15 || number.length > 16 || !/^\d+$/.test(number)) {
    alert('Please enter a valid card number');
    return false;
  }

  if (!exp.match(/^\d{2}\/\d{2}$/)) {
    alert('Please enter a valid expiration date (MM/YY)');
    return false;
  }

  if (csc.length < 3 || csc.length > 4 || !/^\d+$/.test(csc)) {
    alert('Please enter a valid security code');
    return false;
  }

  if (address.length < 5) {
    alert('Please enter a valid address');
    return false;
  }

  if (city.length < 2) {
    alert('Please enter a valid city');
    return false;
  }

  if (state.length < 2) {
    alert('Please enter a valid state');
    return false;
  }

  if (zip.length < 5 || !/^\d+$/.test(zip)) {
    alert('Please enter a valid ZIP code');
    return false;
  }

  return true;
}

/**
 * Sets up credit card input formatting and validation
 */
function setupCreditCardValidation() {
  // Format credit card number with spaces
  const ccNumber = document.getElementById('cc-number');
  ccNumber.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // Add spaces every 4 digits
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    e.target.value = formattedValue;
  });

  // Format expiration date
  const ccExp = document.getElementById('cc-exp');
  ccExp.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      e.target.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
      e.target.value = value;
    }
  });

  // Limit security code to 4 digits
  const ccCsc = document.getElementById('cc-csc');
  ccCsc.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    e.target.value = value;
  });

  // Limit ZIP code to 5 digits
  const ccZip = document.getElementById('cc-zip');
  ccZip.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    e.target.value = value;
  });
}

/**
 * In a production environment, you would implement actual payment processing.
 * This would typically involve:
 *
 * 1. Secure handling of payment information
 * 2. Integration with payment gateways
 * 3. Server-side processing of transactions
 * 4. Confirmation and receipt generation
 *
 * The implementation above is a placeholder that demonstrates the UI flow
 * but does not process actual payments.
 */
