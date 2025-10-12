document.addEventListener('DOMContentLoaded', function() {
    const phoneContainer = document.getElementById('phoneContainer');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const signupText = document.querySelector('.signup-text');
    
    toggleOptions.forEach(option => {
        option.addEventListener('click', () => {
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            const selectedRole = option.dataset.role;
            
            if (selectedRole === 'tenant') {
                phoneContainer.classList.remove('theme-owner');
                phoneContainer.classList.add('theme-tenant');
                signupText.classList.add('hidden');
            } else {
                phoneContainer.classList.remove('theme-tenant');
                phoneContainer.classList.add('theme-owner');
                signupText.classList.remove('hidden');
            }
        });
    });

    document.querySelector('.login-button').addEventListener('click', (e) => {
        e.preventDefault();
        const role = document.querySelector('.toggle-option.active').dataset.role;
        alert(`Attempting to log in as ${role}...`);
    });
});