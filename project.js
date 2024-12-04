// DOM Elements
const form = document.getElementById('package-form');
const errorMessage = document.getElementById('error-message');
const packageTable = document.getElementById('package-table').querySelector('tbody');

// Package Array
let packages = [];

// Validation Functions
function validateRecipientName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

function validatePackageId(id) {
    return Number.isInteger(+id) && +id > 0;
}

function validateAddress(address) {
    return address && /^[^\d]+$/.test(address.trim());
}

function validateWeight(weight) {
    return !isNaN(weight) && +weight > 0;
}

// Generate Tracking Code
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}

// Add Package
function addPackage(event) {
    event.preventDefault();
    errorMessage.textContent = '';

    const recipientName = document.getElementById('recipient-name').value.trim();
    const packageId = parseInt(document.getElementById('package-id').value.trim());
    const deliveryAddress = document.getElementById('delivery-address').value.trim();
    const weight = parseFloat(document.getElementById('weight').value.trim());

    if (!validateRecipientName(recipientName)) {
        errorMessage.textContent = 'Error: Invalid Recipient Name. Use alphabetic characters only.';
        return;
    }
    if (!validatePackageId(packageId)) {
        errorMessage.textContent = 'Error: Invalid Package ID. Please enter numeric values only.';
        return;
    }
    if (!validateAddress(deliveryAddress)) {
        errorMessage.textContent = 'Error: Invalid Delivery Address. Ensure no digits are included.';
        return;
    }
    if (!validateWeight(weight)) {
        errorMessage.textContent = 'Error: Invalid Weight. Must be a positive number.';
        return;
    }

    const trackingCode = generateTrackingCode(packageId, weight);
    packages.push({ recipientName, packageId, deliveryAddress, weight, trackingCode });

    displayPackages();
    form.reset();
}

// Display Sorted Packages
function displayPackages() {
    packages.sort((a, b) => a.weight - b.weight); // Efficient comparison-based sorting
    packageTable.innerHTML = packages.map(pkg => `
        <tr>
            <td>${pkg.recipientName}</td>
            <td>${pkg.packageId}</td>
            <td>${pkg.deliveryAddress}</td>
            <td>${pkg.weight}</td>
            <td>${pkg.trackingCode}</td>
        </tr>
    `).join('');
}

// Event Listener
form.addEventListener('submit', addPackage);
