// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Modal close functionality
    const closeModalBtns = document.querySelectorAll('#close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('#project-modal, #design-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

function closeModal() {
    const projectModal = document.getElementById('project-modal');
    const designModal = document.getElementById('design-modal');
    
    if (projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('show');
    }
    
    if (designModal) {
        designModal.classList.add('hidden');
        designModal.classList.remove('show');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// When closing modal, restore scroll
function closeModal() {
    const projectModal = document.getElementById('project-modal');
    const designModal = document.getElementById('design-modal');
    
    if (projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('show');
    }
    
    if (designModal) {
        designModal.classList.add('hidden');
        designModal.classList.remove('show');
    }
    
    document.body.style.overflow = 'auto';
}