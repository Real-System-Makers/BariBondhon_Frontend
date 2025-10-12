document.addEventListener('DOMContentLoaded', function() {
    const moveOutForm = document.getElementById('moveOutForm');
    const dateInput = document.getElementById('moveOutDate');
    const pendingMessage = document.getElementById('pendingMessage');
    const submittedDateSpan = document.getElementById('submittedDate');
    const countdownSpan = document.getElementById('countdown');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmationModal = document.getElementById('confirmationModal');

    const noticePeriodMonths = 2; // Equivalent of 60 days
    let countdownInterval;

    // --- Custom Modal Logic ---
    const showCustomModal = (title, text, buttons) => {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalText').textContent = text;
        const footer = document.getElementById('modalFooter');
        footer.innerHTML = ''; // Clear old buttons
        buttons.forEach(btnInfo => {
            const button = document.createElement('button');
            button.textContent = btnInfo.text;
            button.className = `modal-btn ${btnInfo.class}`;
            button.onclick = () => {
                confirmationModal.classList.remove('active');
                if (btnInfo.callback) btnInfo.callback();
            };
            footer.appendChild(button);
        });
        confirmationModal.classList.add('active');
    };

    // --- Function to switch views ---
    function showView(viewName) {
        moveOutForm.style.display = 'none';
        pendingMessage.style.display = 'none';
        if (viewName === 'form') {
            moveOutForm.style.display = 'flex';
            moveOutForm.style.flexDirection = 'column';
            moveOutForm.style.height = '100%';
        } else if (viewName === 'pending') {
            pendingMessage.style.display = 'block';
        }
    }

    // --- Countdown Timer Logic ---
    function startCountdown(deadline) {
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                localStorage.removeItem('moveOutRequest');
                showCustomModal('Notice Sent', 'Your move-out notice has been automatically sent to the landlord.', [{ text: 'OK', class: 'btn-primary', callback: () => showView('form') }]);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                countdownSpan.textContent = `${days}d ${hours}h`;
            }
        }, 1000);
    }

    // --- Check Local Storage on Page Load ---
    function checkExistingRequest() {
        const existingRequest = JSON.parse(localStorage.getItem('moveOutRequest'));
        if (existingRequest) {
            const deadline = new Date(existingRequest.deadline);
            if (new Date() < deadline) {
                const [year, month] = existingRequest.moveOutMonth.split('-');
                const displayDate = new Date(year, month - 1);
                submittedDateSpan.textContent = displayDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                showView('pending');
                startCountdown(deadline);
            } else {
                localStorage.removeItem('moveOutRequest');
            }
        } else {
            const today = new Date();
            const earliestDate = new Date(today.setMonth(today.getMonth() + noticePeriodMonths));
            const year = earliestDate.getFullYear();
            const month = String(earliestDate.getMonth() + 1).padStart(2, '0');
            dateInput.min = `${year}-${month}`;
        }
    }

    // --- Form Submission ---
    moveOutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const moveOutMonth = dateInput.value;
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7); // 7-day period

        const requestData = { moveOutMonth, deadline: deadline.toISOString() };
        localStorage.setItem('moveOutRequest', JSON.stringify(requestData));
        
        showCustomModal('Notice Submitted', 'Your request is now pending review for 7 days. You can cancel it during this period.', [{ text: 'OK', class: 'btn-primary', callback: checkExistingRequest }]);
    });

    // --- Cancel Button Logic ---
    cancelBtn.addEventListener('click', function() {
        const performCancellation = () => {
            localStorage.removeItem('moveOutRequest');
            clearInterval(countdownInterval);
            showCustomModal('Cancelled', 'Your move-out request has been successfully cancelled.', [{ text: 'OK', class: 'btn-primary', callback: () => location.reload() }]);
        };

        showCustomModal(
            'Confirm Cancellation', 
            'Are you sure you want to cancel your move-out request?', 
            [
                { text: 'No', class: 'btn-secondary' },
                { text: 'Yes, Cancel', class: 'btn-danger', callback: performCancellation }
            ]
        );
    });

    checkExistingRequest();
});