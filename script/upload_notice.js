document.addEventListener('DOMContentLoaded', function() {
    // Logic for notice type chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Logic for file upload
    const fileInput = document.getElementById('file-upload');
    const fileUploadText = document.getElementById('file-upload-text');
    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileUploadText.innerHTML = `Selected: <span class="file-name">${this.files[0].name}</span>`;
        } else {
            fileUploadText.textContent = '📎 Click to upload a file';
        }
    });

    // Form submission logic
    const noticeForm = document.getElementById('notice-form');
    noticeForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission

        const title = document.getElementById('notice-title').value;
        const details = document.getElementById('notice-details').value;
        const noticeType = document.querySelector('.chip.active').dataset.type;
        const isUrgent = document.getElementById('is-urgent').checked;
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'None';

        // In a real app, you would send this data to a server.
        // For this demo, we'll just show an alert with the collected info.
        
        alert(
            `Notice Posted Successfully!\n` +
            `---------------------------\n` +
            `Title: ${title}\n` +
            `Type: ${noticeType}\n` +
            `Urgent: ${isUrgent ? 'Yes' : 'No'}\n` +
            `Attachment: ${fileName}\n\n` +
            `Details: ${details}`
        );

        // Optionally, reset the form
        noticeForm.reset();
        fileUploadText.textContent = '📎 Click to upload a file';
        chips.forEach(c => c.classList.remove('active'));
        chips[0].classList.add('active');
    });
});