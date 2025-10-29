// Load UI/UX Designs
/*document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('designs-container');
    
    if (!container) return;

    try {
        const response = await fetch('data/designs.json');
        const designs = await response.json();
        
        container.innerHTML = '';
        
        designs.forEach((design, index) => {
            const designCard = createDesignCard(design, index);
            container.innerHTML += designCard;
        });

        // Add click event listeners to design cards
        document.querySelectorAll('.design-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                showDesignModal(designs[index]);
            });
        });

    } catch (error) {
        console.error('Error loading designs:', error);
        container.innerHTML = `
            <div class="col-span-full text-center text-gray-400 py-20">
                <p class="text-xl mb-4">No designs found</p>
                <p>Add your designs to data/designs.json</p>
            </div>
        `;
    }
});

function createDesignCard(design, index) {
    const thumbnail = design.images && design.images.length > 0 
        ? design.images[0] 
        : 'assets/designs/placeholder.png';
    
    return `
        <div class="design-card bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all" style="box-shadow: 0 0 20px rgba(255, 0, 222, 0.15);" data-index="${index}">
            <div class="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden p-4">
                <img src="${thumbnail}" alt="${design.name}" class="w-full h-full object-contain">
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-2" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${design.name}</h3>
                <p class="text-gray-400 text-sm mb-3">${design.category}</p>
                <p class="text-gray-300 line-clamp-3">${design.description}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${design.tags.map(tag => `
                        <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(255, 0, 222, 0.2); color: #ff90e8;">${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showDesignModal(design) {
    const modal = document.getElementById('design-modal');
    const modalContent = document.getElementById('modal-content');
    
    const imagesHTML = design.images && design.images.length > 0 
        ? `
            <div class="image-gallery grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                ${design.images.map(img => `
                    <div class="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-4">
                        <img src="${img}" alt="${design.name}" class="rounded-lg w-full object-contain">
                    </div>
                `).join('')}
            </div>
        ` 
        : '';
    
    const figmaHTML = design.figmaLink 
        ? `
            <div class="mb-6">
                <a href="${design.figmaLink}" target="_blank" class="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition" style="background: linear-gradient(180deg, #00deff 0%, #ff00de 100%);">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
                    </svg>
                    <span>View in Figma</span>
                </a>
            </div>
        ` 
        : '';
    
    const prototypeHTML = design.prototypeLink
        ? `
            <div class="mb-6">
                <a href="${design.prototypeLink}" target="_blank" class="inline-flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                    <span>View Prototype</span>
                </a>
            </div>
        `
        : '';
    
    modalContent.innerHTML = `
        <h2 class="text-3xl font-bold mb-2" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${design.name}</h2>
        <p class="mb-4" style="color: #ff90e8;">${design.category}</p>
        <p class="text-gray-300 mb-6 leading-relaxed">${design.description}</p>
        
        ${figmaHTML}
        ${prototypeHTML}
        ${imagesHTML}
        
        <div class="flex flex-wrap gap-2 mb-4">
            ${design.tags.map(tag => `
                <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(255, 0, 222, 0.2); color: #ff90e8;">${tag}</span>
            `).join('')}
        </div>
        
        ${design.tools ? `
            <div class="mt-6">
                <h3 class="text-lg font-semibold mb-2">Tools Used</h3>
                <p class="text-gray-400">${design.tools.join(', ')}</p>
            </div>
        ` : ''}
            ${design.tags.map(tag => `
                <span class="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">${tag}</span>
            `).join('')}
        </div>
    `;
    
    openModal('design-modal');
}*/

// Load UI/UX Designs
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('designs-container');
    
    if (!container) return;

    try {
        const response = await fetch('data/designs.json');
        const designs = await response.json();
        
        container.innerHTML = '';
        
        designs.forEach((design, index) => {
            const designCard = createDesignCard(design, index);
            container.innerHTML += designCard;
        });

        // Add click event listeners to design cards
        document.querySelectorAll('.design-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                showDesignModal(designs[index]);
            });
        });

    } catch (error) {
        console.error('Error loading designs:', error);
        container.innerHTML = `
            <div class="col-span-full text-center text-gray-400 py-20">
                <p class="text-xl mb-4">No designs found</p>
                <p>Add your designs to data/designs.json</p>
            </div>
        `;
    }
});

