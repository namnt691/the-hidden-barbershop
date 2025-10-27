
// Language switching functionality
let currentLanguage = 'vi';

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-vi][data-en]').forEach(element => {
        if (lang === 'vi') {
            element.textContent = element.getAttribute('data-vi');
        } else if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update form placeholders
    document.querySelectorAll('input[data-placeholder-vi][data-placeholder-en]').forEach(input => {
        if (lang === 'vi') {
            input.placeholder = input.getAttribute('data-placeholder-vi');
        } else if (lang === 'en') {
            input.placeholder = input.getAttribute('data-placeholder-en');
        }
    });

    // Update textarea placeholders
    document.querySelectorAll('textarea[data-placeholder-vi][data-placeholder-en]').forEach(textarea => {
        if (lang === 'vi') {
            textarea.placeholder = textarea.getAttribute('data-placeholder-vi');
        } else if (lang === 'en') {
            textarea.placeholder = textarea.getAttribute('data-placeholder-en');
        }
    });

    // Update select options
    document.querySelectorAll('select option[data-vi][data-en]').forEach(option => {
        if (lang === 'vi') {
            option.textContent = option.getAttribute('data-vi');
        } else if (lang === 'en') {
            option.textContent = option.getAttribute('data-en');
        }
    });

    // Update language button states (desktop)
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`#lang-${lang}`).classList.add('active');

    // Update language button states (mobile)
    document.querySelectorAll('.language-btn-mobile').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.language-btn-mobile[data-lang="${lang}"]`).classList.add('active');

    // Update document title
    document.title = lang === 'vi' 
        ? 'THE HIDDEN BARBERSHOP - Nơi Định Nghĩa Phong Cách'
        : 'THE HIDDEN BARBERSHOP - Where Style is Defined';

    // Update service modal if it's currently open
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal && !serviceModal.classList.contains('hidden')) {
        // Find which service is currently displayed and refresh it
        const modalServiceName = document.getElementById('modalServiceName');
        if (modalServiceName) {
            // Find the service ID by matching the current name
            for (let serviceId in serviceDetails) {
                const service = serviceDetails[serviceId];
                if (service.name.vi === modalServiceName.textContent || service.name.en === modalServiceName.textContent) {
                    // Refresh the modal with the new language
                    setTimeout(() => openServiceModal(parseInt(serviceId)), 100);
                    break;
                }
            }
        }
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language button event listeners
document.getElementById('lang-vi').addEventListener('click', () => switchLanguage('vi'));
document.getElementById('lang-en').addEventListener('click', () => switchLanguage('en'));

// Mobile language button event listeners
document.querySelectorAll('.language-btn-mobile').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        switchLanguage(savedLanguage);
    }

    // switchLanguage('en');
});

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    const logo = navbar.querySelector('.font-bold.text-2xl');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (window.scrollY > -1) {
        // Add white background and shadow
        navbar.classList.add('bg-white', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
        
        // Update navigation links
        navbar.querySelectorAll('a:not(.btn-primary):not(.language-btn)').forEach(link => {
            link.classList.remove('text-white', 'hover:text-yellow-400');
            link.classList.add('text-gray-800', 'hover:text-yellow-600');
        });
        
        // Update logo
        if (logo) {
            logo.classList.remove('text-white');
            logo.classList.add('text-gray-800');
        }
        
        // Update mobile menu button
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('text-white');
            mobileMenuBtn.classList.add('text-gray-800');
        }
        
        // Update language buttons for scrolled state
        navbar.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('text-white');
            btn.classList.add('text-gray-700');
        });
        
        // Update language switch container
        const langContainer = navbar.querySelector('.bg-white.bg-opacity-20');
        if (langContainer) {
            langContainer.classList.remove('bg-white', 'bg-opacity-20');
            langContainer.classList.add('bg-gray-100');
        }
        
        scrollTop.classList.remove('opacity-0');
        scrollTop.classList.add('opacity-100');
    } else {
        // Remove white background and shadow
        navbar.classList.remove('bg-white', 'shadow-lg');
        navbar.classList.add('bg-transparent');
        
        // Restore navigation links
        navbar.querySelectorAll('a:not(.btn-primary):not(.language-btn)').forEach(link => {
            link.classList.add('text-white', 'hover:text-yellow-400');
            link.classList.remove('text-gray-800', 'hover:text-yellow-600');
        });
        
        // Restore logo
        if (logo) {
            logo.classList.add('text-white');
            logo.classList.remove('text-gray-800');
        }
        
        // Restore mobile menu button
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('text-white');
            mobileMenuBtn.classList.remove('text-gray-800');
        }
        
        // Restore language buttons
        navbar.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.add('text-white');
            btn.classList.remove('text-gray-700');
        });
        
        // Restore language switch container
        const langContainer = navbar.querySelector('.bg-gray-100');
        if (langContainer) {
            langContainer.classList.add('bg-white', 'bg-opacity-20');
            langContainer.classList.remove('bg-gray-100');
        }
        
        scrollTop.classList.add('opacity-0');
        scrollTop.classList.remove('opacity-100');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Service Modal Functions
const serviceModal = document.getElementById('serviceModal');

//# Service data
//1. Cắt Cơ Bản - Basic Cut : 200k
// 2. Ép phồng mái - Fringe Up Perm : 100k
// 3. Ép Side - Down Perm : 200-300k
// 4. Duỗi tóc - Straighten up: 200-300k
// 5. Cạo khăn nóng - Hot Towel Shave: 150k
// 6. Nhuộm tóc : 
// - Nhuộm đen - Black Hair : 250k
// - Nhuộm màu thường - Basic Color : 300k ( Size S ) - 400k ( Size M ) - 500k ( Size L )
// - Nhuộm màu tẩy (thời trang) - Fashion Color: 350k ( Size S ) - 450k ( Size M ) - 550k ( Size L ) 
// - Tẩy tóc - Blonding : 350k ( Size S ) - 450k ( Size M ) - 550k ( Size L )
// - Bóc đen đỏ xanh - Removed Color : 350k ( Size S ) - 450k ( Size M ) - 550k ( Size L )
// 7. Uốn tóc - Perm :
// - Xoăn nhẹ ( xoăn C,S) - Wavy Perm : 350k ( Size S ) - 450k ( Size M ) - 550k ( Size L )
// - Xoăn vừa ( xoăn rối ) - Messy Perm :  450k ( Size S ) - 550k ( Size M ) - 650k ( Size L )
// - Xoăn nhiều ( xoăn xù ) - Curly Perm : 550k ( Size S ) - 650k ( Size M ) - 750k ( Size L )
const serviceDetails = {
    1: {
        name: {
            vi: 'Gói Private Cut 1:1',
            en: 'Private Cut Package 1:1'
        },
        price: {
            vi: '200,000 VNĐ',
            en: '$8'
        },
        duration: {
            vi: '60 phút',
            en: '60 minutes'
        },
        includes: {
            vi: '4 dịch vụ',
            en: '4 services'
        },
        category: {
            vi: 'Cao cấp',
            en: 'Premium'
        },
        highlights: {
            vi: [
                'Cắt tóc theo yêu cầu với kỹ thuật chuyên nghiệp',
                'Gội đầu thư giãn với dầu gội cao cấp',
                'Tạo kiểu với sáp/gel định hình',
                'Vệ sinh tai và lông mũi'
            ],
            en: [
                'Professional haircut according to requirements',
                'Relaxing shampoo with premium products',
                'Hair styling with wax/gel',
                'Ear and nose hair cleaning'
            ]
        },
        description: {
            vi: 'Gói dịch vụ cơ bản dành cho quý ông hiện đại, mang đến diện mạo lịch lãm và phong cách.',
            en: 'Basic service package for modern gentlemen, bringing elegant and stylish appearance.'
        }
    },
    2: {
        name: {
            vi: 'Gói Tẩy - Nhuộm',
            en: 'Bleaching & Coloring Package'
        },
        price: {
            vi: 'Chỉ từ 250,000 VNĐ',
            en: 'Starting from $10'
        },
        duration: {
            vi: '90 phút',
            en: '90 minutes'
        },
        includes: {
            vi: '8 dịch vụ',
            en: '8 services'
        },
        category: {
            vi: 'Cao cấp',
            en: 'Premium'
        },
        highlights: {
            vi: [
                'Nhuộm đen - Black Hair: 250k',
                'Nhuộm màu thường - Basic Color: 300-500k',
                'Nhuộm màu tẩy (thời trang) - Fashion Color: 350-550k',
                'Tẩy tóc - Blonding: 350-550k',
                'Bóc đen đỏ xanh - Color Removal: 350-550k',
                'Cạo khăn nóng - Hot Towel Shave: 150k',
                'Gội đầu dưỡng chất - Nourishing Shampoo: 100k',
                'Hấp dầu phục hồi - Deep Conditioning: 150k'
            ],
            en: [
                'Black Hair Dye: $10',
                'Basic Color Dye: $12-20',
                'Fashion Color (Bleached): $14-22',
                'Hair Bleaching: $14-22',
                'Color Removal: $14-22',
                'Hot Towel Shave: $6',
                'Nourishing Shampoo: $4',
                'Deep Conditioning Treatment: $6'
            ]
        },
        description: {
            vi: 'Sử dụng sản phẩm cao cấp nhất thị trường. Cam kết không đau rát, kích ứng.',
            en: 'Using the highest quality products on the market. Guaranteed no pain, irritation or allergic reactions.'
        }
    },
    3: {
        name: {
            vi: 'Gói Uốn - Ép tóc',
            en: 'Perm & Straightening Package'
        },
        price: {
            vi: 'Chỉ từ 200,000 VNĐ',
            en: 'Starting from $8'
        },
        duration: {
            vi: '120 phút',
            en: '120 minutes'
        },
        includes: {
            vi: '7 dịch vụ',
            en: '7 services'
        },
        category: {
            vi: 'Cao cấp',
            en: 'Premium'
        },
        highlights: {
            vi: [
                'Ép phồng mái - Fringe Up Perm: 100k',
                'Ép Side - Down Perm: 200-300k',
                'Duỗi tóc - Hair Straightening: 200-300k',
                'Cạo khăn nóng - Hot Towel Shave: 150k',
                'Uốn tóc xoăn nhẹ - Wavy Perm: 350-550k',
                'Uốn tóc xoăn vừa - Messy Perm: 450-650k',
                'Uốn tóc xoăn nhiều - Curly Perm: 550-750k'
            ],
            en: [
                'Fringe Volume Perm: $4',
                'Side Down Perm: $8-12',
                'Hair Straightening: $8-12',
                'Hot Towel Shave: $6',
                'Light Wave Perm: $14-22',
                'Messy Perm: $18-26',
                'Heavy Curly Perm: $22-30'
            ]
        },
        description: {
            vi: 'Sử dụng sản phẩm cao cấp nhất thị trường. Cam kết không đau rát, kích ứng.',
            en: 'Using the highest quality products on the market. Guaranteed no pain, irritation or allergic reactions.'
        }
    }
};

function openServiceModal(serviceId) {
    console.log('Opening service modal for ID:', serviceId);
    const service = serviceDetails[serviceId];
    
    if (!service) {
        console.error('Service not found:', serviceId);
        alert('Dịch vụ không tìm thấy!');
        return;
    }
    
    const modal = document.getElementById('serviceModal');
    if (!modal) {
        console.error('Service modal element not found!');
        alert('Không tìm thấy modal!');
        return;
    }
    
    // Get current language
    const lang = currentLanguage || 'vi';
    
    // Update modal content with language-specific data
    const modalServiceName = document.getElementById('modalServiceName');
    const modalServicePrice = document.getElementById('modalServicePrice');
    const modalServiceDuration = document.getElementById('modalServiceDuration');
    const modalServiceIncludes = document.getElementById('modalServiceIncludes');
    const modalServiceCategory = document.getElementById('modalServiceCategory');
    const modalServiceDescription = document.getElementById('modalServiceDescription');
    
    if (modalServiceName) modalServiceName.textContent = service.name[lang];
    if (modalServicePrice) modalServicePrice.textContent = service.price[lang];
    if (modalServiceDuration) modalServiceDuration.textContent = service.duration[lang];
    if (modalServiceIncludes) modalServiceIncludes.textContent = service.includes[lang];
    if (modalServiceCategory) modalServiceCategory.textContent = service.category[lang];
    if (modalServiceDescription) modalServiceDescription.textContent = service.description[lang];
    
    // Update highlights with current language
    const highlightsList = document.getElementById('modalServiceHighlights');
    if (highlightsList) {
        highlightsList.innerHTML = '';
        service.highlights[lang].forEach(highlight => {
            const li = document.createElement('li');
            li.className = 'flex items-start text-gray-300 mb-2';
            li.innerHTML = `<i class="fas fa-scissors text-yellow-400 mr-3 mt-1 text-sm"></i><span>${highlight}</span>`;
            highlightsList.appendChild(li);
        });
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    console.log('Service modal opened successfully');
}

function closeServiceModal() {
    serviceModal.classList.add('hidden');
    serviceModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Function to handle "Đặt lịch ngay" button in modal
function bookServiceFromModal() {
    closeServiceModal();
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to handle "Liên hệ tư vấn" button in modal
function contactFromModal() {
    closeServiceModal();
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Service Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('#serviceModal .close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }
    
    if (serviceModal) {
        serviceModal.addEventListener('click', function(e) {
            if (e.target === serviceModal) {
                closeServiceModal();
            }
        });
    }
});



// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle shake effect to badge
        const badge = this.querySelector('.service-badge');
        if (badge) {
            badge.style.animation = 'pulse 0.6s ease-in-out';
        }
        
        // Add glow effect to price
        const price = this.querySelector('.service-price');
        if (price) {
            price.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        // Remove effects
        const badge = this.querySelector('.service-badge');
        if (badge) {
            badge.style.animation = '';
        }
        
        const price = this.querySelector('.service-price');
        if (price) {
            price.style.textShadow = '';
        }
    });
    
    // Add click effect - Show service details or booking
    // card.addEventListener('click', function() {
    //     this.style.transform = 'translateY(-10px) scale(0.98)';
    //     setTimeout(() => {
    //         this.style.transform = '';
    //     }, 150);
        
    //     // Scroll to contact form for booking
    //     setTimeout(() => {
    //         document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    //     }, 200);
    // });
});

// Gallery Lightbox functionality
const galleryImages = [
    { src: './image/customer/c1.jpg', alt: 'Khách hàng hài lòng' },
    { src: './image/customer/c2.jpg', alt: 'Không gian Barbershop hiện đại' },
    { src: './image/customer/c3.jpg', alt: 'Cắt tóc chuyên nghiệp' },
    { src: './image/customer/c11.jpg', alt: 'no11' },
    // { src: './image/customer/c4.jpg', alt: 'Kiểu tóc thời trang' },
    { src: './image/customer/c10.jpg', alt: 'no10' },
    // { src: './image/customer/c5.jpg', alt: 'Cạo râu truyền thống' },
    { src: './image/customer/c6.jpg', alt: 'Dịch vụ chăm sóc cao cấp' },
    { src: './image/customer/c7.jpg', alt: 'Phong cách quý ông' },
    { src: './image/customer/c8.jpg', alt: 'Không gian thư giãn' },
    { src: './image/customer/c9.jpg', alt: 'Chăm sóc tóc chuyên sâu' },
];

let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');

// Update counter
function updateCounter() {
    const counter = document.getElementById('lightbox-counter');
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

// Open lightbox
function openLightbox(index) {
    console.log('Opening lightbox for image index:', index);
    
    if (index < 0 || index >= galleryImages.length) {
        console.error('Invalid image index:', index);
        return;
    }
    
    const lightboxElement = document.getElementById('lightbox');
    const lightboxImgElement = document.getElementById('lightbox-img');
    
    if (!lightboxElement || !lightboxImgElement) {
        console.error('Lightbox elements not found!');
        alert('Không tìm thấy lightbox!');
        return;
    }
    
    currentImageIndex = index;
    lightboxImgElement.src = galleryImages[index].src;
    lightboxImgElement.alt = galleryImages[index].alt;
    updateCounter();
    lightboxElement.classList.remove('hidden');
    lightboxElement.classList.add('flex');
    document.body.style.overflow = 'hidden';
    console.log('Lightbox opened successfully for:', galleryImages[index].alt);
}

// Close lightbox
function closeLightbox() {
    const lightboxElement = document.getElementById('lightbox');
    if (lightboxElement) {
        lightboxElement.classList.add('hidden');
        lightboxElement.classList.remove('flex');
    }
    document.body.style.overflow = 'auto';
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImgElement = document.getElementById('lightbox-img');
    if (lightboxImgElement) {
        lightboxImgElement.src = galleryImages[currentImageIndex].src;
        lightboxImgElement.alt = galleryImages[currentImageIndex].alt;
    }
    updateCounter();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const lightboxImgElement = document.getElementById('lightbox-img');
    if (lightboxImgElement) {
        lightboxImgElement.src = galleryImages[currentImageIndex].src;
        lightboxImgElement.alt = galleryImages[currentImageIndex].alt;
    }
    updateCounter();
}

// Event listeners for gallery
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        openLightbox(index);
    });
});

// Event listeners for lightbox controls
document.addEventListener('DOMContentLoaded', function() {
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightbox = document.getElementById('lightbox');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    // Lightbox keyboard navigation
    if (lightbox && !lightbox.classList.contains('hidden')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
    
    // Tour modal keyboard navigation
    const tourModal = document.getElementById('tourModal');
    if (tourModal && !tourModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeTourModal();
        }
    }
    
    // Service modal keyboard navigation
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal && !serviceModal.classList.contains('hidden') && e.key === 'Escape') {
        closeServiceModal();
    }
});
