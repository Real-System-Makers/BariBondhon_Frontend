document.addEventListener('DOMContentLoaded', function() {
    const addFlatBtn = document.getElementById('addFlatBtn');
    const addFlatModal = document.getElementById('addFlatModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addFlatForm = document.getElementById('addFlatForm');
    const flatListContainer = document.getElementById('flatList');

    // --- Modal Control ---
    const openModal = () => addFlatModal.classList.add('active');
    const closeModal = () => addFlatModal.classList.remove('active');

    addFlatBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    addFlatModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // --- Number Stepper Logic ---
    document.querySelectorAll('.stepper-btn').forEach(button => {
        button.addEventListener('click', function() {
            const fieldId = this.dataset.field;
            const step = parseInt(this.dataset.step);
            const input = document.getElementById(fieldId);
            let currentValue = parseInt(input.value);
            if (isNaN(currentValue)) currentValue = 0;
            const newValue = currentValue + step;
            if (newValue >= parseInt(input.min)) {
                input.value = newValue;
            }
        });
    });

    // --- Form Submission to Add New Flat ---
    addFlatForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const flatName = document.getElementById('flatName').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const baths = document.getElementById('baths').value;
        const rent = document.getElementById('basicRent').value;

        const newFlatCard = document.createElement('div');
        newFlatCard.className = 'flat-card';
        newFlatCard.innerHTML = `
            <div class="flat-card-header">
                <div class="flat-name">${flatName}</div>
                <div class="status-badge status-vacant">Vacant</div>
            </div>
            <div class="flat-rent">৳${parseInt(rent).toLocaleString('en-IN')} <span>/ month</span></div>
            <div class="flat-features">
                <div class="feature-item">🛏️ ${bedrooms} Beds</div>
                <div class="feature-item">🛁 ${baths} Baths</div>
            </div>
        `;
        flatListContainer.appendChild(newFlatCard);
        closeModal();
        addFlatForm.reset();
        const totalFlats = document.querySelectorAll('.flat-card').length;
        document.querySelector('.page-summary').textContent = `You are managing ${totalFlats} flats in total.`;
    });
});