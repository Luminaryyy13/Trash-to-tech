// TRASH TO TECH - Main JavaScript Application
// Sistem Pengolahan Sampah dengan AI dan Pirolisis

// Global State Management
const AppState = {
    currentUser: null,
    currentPage: 'landing',
    userType: null,
    userData: {},
    isLoading: true
};

// DOM Elements
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    landingPage: document.getElementById('landing-page'),
    loginPage: document.getElementById('login-page'),
    citizenDashboard: document.getElementById('citizen-dashboard'),
    operatorDashboard: document.getElementById('operator-dashboard'),
    header: document.getElementById('header'),
    footer: document.getElementById('footer')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    hideLoading();
});

function initializeApp() {
    console.log('🚀 TRASH TO TECH Application Starting...');
    
    // Check for existing session
    const savedUser = localStorage.getItem('trashtotech_user');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        AppState.currentUser = userData.type;
        AppState.userData = userData;
        showPage(userData.type === 'citizen' ? 'citizen-dashboard' : 'operator-dashboard');
    } else {
        showPage('landing');
    }
    
    // Initialize mock data
    initializeMockData();
}

function hideLoading() {
    setTimeout(() => {
        elements.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
            AppState.isLoading = false;
        }, 500);
    }, 1500);
}

function setupEventListeners() {
    // Navigation Events
    document.getElementById('login-btn')?.addEventListener('click', () => showPage('login'));
    document.getElementById('get-started-btn')?.addEventListener('click', () => showPage('login'));
    document.getElementById('learn-more-btn')?.addEventListener('click', () => scrollToSection('education'));
    document.getElementById('cta-citizen-btn')?.addEventListener('click', () => showPage('login'));
    document.getElementById('cta-operator-btn')?.addEventListener('click', () => showPage('login'));
    document.getElementById('back-to-home')?.addEventListener('click', () => showPage('landing'));
    
    // Login System
    setupLoginSystem();
    
    // Dashboard Navigation
    setupDashboardNavigation();
    
    // Logout Buttons
    document.getElementById('citizen-logout')?.addEventListener('click', logout);
    document.getElementById('operator-logout')?.addEventListener('click', logout);
    
    // Camera and Scanning
    setupCameraSystem();
    
    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show/hide header and footer based on page
    const isDashboard = pageId.includes('dashboard');
    elements.header.style.display = isDashboard ? 'none' : 'block';
    elements.footer.style.display = isDashboard ? 'none' : 'block';
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = pageId;
    }
    
    // Update user info if dashboard
    if (pageId === 'citizen-dashboard' && AppState.userData.name) {
        document.getElementById('citizen-name').textContent = AppState.userData.name;
        updateCitizenStats();
    }
    
    console.log(`📄 Switched to page: ${pageId}`);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Login System
function setupLoginSystem() {
    const loginTabs = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    let selectedTab = 'citizen';
    
    // Tab switching
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            loginTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedTab = tab.dataset.tab;
            
            // Update placeholder
            const emailInput = document.getElementById('email');
            emailInput.placeholder = selectedTab === 'citizen' 
                ? 'nama@email.com' 
                : 'nama@fasilitas-ttt.com';
        });
    });
    
    // Form submission
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            showToast('Harap isi semua field', 'error');
            return;
        }
        
        // Mock authentication
        const userData = {
            type: selectedTab,
            email: email,
            name: selectedTab === 'citizen' ? 'Ahmad Hidayat' : 'Operator System',
            loginTime: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('trashtotech_user', JSON.stringify(userData));
        
        // Update app state
        AppState.currentUser = selectedTab;
        AppState.userData = userData;
        
        showToast(`Selamat datang, ${userData.name}!`, 'success');
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            showPage(selectedTab === 'citizen' ? 'citizen-dashboard' : 'operator-dashboard');
        }, 1000);
    });
}

// Dashboard Navigation
function setupDashboardNavigation() {
    // Citizen Dashboard Navigation
    document.querySelectorAll('#citizen-dashboard .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            document.querySelectorAll('#citizen-dashboard .nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.dataset.section + '-section';
            document.querySelectorAll('#citizen-dashboard .content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId)?.classList.add('active');
        });
    });
    
    // Operator Dashboard Navigation
    document.querySelectorAll('#operator-dashboard .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            document.querySelectorAll('#operator-dashboard .nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.dataset.section + '-section';
            document.querySelectorAll('#operator-dashboard .content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId)?.classList.add('active');
        });
    });
}

function logout() {
    localStorage.removeItem('trashtotech_user');
    AppState.currentUser = null;
    AppState.userData = {};
    showToast('Anda telah keluar dari sistem', 'success');
    showPage('landing');
}