function createDesignCard(design, index) {
    const thumbnail = design.images && design.images.length > 0 
        ? design.images[0] 
        : 'assets/designs/placeholder.png';
    
    return `
        <div class="design-card bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all hover:transform hover:scale-105" style="box-shadow: 0 0 20px rgba(255, 0, 222, 0.15);" data-index="${index}">
            <div class="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden p-4">
                <img src="${thumbnail}" alt="${design.name}" class="w-full h-full object-contain transition-transform hover:scale-110">
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-2" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${design.name}</h3>
                <p class="text-gray-400 text-sm mb-3">${design.category}</p>
                <p class="text-gray-300 line-clamp-3">${design.description}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${design.tags.map(tag => `
                        <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(255, 0, 222, 0.2); color: #ff90e8;">${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showDesignModal(design) {
    const modal = document.getElementById('design-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Enable vertical scrolling
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.overflowX = 'hidden';
    
    // Improved responsive image gallery
    const imagesHTML = design.images && design.images.length > 0 
        ? `
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-4" style="color: #ff90e8;">Design Mockups</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${design.images.map((img, idx) => `
                        <div class="relative group cursor-pointer bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-3" onclick="openDesignImageViewer(${idx}, ${JSON.stringify(design.images).replace(/"/g, '&quot;')})">
                            <img src="${img}" alt="${design.name} mockup ${idx + 1}" 
                                 class="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
                                 style="max-height: 350px; object-fit: contain;">
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
    
    const figmaHTML = design.figmaLink 
        ? `
            <div class="mb-4">
                <a href="${design.figmaLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105" style="background: linear-gradient(135deg, #00deff 0%, #ff00de 100%);">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
                    </svg>
                    <span>View in Figma</span>
                </a>
            </div>
        ` 
        : '';
    
    const prototypeHTML = design.prototypeLink
        ? `
            <div class="mb-6">
                <a href="${design.prototypeLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all hover:scale-105">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                    <span>View Prototype</span>
                </a>
            </div>
        `
        : '';
    
    modalContent.innerHTML = `
        <div class="max-w-5xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-3" style="background: linear-gradient(180deg, #ffffff 0%, #90ecff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${design.name}</h2>
            <p class="mb-4 text-sm md:text-base" style="color: #ff90e8;">${design.category}</p>
            
            <div class="flex flex-wrap gap-2 mb-6">
                ${design.tags.map(tag => `
                    <span class="px-3 py-1 rounded-full text-sm" style="background-color: rgba(255, 0, 222, 0.2); color: #ff90e8;">${tag}</span>
                `).join('')}
            </div>
            
            <p class="text-gray-300 mb-8 leading-relaxed text-base md:text-lg">${design.description}</p>
            
            ${design.tools ? `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2" style="color: #ff90e8;">Tools Used</h3>
                    <p class="text-gray-400">${design.tools.join(', ')}</p>
                </div>
            ` : ''}
            
            <div class="flex flex-wrap gap-3 mb-8">
                ${figmaHTML}
                ${prototypeHTML}
            </div>
            
            ${imagesHTML}
        </div>
    `;
    
    openModal('design-modal');
}

// Image viewer for design mockups
function openDesignImageViewer(index, images) {
    const viewer = document.createElement('div');
    viewer.id = 'design-image-viewer';
    viewer.className = 'fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4';
    viewer.innerHTML = `
        <button onclick="closeDesignImageViewer()" class="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <button onclick="navigateDesignImage(-1)" class="absolute left-4 text-white hover:text-gray-300 transition z-10 p-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
        <button onclick="navigateDesignImage(1)" class="absolute right-4 text-white hover:text-gray-300 transition z-10 p-2">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
        <div class="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-4" style="max-width: 90vw; max-height: 85vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img id="design-viewer-image" src="${images[index]}" alt="Full size view" style="max-width: calc(90vw - 2rem); max-height: calc(85vh - 2rem); width: auto; height: auto; object-fit: contain;">
        </div>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            <span id="design-image-counter">${index + 1} / ${images.length}</span>
        </div>
    `;
    
    document.body.appendChild(viewer);
    
    // Store images array and current index
    window.designViewerImages = images;
    window.designViewerIndex = index;
    
    // Close on backdrop click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer || e.target.closest('.bg-gradient-to-br')) {
            closeDesignImageViewer();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleDesignViewerKeyboard);
}

function closeDesignImageViewer() {
    const viewer = document.getElementById('design-image-viewer');
    if (viewer) {
        viewer.remove();
        document.removeEventListener('keydown', handleDesignViewerKeyboard);
    }
}

function navigateDesignImage(direction) {
    window.designViewerIndex = (window.designViewerIndex + direction + window.designViewerImages.length) % window.designViewerImages.length;
    document.getElementById('design-viewer-image').src = window.designViewerImages[window.designViewerIndex];
    document.getElementById('design-image-counter').textContent = `${window.designViewerIndex + 1} / ${window.designViewerImages.length}`;
}

function handleDesignViewerKeyboard(e) {
    if (e.key === 'Escape') closeDesignImageViewer();
    if (e.key === 'ArrowLeft') navigateDesignImage(-1);
    if (e.key === 'ArrowRight') navigateDesignImage(1);
}