/**
 * Dashboard Management
 * Handles citizen and operator dashboard functionality
 */

class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.userStats = {
            totalPoints: 1840,
            totalWaste: 12.5,
            totalSolar: 3.2,
            totalGasoline: 1.8,
            co2Saved: 15.8,
            energyGenerated: 42.5
        };
        
        this.recentDeposits = [
            { 
                id: 1,
                date: '2024-01-10', 
                type: 'Plastik PET', 
                weight: 2.5, 
                points: 500, 
                status: 'processed',
                location: 'RT 05/RW 03 Menteng'
            },
            { 
                id: 2,
                date: '2024-01-08', 
                type: 'Kertas', 
                weight: 1.8, 
                points: 360, 
                status: 'processed',
                location: 'RT 05/RW 03 Menteng'
            },
            { 
                id: 3,
                date: '2024-01-05', 
                type: 'Plastik HDPE', 
                weight: 3.2, 
                points: 640, 
                status: 'processed',
                location: 'RT 02/RW 01 Kebayoran'
            },
            { 
                id: 4,
                date: '2024-01-03', 
                type: 'Organik', 
                weight: 1.5, 
                points: 300, 
                status: 'processing',
                location: 'RT 05/RW 03 Menteng'
            }
        ];

        this.selectedWallet = null;
        this.charts = {};
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.updateDashboard();
    }

    setupEventListeners() {
        // Wallet selection
        document.querySelectorAll('.wallet-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectWallet(e.currentTarget.dataset.wallet);
            });
        });

        // Redeem points button
        const redeemBtn = document.getElementById('redeem-btn');
        if (redeemBtn) {
            redeemBtn.addEventListener('click', () => {
                this.redeemPoints();
            });
        }

        // Start scan button
        const startScanBtn = document.getElementById('start-scan-btn');
        if (startScanBtn) {
            startScanBtn.addEventListener('click', () => {
                this.openScanModal();
            });
        }

        // Logout buttons
        document.querySelectorAll('#logout-btn, #operator-logout-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.logout();
            });
        });
    }

    updateDashboard() {
        this.updateStats();
        this.updateRecentDeposits();
        this.updateProgressBars();
    }

    updateStats() {
        // Update stat values
        const statElements = {
            'total-points': this.userStats.totalPoints,
            'available-points': this.userStats.totalPoints,
            'total-waste': this.userStats.totalWaste
        };

        Object.keys(statElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = statElements[id].toLocaleString();
            }
        });

        // Update formatted values
        const formattedStats = document.querySelectorAll('[data-stat]');
        formattedStats.forEach(element => {
            const statType = element.dataset.stat;
            let value = this.userStats[statType];
            
            if (value !== undefined) {
                if (statType === 'totalPoints') {
                    element.textContent = `≈ Rp ${(value * 10).toLocaleString()}`;
                } else {
                    element.textContent = value;
                }
            }
        });
    }

    updateRecentDeposits() {
        const depositsContainer = document.getElementById('recent-deposits');
        if (!depositsContainer) return;

        depositsContainer.innerHTML = '';

        this.recentDeposits.forEach(deposit => {
            const depositElement = this.createDepositElement(deposit);
            depositsContainer.appendChild(depositElement);
        });
    }

    createDepositElement(deposit) {
        const div = document.createElement('div');
        div.className = 'deposit-item';
        
        const statusClass = deposit.status === 'processed' ? 'status-completed' : 'status-processing';
        const statusText = deposit.status === 'processed' ? 'Selesai' : 'Proses';
        
        div.innerHTML = `
            <div class="deposit-info">
                <div class="deposit-icon">
                    <i data-lucide="recycle"></i>
                </div>
                <div class="deposit-details">
                    <h5>${deposit.type}</h5>
                    <div class="deposit-meta">
                        ${deposit.date} • ${deposit.weight} kg • ${deposit.location}
                    </div>
                </div>
            </div>
            <div class="deposit-points">
                <span class="points-earned">+${deposit.points} poin</span>
                <span class="deposit-status ${statusClass}">${statusText}</span>
            </div>
        `;

        return div;
    }

    updateProgressBars() {
        // Update any progress bars in the dashboard
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const value = bar.dataset.value || Math.random() * 100;
            bar.style.width = `${value}%`;
        });
    }

    selectWallet(walletId) {
        this.selectedWallet = walletId;
        
        // Update UI
        document.querySelectorAll('.wallet-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`[data-wallet="${walletId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // Enable redeem button
        const redeemBtn = document.getElementById('redeem-btn');
        if (redeemBtn) {
            redeemBtn.disabled = false;
        }
    }

    redeemPoints() {
        if (!this.selectedWallet) {
            this.showToast('Pilih e-wallet terlebih dahulu', 'warning');
            return;
        }

        if (this.userStats.totalPoints < 1000) {
            this.showToast('Poin tidak mencukupi. Minimal 1000 poin untuk penukaran.', 'error');
            return;
        }

        // Simulate redemption process
        const walletNames = {
            'gopay': 'GoPay',
            'dana': 'DANA',
            'ovo': 'OVO',
            'shopeepay': 'ShopeePay'
        };

        const walletName = walletNames[this.selectedWallet];
        
        // Deduct points
        this.userStats.totalPoints -= 1000;
        
        // Update UI
        this.updateStats();
        
        // Show success message
        this.showToast(
            `Berhasil menukar 1000 poin dengan ${walletName} senilai Rp 10.000`,
            'success'
        );

        // Reset wallet selection
        this.selectedWallet = null;
        document.querySelectorAll('.wallet-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const redeemBtn = document.getElementById('redeem-btn');
        if (redeemBtn) {
            redeemBtn.disabled = true;
        }
    }

    addNewDeposit(depositData) {
        const newDeposit = {
            id: this.recentDeposits.length + 1,
            date: new Date().toISOString().split('T')[0],
            type: depositData.scanResult.classification.type,
            weight: depositData.actualWeight,
            points: depositData.totalPoints,
            status: 'processing',
            location: depositData.location
        };

        // Add to beginning of array
        this.recentDeposits.unshift(newDeposit);
        
        // Keep only last 10 deposits
        if (this.recentDeposits.length > 10) {
            this.recentDeposits = this.recentDeposits.slice(0, 10);
        }

        // Update stats
        this.userStats.totalPoints += depositData.totalPoints;
        this.userStats.totalWaste += depositData.actualWeight;
        
        // Calculate additional outputs
        const outputs = yoloDetector.calculatePyrolysisOutputs({
            categories: [{
                totalWeight: depositData.actualWeight,
                category: depositData.scanResult.classification.type
            }]
        });
        
        this.userStats.totalSolar += outputs.bioOil * 0.6; // 60% of bio-oil becomes solar
        this.userStats.totalGasoline += outputs.syngas * 0.4; // 40% of syngas becomes gasoline
        
        const envImpact = yoloDetector.calculateEnvironmentalImpact(depositData.actualWeight);
        this.userStats.co2Saved += envImpact.co2Saved;
        this.userStats.energyGenerated += envImpact.energyGenerated;

        // Update dashboard
        this.updateDashboard();
    }

    openScanModal() {
        const modal = document.getElementById('scan-modal');
        if (modal) {
            modal.classList.add('active');
            // Initialize scanner
            window.wasteScanner.init();
        }
    }

    initializeCharts() {
        this.initProductionChart();
        this.initOperatorChart();
    }

    initProductionChart() {
        const canvas = document.getElementById('production-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        this.charts.production = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Bio-Solar', 'Bio-Bensin', 'Biochar'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        '#3b82f6',
                        '#f59e0b',
                        '#10b981'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    initOperatorChart() {
        const canvas = document.getElementById('operator-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate sample data
        const labels = [];
        const data = [];
        
        for (let i = 23; i >= 0; i--) {
            const date = new Date();
            date.setHours(date.getHours() - i);
            labels.push(date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
            data.push(Math.floor(Math.random() * 100) + 400);
        }

        this.charts.operator = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Suhu Reaktor (°C)',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 300,
                        max: 600
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Update chart data every 30 seconds
        setInterval(() => {
            this.updateOperatorChart();
        }, 30000);
    }

    updateOperatorChart() {
        if (!this.charts.operator) return;

        const chart = this.charts.operator;
        const newData = Math.floor(Math.random() * 100) + 400;
        const newLabel = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        // Remove first point, add new point
        chart.data.labels.shift();
        chart.data.labels.push(newLabel);
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(newData);

        chart.update('none');
    }

    showToast(message, type = 'info') {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: message,
                duration: 3000,
                gravity: 'top',
                position: 'right',
                backgroundColor: type === 'success' ? '#10b981' : 
                                type === 'error' ? '#ef4444' : 
                                type === 'warning' ? '#f59e0b' : '#3b82f6'
            }).showToast();
        } else {
            // Fallback to alert
            alert(message);
        }
    }

    logout() {
        this.currentUser = null;
        
        // Reset dashboard
        this.userStats = {
            totalPoints: 1840,
            totalWaste: 12.5,
            totalSolar: 3.2,
            totalGasoline: 1.8,
            co2Saved: 15.8,
            energyGenerated: 42.5
        };

        // Show landing page
        window.pageManager.showPage('landing-page');
        
        this.showToast('Berhasil keluar dari sistem', 'success');
    }

    // Utility methods
    formatNumber(num) {
        return new Intl.NumberFormat('id-ID').format(num);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
}

// Global dashboard manager instance
window.dashboardManager = new DashboardManager();