// Camera System for Waste Scanning
function setupCameraSystem() {
    const startCameraBtn = document.getElementById('start-camera');
    const captureBtn = document.getElementById('capture-photo');
    const cameraFeed = document.getElementById('camera-feed');
    const cameraCanvas = document.getElementById('camera-canvas');
    const scanResult = document.getElementById('scan-result');
    
    let cameraStream = null;
    
    startCameraBtn?.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'environment' // Use back camera on mobile
                } 
            });
            
            cameraFeed.srcObject = cameraStream;
            startCameraBtn.disabled = true;
            captureBtn.disabled = false;
            
            showToast('Kamera berhasil diaktifkan', 'success');
        } catch (error) {
            console.error('Camera error:', error);
            showToast('Gagal mengakses kamera', 'error');
        }
    });
    
    captureBtn?.addEventListener('click', () => {
        if (!cameraStream) return;
        
        // Capture frame from video
        const canvas = cameraCanvas;
        const context = canvas.getContext('2d');
        canvas.width = cameraFeed.videoWidth;
        canvas.height = cameraFeed.videoHeight;
        context.drawImage(cameraFeed, 0, 0);
        
        // Simulate AI analysis
        showToast('Menganalisis sampah...', 'info');
        simulateAIAnalysis();
    });
    
    function simulateAIAnalysis() {
        setTimeout(() => {
            const wasteTypes = [
                { type: 'Plastik PET', confidence: 95, points: 400, weight: 2.0 },
                { type: 'Kertas', confidence: 88, points: 300, weight: 1.5 },
                { type: 'Organik', confidence: 92, points: 200, weight: 1.0 },
                { type: 'Kaleng Aluminium', confidence: 97, points: 500, weight: 2.5 }
            ];
            
            const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
            
            // Display result
            scanResult.innerHTML = `
                <div class="scan-result-content">
                    <h3>Hasil Analisis AI</h3>
                    <div class="result-grid">
                        <div class="result-item">
                            <span class="label">Jenis Sampah:</span>
                            <span class="value">${randomWaste.type}</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Tingkat Kepercayaan:</span>
                            <span class="value confidence">${randomWaste.confidence}%</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Estimasi Berat:</span>
                            <span class="value">${randomWaste.weight} kg</span>
                        </div>
                        <div class="result-item">
                            <span class="label">Poin yang Didapat:</span>
                            <span class="value points">${randomWaste.points}</span>
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="confirmWasteDeposit(${randomWaste.points})">
                            <i class="fas fa-check"></i>
                            Konfirmasi Setor Sampah
                        </button>
                        <button class="btn btn-secondary" onclick="retakeScan()">
                            <i class="fas fa-camera-retro"></i>
                            Scan Ulang
                        </button>
                    </div>
                </div>
            `;
            
            scanResult.classList.add('show');
            showToast(`Sampah ${randomWaste.type} terdeteksi!`, 'success');
        }, 2000);
    }
}

// Waste Deposit Confirmation
function confirmWasteDeposit(points) {
    // Update user points
    const currentPoints = parseInt(document.getElementById('citizen-points').textContent.replace(',', ''));
    const newPoints = currentPoints + points;
    
    document.getElementById('citizen-points').textContent = newPoints.toLocaleString();
    
    // Add to history
    addWasteHistory('Plastik PET', '2.0 kg', points);
    
    // Reset scan interface
    document.getElementById('scan-result').classList.remove('show');
    document.getElementById('start-camera').disabled = false;
    document.getElementById('capture-photo').disabled = true;
    
    // Stop camera
    const cameraFeed = document.getElementById('camera-feed');
    if (cameraFeed.srcObject) {
        cameraFeed.srcObject.getTracks().forEach(track => track.stop());
        cameraFeed.srcObject = null;
    }
    
    showToast(`Selamat! Anda mendapat ${points} poin`, 'success');
}

function retakeScan() {
    document.getElementById('scan-result').classList.remove('show');
}

// Mock Data and Utilities
function initializeMockData() {
    // Initialize any required mock data
    console.log('📊 Mock data initialized');
}

function updateCitizenStats() {
    // Update dashboard stats with real-time data
    const stats = {
        totalWaste: '24.5',
        totalPoints: '1,250',
        co2Reduced: '18.3',
        ranking: '#12'
    };
    
    // Update stat displays if elements exist
    // This would be expanded based on actual stat elements
}

function addWasteHistory(type, weight, points) {
    const historyTable = document.getElementById('history-data');
    if (!historyTable) return;
    
    const today = new Date().toLocaleDateString('id-ID');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${today}</td>
        <td>${type}</td>
        <td>${weight}</td>
        <td>${points}</td>
        <td><span class="status success">Berhasil</span></td>
    `;
    
    historyTable.insertBefore(newRow, historyTable.firstChild);
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Real-time Monitoring Simulation (for Operator Dashboard)
function startMonitoringSimulation() {
    if (AppState.currentPage !== 'operator-dashboard') return;
    
    setInterval(() => {
        // Simulate real-time data updates
        updateTemperature();
        updatePressure();
        updateProduction();
    }, 5000);
}

function updateTemperature() {
    const tempElement = document.querySelector('.gauge-value');
    if (tempElement) {
        const baseTemp = 650;
        const variation = (Math.random() - 0.5) * 20;
        const newTemp = Math.round(baseTemp + variation);
        tempElement.textContent = `${newTemp}°C`;
        
        // Update needle rotation
        const needle = document.querySelector('.gauge-needle');
        if (needle) {
            const angle = ((newTemp - 400) / 400) * 180;
            needle.style.transform = `rotate(${angle}deg)`;
        }
    }
}

function updatePressure() {
    const pressureElement = document.querySelector('.monitor-card:nth-child(2) .metric-value');
    if (pressureElement) {
        const basePressure = 2.3;
        const variation = (Math.random() - 0.5) * 0.2;
        const newPressure = (basePressure + variation).toFixed(1);
        pressureElement.textContent = newPressure;
    }
}

function updateProduction() {
    const productionElement = document.querySelector('.monitor-card:nth-child(3) .metric-value');
    if (productionElement) {
        const baseProduction = 15.2;
        const variation = (Math.random() - 0.5) * 2;
        const newProduction = (baseProduction + variation).toFixed(1);
        productionElement.textContent = newProduction;
    }
}

// Start monitoring simulation when operator dashboard is active
setInterval(() => {
    if (AppState.currentPage === 'operator-dashboard') {
        startMonitoringSimulation();
    }
}, 1000);

// Export functions for global access
window.confirmWasteDeposit = confirmWasteDeposit;
window.retakeScan = retakeScan;
window.showToast = showToast;

console.log('✅ TRASH TO TECH Application Loaded Successfully!');