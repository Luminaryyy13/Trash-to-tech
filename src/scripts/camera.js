// Camera Management for Waste Scanning
// Handles camera access, image capture, and video streaming

class CameraManager {
    constructor() {
        this.stream = null;
        this.video = null;
        this.canvas = null;
        this.isInitialized = false;
        this.constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'environment' // Prefer back camera
            }
        };
    }

    async initialize() {
        try {
            this.video = document.getElementById('camera-feed');
            this.canvas = document.getElementById('camera-canvas');
            
            if (!this.video || !this.canvas) {
                throw new Error('Camera elements not found');
            }
            
            this.isInitialized = true;
            console.log('📹 Camera manager initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize camera manager:', error);
            return false;
        }
    }

    async startCamera() {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            // Check if camera is already running
            if (this.stream) {
                console.log('Camera is already running');
                return true;
            }

            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
            
            // Set video source
            this.video.srcObject = this.stream;
            
            // Wait for video to load
            await new Promise((resolve) => {
                this.video.onloadedmetadata = () => {
                    this.video.play();
                    resolve();
                };
            });

            console.log('📹 Camera started successfully');
            return true;
            
        } catch (error) {
            console.error('Failed to start camera:', error);
            
            // Handle different error types
            if (error.name === 'NotFoundError') {
                showToast('Kamera tidak ditemukan', 'error');
            } else if (error.name === 'NotAllowedError') {
                showToast('Izin kamera ditolak. Silakan aktifkan di pengaturan browser.', 'error');
            } else if (error.name === 'NotReadableError') {
                showToast('Kamera sedang digunakan oleh aplikasi lain', 'error');
            } else {
                showToast('Gagal mengakses kamera', 'error');
            }
            
            return false;
        }
    }

    stopCamera() {
        try {
            if (this.stream) {
                // Stop all tracks
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
                
                // Clear video source
                if (this.video) {
                    this.video.srcObject = null;
                }
                
                this.stream = null;
                console.log('📹 Camera stopped');
            }
        } catch (error) {
            console.error('Failed to stop camera:', error);
        }
    }

    captureImage() {
        if (!this.video || !this.canvas || !this.stream) {
            console.error('Camera not ready for capture');
            return null;
        }

        try {
            // Set canvas dimensions to match video
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            
            // Draw current frame to canvas
            const context = this.canvas.getContext('2d');
            context.drawImage(this.video, 0, 0);
            
            // Get image data
            const imageData = this.canvas.toDataURL('image/jpeg', 0.8);
            
            console.log('📸 Image captured');
            return imageData;
            
        } catch (error) {
            console.error('Failed to capture image:', error);
            return null;
        }
    }

    // Check if camera is supported
    static isSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // Get available cameras
    async getAvailableCameras() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            return cameras;
        } catch (error) {
            console.error('Failed to get camera list:', error);
            return [];
        }
    }

    // Switch camera (front/back)
    async switchCamera() {
        const currentFacingMode = this.constraints.video.facingMode;
        const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
        
        // Stop current camera
        this.stopCamera();
        
        // Update constraints
        this.constraints.video.facingMode = newFacingMode;
        
        // Start with new camera
        return await this.startCamera();
    }

    // Take photo with flash effect
    captureWithFlash() {
        // Add flash effect
        const flashOverlay = document.createElement('div');
        flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(flashOverlay);
        
        // Flash effect
        setTimeout(() => {
            flashOverlay.style.opacity = '0.8';
            setTimeout(() => {
                flashOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(flashOverlay);
                }, 200);
            }, 100);
        }, 10);
        
        // Capture image
        return this.captureImage();
    }

    // Get camera permissions status
    async checkPermissions() {
        try {
            const permission = await navigator.permissions.query({ name: 'camera' });
            return permission.state; // 'granted', 'denied', or 'prompt'
        } catch (error) {
            console.error('Failed to check camera permissions:', error);
            return 'unknown';
        }
    }
}

