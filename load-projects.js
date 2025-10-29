// Load Flutter Projects
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('projects-container');
    
    if (!container) return;

    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        container.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            container.innerHTML += projectCard;
        });

        // Add click event listeners to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                showProjectModal(projects[index]);
            });
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `
            <div class="col-span-full text-center text-gray-400 py-20">
                <p class="text-xl mb-4">No projects found</p>
                <p>Add your projects to data/projects.json</p>
            </div>
        `;
    }
});

function createProjectCard(project, index) {
    const thumbnail = project.images && project.images.length > 0 
        ? project.images[0] 
        : 'assets/projects/placeholder.png';
    
    return `
        <div class="project-card bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105" style="box-shadow: 0 0 20px rgba(0, 222, 255, 0.15);" data-index="${index}">
            <div class="aspect-video bg-gray-700 overflow-hidden">
                <img src="${thumbnail}" alt="${project.name}" class="w-full h-full object-cover transition-transform hover:scale-110">
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-2" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${project.name}</h3>
                <p class="text-gray-400 text-sm mb-3">${project.platforms.join(' • ')}</p>
                <p class="text-gray-300 line-clamp-3">${project.description}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${project.tags.map(tag => `
                        <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(0, 222, 255, 0.2); color: #90ecff;">${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Ensure modal content has overflow scroll
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.overflowX = 'hidden';
    
    // Improved image gallery with responsive design
    const imagesHTML = project.images && project.images.length > 0 
        ? `
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4" style="color: #90ecff;">Screenshots</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${project.images.map((img, idx) => `
                        <div class="relative group cursor-pointer" onclick="openImageViewer(${idx}, ${JSON.stringify(project.images).replace(/"/g, '&quot;')})">
                            <img src="${img}" alt="${project.name} screenshot ${idx + 1}" 
                                 class="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
                                 style="max-height: 400px; object-fit: contain; background: #1f2937;">
                            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                                <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                </svg>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` 
        : '';
    
    // Improved video player with responsive design
    const videoHTML = project.demoVideo 
        ? `
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4" style="color: #90ecff;">Demo Video</h3>
                <div class="relative rounded-lg overflow-hidden shadow-xl" style="background: #1f2937;">
                    <video controls class="w-full max-w-md mx-auto" style="max-height: 600px;">
                        <source src="${project.demoVideo}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        ` 
        : '';
    
    const downloadsHTML = project.downloads && Object.keys(project.downloads).length > 0 
        ? `
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-4" style="color: #90ecff;">Download</h3>
                <div class="flex flex-wrap gap-3">
                    ${Object.entries(project.downloads).map(([platform, url]) => `
                        <a href="${url}" download class="text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 hover:shadow-xl transition-all hover:scale-105" style="background: linear-gradient(135deg, #00deff 0%, #ff00de 100%);">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            <span>${platform}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        ` 
        : '';
    
    const linksHTML = project.links && typeof project.links === 'object' && Object.keys(project.links).length > 0
        ? `
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-4" style="color: #90ecff;">Links</h3>
                <div class="flex flex-wrap gap-3">
                    ${Object.entries(project.links).map(([name, url]) => `
                        <a href="${url}" target="_blank" rel="noopener noreferrer" class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition inline-flex items-center space-x-2">
                            <span>${name}</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    `).join('')}
                </div>
            </div>
        `
        : '';
    
    modalContent.innerHTML = `
        <div class="max-w-5xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-3" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${project.name}</h2>
            <p class="mb-4 text-sm md:text-base" style="color: #90ecff;">${project.platforms.join(' • ')}</p>
            
            <div class="flex flex-wrap gap-2 mb-6">
                ${project.tags.map(tag => `
                    <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(0, 222, 255, 0.2); color: #90ecff;">${tag}</span>
                `).join('')}
            </div>
            
            <p class="text-gray-300 mb-8 leading-relaxed text-base md:text-lg">${project.description}</p>
            
            ${downloadsHTML}
            ${linksHTML}
            ${videoHTML}
            ${imagesHTML}
        </div>
    `;
    
    openModal('project-modal');
}

// Image viewer function for full-screen viewing
function openImageViewer(index, images) {
    const viewer = document.createElement('div');
    viewer.id = 'image-viewer';
    viewer.className = 'fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4';
    viewer.innerHTML = `
        <button onclick="closeImageViewer()" class="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <button onclick="navigateImage(-1)" class="absolute left-4 text-white hover:text-gray-300 transition z-10 p-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
        <button onclick="navigateImage(1)" class="absolute right-4 text-white hover:text-gray-300 transition z-10 p-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
        <img id="viewer-image" src="${images[index]}" alt="Full size view" class="max-w-full max-h-full object-contain">
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            <span id="image-counter">${index + 1} / ${images.length}</span>
        </div>
    `;
    
    document.body.appendChild(viewer);
    
    // Store images array and current index
    window.viewerImages = images;
    window.viewerIndex = index;
    
    // Close on backdrop click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            closeImageViewer();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleViewerKeyboard);
}

function closeImageViewer() {
    const viewer = document.getElementById('image-viewer');
    if (viewer) {
        viewer.remove();
        document.removeEventListener('keydown', handleViewerKeyboard);
    }
}

function navigateImage(direction) {
    window.viewerIndex = (window.viewerIndex + direction + window.viewerImages.length) % window.viewerImages.length;
    document.getElementById('viewer-image').src = window.viewerImages[window.viewerIndex];
    document.getElementById('image-counter').textContent = `${window.viewerIndex + 1} / ${window.viewerImages.length}`;
}

function handleViewerKeyboard(e) {
    if (e.key === 'Escape') closeImageViewer();
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
}