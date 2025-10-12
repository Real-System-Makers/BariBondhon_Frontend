document.addEventListener('DOMContentLoaded', function() {
    const rentCard = document.getElementById('rentCard');
    const rentModal = document.getElementById('rentModal');
    const closeRentModalBtn = document.getElementById('closeRentModalBtn');

    const openModal = () => rentModal.classList.add('active');
    const closeModal = () => rentModal.classList.remove('active');

    rentCard.addEventListener('click', openModal);
    closeRentModalBtn.addEventListener('click', closeModal);
    rentModal.addEventListener('click', (e) => {
        if (e.target === rentModal) closeModal();
    });

    document.querySelector('.download-btn').addEventListener('click', function() {
        this.innerHTML = '⏳ Downloading...';
        setTimeout(() => {
            this.innerHTML = '✅ Downloaded!';
            setTimeout(() => { this.innerHTML = '📥 Download Receipt'; }, 2000);
        }, 1500);
    });

    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const label = this.querySelector('.action-label').textContent;
            alert(`Opening ${label}...`);
        });
    });

    document.querySelectorAll('.notice-item').forEach(notice => {
        notice.addEventListener('click', function() {
            const title = this.querySelector('.notice-title').textContent;
            alert(`Viewing details for: ${title}`);
        });
    });

    const updateGreeting = () => {
        const now = new Date();
        const hour = now.getHours();
        let greeting = 'Welcome back,';
        document.querySelector('.welcome-text').textContent = greeting;
    };
    updateGreeting();
});