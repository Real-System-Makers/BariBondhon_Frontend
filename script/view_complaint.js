document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const complaintCards = document.querySelectorAll('.complaint-card');
    const modal = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            complaintCards.forEach(card => {
                if (filter === 'all' || card.dataset.status === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Action button handlers
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            
            const action = this.textContent.trim();
            const card = this.closest('.complaint-card');
            const tenantName = card.querySelector('.tenant-name').textContent;
            
            if (action === 'Mark In Progress') {
                card.dataset.status = 'progress';
                card.querySelector('.status-badge').className = 'status-badge status-progress';
                card.querySelector('.status-badge').textContent = 'In Progress';
                this.style.display = 'none';
                alert(`Marked ${tenantName}'s complaint as In Progress`);
            } else if (action === 'Resolve') {
                card.dataset.status = 'resolved';
                card.querySelector('.status-badge').className = 'status-badge status-resolved';
                card.querySelector('.status-badge').textContent = 'Resolved';
                card.querySelectorAll('.btn-progress, .btn-resolve').forEach(b => b.style.display = 'none');
                alert(`Resolved ${tenantName}'s complaint`);
            } else if (action === 'Reply') {
                card.click(); 
            }
        });
    });

    // Card click to open detail modal
    complaintCards.forEach(card => {
        card.addEventListener('click', function() {
            const tenantName = this.querySelector('.tenant-name').textContent;
            const flatNumber = this.querySelector('.flat-number').textContent;
            const issueType = this.querySelector('.issue-type').textContent.trim();
            
            document.querySelector('.modal-tenant').textContent = tenantName;
            document.querySelector('.modal-issue').textContent = `${issueType} - ${flatNumber}`;
            
            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Send reply functionality
    document.querySelector('.send-reply-btn').addEventListener('click', function() {
        const replyTextarea = document.querySelector('.reply-textarea');
        const message = replyTextarea.value.trim();

        if (message) {
            alert(`Reply sent:\n\n"${message}"`);
            replyTextarea.value = '';
            modal.style.display = 'none';
        } else {
            alert('Please type a message before sending.');
        }
    });
});