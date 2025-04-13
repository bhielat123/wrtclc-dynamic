document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.admission-form');
    const confirmation = document.getElementById('confirmation');
    const overlay = document.createElement('div');
    overlay.className = 'confirmation-overlay';
    document.body.appendChild(overlay);

    // Validation rules configuration
    const validationRules = {
        phone: value => /^09\d{9}$/.test(value) || 'Invalid PH phone number',
        dob: value => new Date(value) < new Date() || 'Birth date cannot be in future',
        zipcode: value => /^\d{4}$/.test(value) || 'Invalid ZIP code',
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
        'birth-certificate': file => 
            file.size <= 2 * 1024 * 1024 || 'File too large (max 2MB)',
        'id-picture': file => 
            file.size <= 1 * 1024 * 1024 || 'ID photo too large (max 1MB)'
    };

    // Enhanced validation function
    const validateField = (input) => {
        const errorElement = input.parentElement.querySelector('.error');
        let isValid = true;
        let message = '';

        if (input.required && !input.value.trim()) {
            message = 'This field is required';
            isValid = false;
        } else if (validationRules[input.id]) {
            const result = validationRules[input.id](input.type === 'file' 
                ? input.files[0] 
                : input.value);
            if (typeof result === 'string') {
                message = result;
                isValid = false;
            }
        }

        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^09\d{9}$/;
            if (!phoneRegex.test(input.value)) {
                message = 'Phone must be 11 digits starting with 09';
                isValid = false;
            }
        }

        if (input.type === 'file' && input.files[0]) {
            const allowedTypes = {
                'birth-certificate': ['image/jpeg', 'image/png', 'application/pdf'],
                'id-picture': ['image/jpeg', 'image/png']
            };
            if (allowedTypes[input.id] && 
                !allowedTypes[input.id].includes(input.files[0].type)) {
                message = `Invalid file type. Allowed: ${allowedTypes[input.id].join(', ')}`;
                isValid = false;
            }
        }

        showError(input, message);
        return isValid;
    };

    // Advanced error handling
    const showError = (input, message) => {
        const error = input.parentElement.querySelector('.error') || createErrorElement(input);
        error.textContent = message;
        error.style.display = message ? 'block' : 'none';
        input.classList.toggle('invalid', !!message);
        
        // Accessibility enhancements
        input.setAttribute('aria-invalid', !!message);
        input.setAttribute('aria-describedby', error.id);
    };

    const createErrorElement = (input) => {
        const error = document.createElement('div');
        error.className = 'error';
        error.id = `${input.id}-error`;
        error.setAttribute('role', 'alert');
        error.setAttribute('aria-live', 'polite');
        input.parentNode.insertBefore(error, input.nextElementSibling);
        return error;
    };

    // Enhanced page validation
    function validatePage(page) {
        let isValid = true;
        const inputs = page.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (!isValid) {
            const firstInvalid = page.querySelector('.invalid');
            firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid?.focus();
        }

        return isValid;
    }

    // Real-time validation with debounce
    let timeout;
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => validateField(e.target), 500);
        });
        
        input.addEventListener('blur', () => validateField(input));
    });

    // Enhanced navigation with animation
    window.showPage = (pageNumber) => {
        const currentPage = document.querySelector('.page.active');
        if (currentPage && !validatePage(currentPage)) return;

        document.querySelectorAll('.page').forEach(page => {
            page.style.transform = `translateX(${pageNumber > parseInt(page.dataset.page) ? '100%' : '-100%'})`;
            page.style.opacity = '0';
            
            setTimeout(() => {
                page.classList.remove('active');
                if (page.id === `page${pageNumber}`) {
                    page.style.transform = 'translateX(0)';
                    page.style.opacity = '1';
                    page.classList.add('active');
                }
            }, 300);
        });
    };

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;

        document.querySelectorAll('.page').forEach(page => {
            if (!validatePage(page)) allValid = false;
        });

        if (allValid) {
            overlay.style.display = 'block';
            confirmation.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                overlay.style.display = 'none';
                confirmation.style.display = 'none';
                showPage(1);
            }, 5000);
        } else {
            showErrorSummary();
        }
    });

    function showErrorSummary() {
        const errors = document.querySelectorAll('.error');
        const errorList = [...errors].filter(e => e.textContent).map(e => e.textContent);
        
        if (errorList.length) {
            const summary = document.createElement('div');
            summary.className = 'error-summary';
            summary.innerHTML = `
                <h3>Please fix these errors:</h3>
                <ul>${errorList.map(e => `<li>${e}</li>`).join('')}</ul>
            `;
            form.prepend(summary);
            summary.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
