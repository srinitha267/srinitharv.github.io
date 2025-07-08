// 1. Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 3. Google Sheets Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formMessage = document.getElementById('form-message');
        
        formMessage.textContent = "Sending your message...";
        formMessage.className = "";
        formMessage.style.display = "block";

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        fetch('YOUR_GOOGLE_SCRIPT_URL', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then(() => {
            formMessage.textContent = "Message sent successfully!";
            formMessage.className = "success";
            contactForm.reset();
        })
        .catch(() => {
            formMessage.textContent = "Failed to send. Please try again later.";
            formMessage.className = "error";
        })
        .finally(() => {
            setTimeout(() => formMessage.style.display = "none", 5000);
        });
    });
}