// Simple AI Waste Detection Simulation
class WasteDetector {
    constructor() {
        this.wasteTypes = [
            {
                name: 'Plastik PET',
                confidence: () => 85 + Math.random() * 15,
                points: 200,
                color: '#3b82f6'
            },
            {
                name: 'Kertas',
                confidence: () => 80 + Math.random() * 15,
                points: 150,
                color: '#10b981'
            },
            {
                name: 'Organik',
                confidence: () => 75 + Math.random() * 20,
                points: 100,
                color: '#f59e0b'
            },
            {
                name: 'Kaleng Aluminium',
                confidence: () => 90 + Math.random() * 10,
                points: 250,
                color: '#ef4444'
            },
            {
                name: 'Kaca',
                confidence: () => 70 + Math.random() * 25,
                points: 180,
                color: '#8b5cf6'
            }
        ];
    }

    async detectWaste(imageData) {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        // Random detection simulation
        const detectedType = this.wasteTypes[Math.floor(Math.random() * this.wasteTypes.length)];
        const confidence = detectedType.confidence();
        const estimatedWeight = 0.5 + Math.random() * 2; // 0.5 - 2.5 kg
        
        return {
            type: detectedType.name,
            confidence: Math.round(confidence * 10) / 10,
            estimatedWeight: Math.round(estimatedWeight * 10) / 10,
            points: Math.round(estimatedWeight * detectedType.points),
            color: detectedType.color,
            detectionBox: {
                x: 50 + Math.random() * 200,
                y: 50 + Math.random() * 150,
                width: 100 + Math.random() * 150,
                height: 80 + Math.random() * 120
            }
        };
    }

    // Calculate fuel prediction from waste
    calculateFuelOutput(wasteType, weight) {
        const conversionRates = {
            'Plastik PET': { bioOil: 0.4, syngas: 0.3, biochar: 0.2 },
            'Kertas': { bioOil: 0.3, syngas: 0.4, biochar: 0.25 },
            'Organik': { bioOil: 0.35, syngas: 0.35, biochar: 0.2 },
            'Kaleng Aluminium': { bioOil: 0.1, syngas: 0.2, biochar: 0.1 },
            'Kaca': { bioOil: 0.05, syngas: 0.1, biochar: 0.05 }
        };
        
        const rates = conversionRates[wasteType] || conversionRates['Plastik PET'];
        
        return {
            bioOil: Math.round(weight * rates.bioOil * 100) / 100,
            syngas: Math.round(weight * rates.syngas * 100) / 100,
            biochar: Math.round(weight * rates.biochar * 100) / 100
        };
    }
}

// Initialize camera manager globally
window.cameraManager = new CameraManager();
window.wasteDetector = new WasteDetector();

