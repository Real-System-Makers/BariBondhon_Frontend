
        document.addEventListener('DOMContentLoaded', function() {
            // Add click listeners for demo purposes
            document.querySelector('.btn-login').addEventListener('click', () => alert('Navigating to Login Page...'));
            document.querySelector('.btn-signup').addEventListener('click', () => alert('Navigating to Sign Up Page...'));
            document.querySelector('.cta-owner').addEventListener('click', () => alert('Navigating to Owner Sign Up...'));
            document.querySelector('.cta-tenant').addEventListener('click', (event) => {
                event.preventDefault(); // Prevents the default '#' link behavior
                window.open('tolet.html', '_blank');
                    });
        });
    