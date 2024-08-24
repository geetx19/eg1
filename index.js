const payButton = document.getElementById('pay-button');
const payViaAppButton = document.getElementById('pay-via-app-button');
const qrCodeContainer = document.getElementById('qr-code-container');

payButton.addEventListener('click', function () {
  const amount = document.getElementById('amount').value;
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  const upiID = 'memymyselfanish@okicici';  // Replace with your UPI ID
  const name = 'museum-eg';    // Replace with your merchant name or purpose
  const transactionNote = 'Donation for museum';
  const currency = 'INR';

  // UPI URL format
  const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=${currency}`;

  // Generate QR code
  const qr = new QRious({
    element: document.getElementById('qr-code'),
    value: upiUrl,
    size: 250 // Size of the QR code
  });

  // Optionally, you can print the UPI URL below the QR code
  document.getElementById('upi-url').textContent = upiUrl;

  // Store UPI URL for use by the Pay via App button
  payViaAppButton.setAttribute('data-upi-url', upiUrl);

  // Show QR code container and adjust button margin
  qrCodeContainer.style.display = 'block';
  payViaAppButton.style.marginTop = '20px';
});

payViaAppButton.addEventListener('click', function () {
  try {
    const upiUrl = this.getAttribute('data-upi-url');
    if (!upiUrl) {
      alert('Please generate the QR code first.');
      return;
    }

    console.log("UPI URL: ", upiUrl); // Logs the generated UPI URL to the console for debugging.

    // Redirect to UPI app
    window.location.href = upiUrl;

    // Hide QR code container and adjust button margin
    qrCodeContainer.style.display = 'none';
    payViaAppButton.style.marginTop = '5px';

  } catch (error) {
    console.error("An error occurred:", error); // Logs any error that occurs during the execution.
    alert('An error occurred while processing your payment. Please try again.');
  }
});