// Camera UI Controls
function setupCameraControls() {
    // Check camera support
    if (!CameraManager.isSupported()) {
        console.error('Camera not supported');
        showToast('Kamera tidak didukung di browser ini', 'error');
        return;
    }

    // Enhanced camera start function
    window.startCameraEnhanced = async function() {
        const startBtn = document.getElementById('start-camera');
        const captureBtn = document.getElementById('capture-photo');
        const switchBtn = document.getElementById('switch-camera');
        
        if (startBtn) {
            startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memulai Kamera...';
            startBtn.disabled = true;
        }
        
        try {
            const success = await window.cameraManager.startCamera();
            
            if (success) {
                if (startBtn) startBtn.style.display = 'none';
                if (captureBtn) captureBtn.disabled = false;
                if (switchBtn) switchBtn.style.display = 'inline-flex';
                
                showToast('Kamera berhasil diaktifkan', 'success');
            }
        } catch (error) {
            console.error('Camera start failed:', error);
            if (startBtn) {
                startBtn.innerHTML = '<i class="fas fa-camera"></i> Mulai Kamera';
                startBtn.disabled = false;
            }
        }
    };

    // Enhanced capture function
    window.captureWastePhoto = async function() {
        const captureBtn = document.getElementById('capture-photo');
        const resultDiv = document.getElementById('scan-result');
        
        if (captureBtn) {
            captureBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menganalisis...';
            captureBtn.disabled = true;
        }
        
        try {
            // Capture image with flash effect
            const imageData = window.cameraManager.captureWithFlash();
            
            if (!imageData) {
                throw new Error('Failed to capture image');
            }
            
            showToast('Menganalisis sampah dengan AI...', 'info');
            
            // Detect waste using AI simulation
            const detection = await window.wasteDetector.detectWaste(imageData);
            
            // Calculate fuel output
            const fuelOutput = window.wasteDetector.calculateFuelOutput(
                detection.type, 
                detection.estimatedWeight
            );
            
            // Display results
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <div class="scan-result-content">
                        <div class="result-header">
                            <i class="fas fa-check-circle"></i>
                            <h3>Analisis AI Berhasil!</h3>
                        </div>
                        
                        <div class="detection-info">
                            <div class="detection-item">
                                <span class="label">Jenis Sampah:</span>
                                <span class="value" style="color: ${detection.color}">${detection.type}</span>
                            </div>
                            <div class="detection-item">
                                <span class="label">Tingkat Kepercayaan:</span>
                                <span class="value confidence">${detection.confidence}%</span>
                            </div>
                            <div class="detection-item">
                                <span class="label">Estimasi Berat:</span>
                                <span class="value">${detection.estimatedWeight} kg</span>
                            </div>
                            <div class="detection-item">
                                <span class="label">Poin Reward:</span>
                                <span class="value points">${detection.points} poin</span>
                            </div>
                        </div>
                        
                        <div class="fuel-prediction">
                            <h4>Prediksi Hasil Pirolisis:</h4>
                            <div class="fuel-grid">
                                <div class="fuel-item">
                                    <i class="fas fa-oil-can"></i>
                                    <span>Bio-Oil: ${fuelOutput.bioOil}L</span>
                                </div>
                                <div class="fuel-item">
                                    <i class="fas fa-fire"></i>
                                    <span>Syngas: ${fuelOutput.syngas}L</span>
                                </div>
                                <div class="fuel-item">
                                    <i class="fas fa-cube"></i>
                                    <span>Biochar: ${fuelOutput.biochar}kg</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="result-actions">
                            <button class="btn btn-primary" onclick="confirmWasteDeposit(${detection.points}, '${detection.type}', ${detection.estimatedWeight})">
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
                
                resultDiv.classList.add('show');
            }
            
            showToast(`${detection.type} terdeteksi dengan confidence ${detection.confidence}%!`, 'success');
            
        } catch (error) {
            console.error('Waste detection failed:', error);
            showToast('Gagal menganalisis sampah. Coba lagi.', 'error');
        } finally {
            if (captureBtn) {
                captureBtn.innerHTML = '<i class="fas fa-camera-retro"></i> Ambil Foto';
                captureBtn.disabled = false;
            }
        }
    };

    // Switch camera function
    window.switchCamera = async function() {
        const switchBtn = document.getElementById('switch-camera');
        
        if (switchBtn) {
            switchBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i>';
            switchBtn.disabled = true;
        }
        
        try {
            await window.cameraManager.switchCamera();
            showToast('Kamera berhasil diganti', 'success');
        } catch (error) {
            console.error('Failed to switch camera:', error);
            showToast('Gagal mengganti kamera', 'error');
        } finally {
            if (switchBtn) {
                switchBtn.innerHTML = '<i class="fas fa-sync"></i>';
                switchBtn.disabled = false;
            }
        }
    };
}

// Initialize camera controls when DOM is ready
document.addEventListener('DOMContentLoaded', setupCameraControls);

// Cleanup camera on page unload
window.addEventListener('beforeunload', () => {
    if (window.cameraManager) {
        window.cameraManager.stopCamera();
    }
});

// Handle visibility change (stop camera when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.cameraManager) {
        window.cameraManager.stopCamera();
    }
});

console.log('📹 Camera system loaded successfully!');