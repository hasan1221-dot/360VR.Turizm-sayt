const tours = [
    {
        name: 'Everest Cho\'qqisi',
        description: 'Dunyoning eng baland cho\'qqisi (8,849m) Everest. Nepol va Xitoyni bir vaqtda ko\'rish mumkin.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect fill="%238B7355"/><polygon points="800,100 1600,900 0,900" fill="%23D2B48C"/><polygon points="800,150 1500,900 100,900" fill="%23C9A974"/></svg>'
    },
    {
        name: 'Kolizey',
        description: 'Qadimiy Rim imperiyasining nishoni va eng katta amfiteatr (72-80 AD).',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect fill="%23FFE4B5"/><circle cx="800" cy="450" r="300" fill="%23C0504D" stroke="%23824444" stroke-width="20"/><circle cx="800" cy="450" r="250" fill="%238B4513"/></svg>'
    },
    {
        name: 'Nazka Chiziqlar',
        description: 'Peru\'dagi mistikniy geometrik shakllar. Drevni tsivilizatsiyaning gadyan iz\'i.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect fill="%23DEB887"/><line x1="0" y1="450" x2="1600" y2="450" stroke="%23654321" stroke-width="3"/><line x1="800" y1="0" x2="800" y2="900" stroke="%23654321" stroke-width="3"/><path d="M 400 300 L 600 200 L 800 300 L 600 400 Z" fill="none" stroke="%23654321" stroke-width="2"/></svg>'
    },
    {
        name: 'Maldivlar',
        description: 'Samadiy orol paradi. Kristall sof suvlar va snorkling uchun ideal joy.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><defs><linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%2387CEEB"/><stop offset="100%" style="stop-color:%231E90FF"/></linearGradient></defs><rect fill="url(%23ocean)"/><circle cx="300" cy="400" r="50" fill="%2390EE90"/><circle cx="800" cy="300" r="60" fill="%2390EE90"/></svg>'
    },
    {
        name: 'Taj Mahal',
        description: 'Sevgi va go\'zallikning abadiy ramzi. Hindiston\'ning eng tarihiy bi\'nosi.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect fill="%23FFE4E1"/><polygon points="800,200 1000,800 600,800" fill="%23FFF8DC"/><rect x="700" y="400" width="200" height="400" fill="%23DAA520"/><circle cx="800" cy="150" r="60" fill="%23FFD700"/></svg>'
    },
    {
        name: 'Amazon O\'rmani',
        description: 'Dunyoning "o\'pkasi". Ekvatorialdagi eng katta toza o\'rmon.',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect fill="%2387CEEB"/><rect fill="%23228B22" width="1600" height="600"/><circle cx="300" cy="400" r="50" fill="%23228B22" opacity="0.7"/><circle cx="700" cy="500" r="40" fill="%23228B22" opacity="0.6"/><circle cx="1200" cy="350" r="60" fill="%23228B22" opacity="0.8"/></svg>'
    }
];
let currentTourIndex = -1;
let rotationAngle = 0;
let zoomLevel = 1;
let visitCount = 0;
let userCount = Math.floor(Math.random() * 1000) + 500;
window.addEventListener('DOMContentLoaded', function() {
    updateStatistics();
    initializeNavigation();
});
function selectTour(index) {
    currentTourIndex = index;
    const tour = tours[index];
    const vrImage = document.getElementById('vrImage');
    const locationName = document.getElementById('locationName');
    const locationDesc = document.getElementById('locationDesc');

    vrImage.src = tour.image;
    locationName.textContent = tour.name;
    locationDesc.textContent = tour.description;

    rotationAngle = 0;
    zoomLevel = 1;
    updateImageTransform();

    visitCount++;
    document.getElementById('visitCount').textContent = visitCount;
    document.querySelectorAll('.tour-card').forEach((card, idx) => {
        card.style.border = idx === index ? '3px solid #00bfff' : 'none';
    });
    document.querySelector('.vr-viewer-section').scrollIntoView({ behavior: 'smooth' });
}
function rotateLeft() {
    if (currentTourIndex === -1) {
        alert('Iltimos, avval turni tanlang!');
        return;
    }
    rotationAngle += 45;
    updateImageTransform();
}
function rotateRight() {
    if (currentTourIndex === -1) {
        alert('Iltimos, avval turni tanlang!');
        return;
    }
    rotationAngle -= 45;
    updateImageTransform();
}
function zoomIn() {
    if (currentTourIndex === -1) {
        alert('Iltimos, avval turni tanlang!');
        return;
    }
    if (zoomLevel < 3) {
        zoomLevel += 0.3;
        updateImageTransform();
    }
}
function zoomOut() {
    if (currentTourIndex === -1) {
        alert('Iltimos, avval turni tanlang!');
        return;
    }
    if (zoomLevel > 1) {
        zoomLevel -= 0.3;
        updateImageTransform();
    }
}
function updateImageTransform() {
    const vrImage = document.getElementById('vrImage');
    vrImage.style.transform = `rotate(${rotationAngle}deg) scale(${zoomLevel})`;
}
function scrollToTours() {
    document.querySelector('.tours-section').scrollIntoView({ behavior: 'smooth' });
}
function updateStatistics() {
    document.getElementById('userCount').textContent = userCount;
    document.getElementById('visitCount').textContent = visitCount;
}
function initializeNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}
function submitForm(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userMessage = document.getElementById('userMessage').value;
    if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
        alert('Iltimos, barcha maydonga ma\'lumot kiriting!');
        return;
    }

    if (userEmail.indexOf('@') === -1) {
        alert('Iltimos, to\'g\'ri email kiriting!');
        return;
    }
    alert(`Salom ${userName}! Xabaringiz qabul qilindi.\\nEmail: ${userEmail}\\nXabar: ${userMessage.substring(0, 30)}...`);

    document.getElementById('contactForm').reset();
    userCount++;
    updateStatistics();
}
document.addEventListener('keydown', function(e) {
    if (currentTourIndex !== -1) {
        if (e.key === 'ArrowLeft') rotateLeft();
        if (e.key === 'ArrowRight') rotateRight();
        if (e.key === '+' || e.key === '=') zoomIn();
        if (e.key === '-') zoomOut();
    }
});
window.addEventListener('load', function() {
    selectTour(0);
});