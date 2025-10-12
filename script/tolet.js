document.addEventListener('DOMContentLoaded', function() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const propertyCards = document.querySelectorAll('.property-card');
    const resultsCount = document.querySelector('.results-count');

    // --- FILTER CHIPS FUNCTIONALITY ---
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let visibleCount = 0;

            propertyCards.forEach(card => {
                const categories = card.dataset.category || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            resultsCount.textContent = `${visibleCount} propert${visibleCount === 1 ? 'y' : 'ies'} found`;
        });
    });

    // --- FAVORITE BUTTON FUNCTIONALITY ---
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '❤️';
                this.style.transform = 'scale(1.2)';
            } else {
                this.innerHTML = '🤍';
                this.style.transform = 'scale(0.8)';
            }
            setTimeout(() => { this.style.transform = ''; }, 200);
        });
    });

    // --- CONTACT BUTTON FUNCTIONALITY ---
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const propertyCard = this.closest('.property-card');
            const title = propertyCard.querySelector('.property-title').textContent;
            const owner = propertyCard.querySelector('.owner-name').textContent;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                alert(`Contacting ${owner} about "${title}"...`);
            }, 150);
        });
    });

    // --- PROPERTY CARD CLICK FOR DETAILS ---
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.property-title').textContent;
            alert(`Opening details for "${title}"...`);
        });
    });

    // --- SEARCH FUNCTIONALITY ---
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.trim().toLowerCase();
            let visibleCount = 0;

            propertyCards.forEach(card => {
                const title = card.querySelector('.property-title').textContent.toLowerCase();
                const location = card.querySelector('.property-location').textContent.toLowerCase();
                
                if (title.includes(query) || location.includes(query)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            resultsCount.textContent = `${visibleCount} propert${visibleCount === 1 ? 'y' : 'ies'} found`;
        }, 500);
    });

    // --- PROFILE BUTTON ---
    document.querySelector('.profile-btn').addEventListener('click', function() {
        alert('Opening user profile and account settings...');
    });
});