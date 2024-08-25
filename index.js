const payButton = document.getElementById('pay-button');
const payViaAppButton = document.getElementById('pay-via-app-button');
const qrCodeContainer = document.getElementById('qr-code-container');

// UPI ID and constants
const upiID = 'memymyselfanishD@okicici';  // Replace with your UPI ID
const name = 'FNAME SNAME K'; // Replace with the payer's full name
const currency = 'INR';

payButton.addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // UPI URL format for QR code generation
    const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=${currency}`;

    // Generate QR code
    const qr = new QRious({
        element: document.getElementById('qr-code'),
        value: upiUrl,
        size: 250 // Size of the QR code
    });

    // Store UPI URL for use by the Pay via App button
    payViaAppButton.setAttribute('data-upi-url', upiUrl);

    // Show QR code container and adjust button margin
    qrCodeContainer.style.display = 'block';
    payViaAppButton.style.marginTop = '20px';
});

payViaAppButton.addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Google Pay deep link
    const upiIntentUrl = `tez://upi/pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount}&cu=${currency}`;

    console.log("UPI Intent URL: ", upiIntentUrl); // Logs the generated UPI URL to the console for debugging.

    // Redirect to Google Pay using the custom intent
    window.location.href = upiIntentUrl;
});
