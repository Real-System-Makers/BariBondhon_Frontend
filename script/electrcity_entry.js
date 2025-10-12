document.addEventListener('DOMContentLoaded', function() {
    const meterReadingForm = document.getElementById('meterReadingForm');

    meterReadingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let allReadingsData = [];
        let validationFailed = false;

        const rows = document.querySelectorAll('.reading-row');
        rows.forEach(row => {
            const flatName = row.querySelector('.flat-label').textContent;
            const prevReadingInput = row.querySelector('.readonly-input');
            const currentReadingInput = row.querySelector('.current-reading');

            const prevReading = parseInt(prevReadingInput.value);
            const currentReading = parseInt(currentReadingInput.value);

            // --- Validation ---
            if (isNaN(currentReading) || currentReading < prevReading) {
                currentReadingInput.style.borderColor = '#ef4444'; // Highlight error
                validationFailed = true;
            } else {
                currentReadingInput.style.borderColor = '#e2e8f0'; // Reset on valid
            }

            allReadingsData.push({
                flat: flatName,
                previous_reading: prevReading,
                current_reading: currentReading
            });
        });

        if (validationFailed) {
            alert('Please correct the highlighted meter readings. Current reading must be a number and greater than the previous reading.');
            return;
        }
        
        // --- Simulate Submission ---
        // In a real app, you would send `allReadingsData` to your server.
        console.log("Data to be sent to server:", allReadingsData);
        
        alert('Electricity readings submitted successfully!');

        // You can optionally clear the input fields after successful submission
        // document.querySelectorAll('.current-reading').forEach(input => input.value = '');
    });
});