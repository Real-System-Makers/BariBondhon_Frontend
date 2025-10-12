document.addEventListener('DOMContentLoaded', function() {
    const assignTenantModal = document.getElementById('assignTenantModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const assignTenantForm = document.getElementById('assignTenantForm');
    const modalFlatName = document.getElementById('modalFlatName');
    let currentCard = null;

    // --- Modal Control ---
    const openModal = (card) => {
        currentCard = card;
        const flatName = card.querySelector('.flat-name').textContent;
        modalFlatName.textContent = flatName;
        assignTenantModal.classList.add('active');
    };
    const closeModal = () => {
        assignTenantModal.classList.remove('active');
        assignTenantForm.reset();
    };

    document.querySelectorAll('.assign-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.flat-tenant-card');
            openModal(card);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    assignTenantModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // --- Form Submission to Assign Tenant ---
    assignTenantForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!currentCard) return;

        // 1. Get data from form
        const tenantName = document.getElementById('tenantName').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const nameInitials = tenantName.split(' ').map(n => n[0]).join('').toUpperCase();

        // 2. Create the HTML for the "occupied" state
        const occupiedHTML = `
            <div class="occupied-info">
                <div class="tenant-details">
                    <div class="tenant-avatar">${nameInitials}</div>
                    <div>
                        <div class="tenant-name">${tenantName}</div>
                        <div class="tenant-contact">📞 ${contactNumber}</div>
                    </div>
                </div>
                <div class="rent-status">
                    <span class="status-label">Next Rent</span>
                    <span class="status-badge status-due">Due</span>
                </div>
            </div>
        `;

        // 3. Find the vacant-info div and replace it
        const vacantInfo = currentCard.querySelector('.vacant-info');
        if (vacantInfo) {
            vacantInfo.outerHTML = occupiedHTML;
        }

        // 4. Close modal and reset form
        closeModal();
    });
});