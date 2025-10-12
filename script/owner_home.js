document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on load
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        stat.textContent = '৳0';
        setTimeout(() => {
            stat.style.transition = 'all 1s ease';
            stat.textContent = finalValue;
        }, 500);
    });
    // Action button interactions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const label = btn.querySelector('.action-label').textContent;
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
                alert(`Opening ${label}...`);
            }, 150);
        });
    });
    // Utility cards click handler
    const utilityCards = document.querySelectorAll('.utility-card');
    utilityCards.forEach(card => {
        card.addEventListener('click', () => {
            const utility = card.querySelector('.utility-label').textContent;
            alert(`Viewing ${utility} bill details...`);
        });
    });
    // Stat cards click for details
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            const label = card.querySelector('.stat-label').textContent;
            alert(`Viewing detailed ${label} report...`);
        });
    });
    
    // Update greeting based on current time
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        
        let greeting = 'Good Morning,';
        if (hour >= 12 && hour < 18) {
            greeting = 'Good Afternoon,';
        } else if (hour >= 18 || hour < 5) {
            greeting = 'Good Evening,';
        }
        document.querySelector('.welcome-text').textContent = greeting;
    }
    updateGreeting();
});