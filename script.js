/* ==========================================================================
   SLIDESHOW SYSTEM IMPLEMENTATION
   ========================================================================== */
let slideIndex = 1;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (!slides || slides.length === 0) return; // Guard clause if page lacks slideshow
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
}

function moveSlide(n) {
    showSlides(slideIndex += n);
}

// Auto-advance slideshow every 6 seconds
let autoSlideInterval = setInterval(() => {
    if (document.getElementsByClassName("slide").length > 0) {
        moveSlide(1);
    }
}, 6000);

/* ==========================================================================
   FORM VALIDATION SYSTEM
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Slideshow on Home page
    showSlides(slideIndex);

    const form = document.getElementById('contactForm');
    if (!form) return; // Guard clause if page has no form

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Reset Error Displays
        let isValid = true;
        const errorSummary = document.getElementById('errorSummary');
        errorSummary.style.display = 'none';
        errorSummary.innerHTML = '';
        
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

        // Field References
        const fullName = document.getElementById('fullName');
        const emailAddr = document.getElementById('emailAddr');
        const projectType = document.getElementById('projectType');
        const projectScope = document.getElementById('projectScope');
        const messageBody = document.getElementById('messageBody');

        // Validation Checks
        if (fullName.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Full name is required.';
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailAddr.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (projectType.value === '') {
            document.getElementById('typeError').textContent = 'Please select a project category.';
            isValid = false;
        }

        if (projectScope.value !== '' && Number(projectScope.value) < 10000) {
            document.getElementById('scopeError').textContent = 'Minimum project budget is $10,000.';
            isValid = false;
        }

        if (messageBody.value.trim().length < 15) {
            document.getElementById('messageError').textContent = 'Project brief must contain at least 15 characters.';
            isValid = false;
        }

        // Process Form Submission Status
        if (!isValid) {
            errorSummary.style.display = 'block';
            errorSummary.innerHTML = '<strong>Form Submission Error:</strong> Please fix highlighted fields above.';
        } else {
            alert('Consultation Request Received! Our design team will get back to you within 48 hours.');
            form.reset();
        }
    });
});
