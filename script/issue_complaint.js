document.addEventListener('DOMContentLoaded', function() {
    const issueType = document.getElementById('issueType');
    const description = document.getElementById('description');
    const fileInput = document.getElementById('fileInput');
    const uploadSection = document.getElementById('uploadSection');
    const submitBtn = document.getElementById('submitBtn');
    const charCount = document.getElementById('charCount');
    const dropdownIcon = document.getElementById('dropdownIcon');

    // Icon mapping for dropdown
    const icons = {
        'water': '💧',
        'electricity': '⚡',
        'lift': '🛗',
        'others': '🔧'
    };

    // Update dropdown icon
    issueType.addEventListener('change', function() {
        const selectedValue = this.value;
        if (selectedValue && icons[selectedValue]) {
            dropdownIcon.textContent = icons[selectedValue];
        } else {
            dropdownIcon.textContent = '💧';
        }
        validateForm();
    });

    // Character count for textarea
    description.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/500`;
        charCount.style.color = count > 450 ? '#ef4444' : '#9ca3af';
        validateForm();
    });

    // File upload functionality
    uploadSection.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and drop
    uploadSection.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadSection.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadSection.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        }
    });

    function handleFileUpload(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadSection.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded image" class="uploaded-image">
                <button class="remove-image" onclick="removeImage()">×</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    window.removeImage = function() {
        uploadSection.innerHTML = `
            <div class="upload-icon">📷</div>
            <div class="upload-text">Upload Photo</div>
            <div class="upload-subtext">Tap to add image or drag and drop</div>
        `;
        fileInput.value = '';
    };

    // Form validation
    function validateForm() {
        const isValid = issueType.value && description.value.trim().length > 10;
        submitBtn.disabled = !isValid;
    }

    // Submit form
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (issueType.value && description.value.trim()) {
            this.textContent = 'Submitting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = '✅ Request Submitted!';
                
                setTimeout(() => {
                    issueType.value = '';
                    description.value = '';
                    fileInput.value = '';
                    charCount.textContent = '0/500';
                    dropdownIcon.textContent = '💧';
                    if (document.querySelector('.uploaded-image')) {
                        removeImage();
                    }
                    this.textContent = 'Submit Request';
                    this.disabled = true;
                    
                    alert('Your maintenance request has been submitted successfully! You will receive updates on the progress.');
                }, 2000);
            }, 1500);
        }
    });

    // Back button
    document.querySelector('.back-btn').addEventListener('click', function() {
        alert('Going back to previous screen...');
    });

    // Previous request items
    const requestItems = document.querySelectorAll('.request-item');
    requestItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.querySelector('.request-type').textContent;
            const status = this.querySelector('.request-status').textContent;
            alert(`Request Details:\n${type}\nStatus: ${status}\n\nClick to view full details and communication history.`);
        });
    });
});