document.getElementById('contactForm').addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent the default form submission

   // Clear previous error messages
   clearErrors();

   // Get form values
   const name = document.getElementById('name').value.trim();
   const email = document.getElementById('email').value.trim();
   const phone = document.getElementById('phone').value.trim(); // Get phone value
   const message = document.getElementById('message').value.trim();
   
   let valid = true;

   // Validate form fields
   valid &= validateField(name, 'name', 'Name is required.');
   valid &= validateEmail(email);
   valid &= validatePhone(phone); // Validate phone number
   valid &= validateField(message, 'message', 'Message is required.');

   if (valid) {
       // Simulate sending data (you can replace this with actual AJAX request)
       showResponseMessage(`Thank you for your message, ${name}!`);
       document.getElementById('contactForm').reset();
       setTimeout(clearResponseMessage, 5000); // Clear the response message after a few seconds
   }
});

// Function to validate individual fields
function validateField(value, fieldId, errorMessage) {
   if (!value) {
       document.getElementById(`${fieldId}Error`).innerText = errorMessage;
       return false;
   }
   return true;
}

// Email validation function
function validateEmail(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
   if (!regex.test(email)) {
       document.getElementById('emailError').innerText = 'Please enter a valid email.';
       return false;
   }
   return true;
}

// Phone validation function
function validatePhone(phone) {
   const regex = /^\+?[0-9]{10,15}$/; // Basic phone regex allowing optional '+' and numbers only
   if (!regex.test(phone)) {
       document.getElementById('phoneError').innerText = 'Please enter a valid phone number.';
       return false;
   }
   return true;
}

// Function to clear previous error messages
function clearErrors() {
   document.getElementById('nameError').innerText = '';
   document.getElementById('emailError').innerText = '';
   document.getElementById('phoneError').innerText = ''; // Clear phone error message
   document.getElementById('messageError').innerText = '';
}

// Function to show response message
function showResponseMessage(message) {
   const responseMessageElement = document.getElementById('responseMessage');
   responseMessageElement.innerText = message;
}

// Function to clear response message
function clearResponseMessage() {
   document.getElementById('responseMessage').innerText = '';
}