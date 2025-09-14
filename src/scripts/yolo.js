/**
 * YOLO Integration for Waste Detection
 * Handles AI model loading, inference, and waste classification
 */

class YOLOWasteDetector {
    constructor() {
        this.model = null;
        this.isModelLoaded = false;
        this.isLoading = false;
        
        // Waste categories mapping
        this.wasteCategories = {
            0: { name: 'Plastik PET', pointsPerKg: 200, color: '#3b82f6' },
            1: { name: 'Plastik HDPE', pointsPerKg: 180, color: '#3b82f6' },
            2: { name: 'Plastik PP', pointsPerKg: 170, color: '#3b82f6' },
            3: { name: 'Kertas', pointsPerKg: 180, color: '#10b981' },
            4: { name: 'Kardus', pointsPerKg: 170, color: '#10b981' },
            5: { name: 'Organik', pointsPerKg: 120, color: '#f59e0b' },
            6: { name: 'Biomassa', pointsPerKg: 150, color: '#8b5cf6' },
            7: { name: 'Logam', pointsPerKg: 250, color: '#6b7280' }
        };

        // Model configuration
        this.modelConfig = {
            inputSize: 640,
            confidenceThreshold: 0.5,
            nmsThreshold: 0.45,
            maxDetections: 100
        };
    }

    async loadModel() {
        if (this.isLoading || this.isModelLoaded) {
            return this.isModelLoaded;
        }

        this.isLoading = true;

        try {
            console.log('Loading YOLO waste detection model...');
            
            // For demo purposes, we'll simulate model loading
            // In real implementation, you would load your trained YOLO model here
            await this.simulateModelLoading();
            
            // In real implementation:
            // this.model = await tf.loadLayersModel('/models/yolo-waste/model.json');
            
            this.isModelLoaded = true;
            this.isLoading = false;
            
            console.log('YOLO model loaded successfully');
            return true;

        } catch (error) {
            console.error('Error loading YOLO model:', error);
            this.isLoading = false;
            return false;
        }
    }

    async simulateModelLoading() {
        // Simulate model loading time
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Model simulation loaded');
                resolve();
            }, 2000);
        });
    }

    async detectWaste(imageData) {
        if (!this.isModelLoaded) {
            const loaded = await this.loadModel();
            if (!loaded) {
                throw new Error('Failed to load YOLO model');
            }
        }

        try {
            console.log('Starting waste detection...');
            
            // For demo purposes, we'll simulate detection results
            // In real implementation, you would run inference here
            const mockResults = await this.simulateDetection(imageData);
            
            // In real implementation:
            // const predictions = await this.runInference(imageData);
            // const results = this.processDetections(predictions);
            
            console.log('Waste detection completed');
            return mockResults;

        } catch (error) {
            console.error('Error during waste detection:', error);
            throw error;
        }
    }

    async simulateDetection(imageData) {
        // Simulate detection processing time
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Generate mock detection results
        const mockDetections = [
            {
                class: 0, // Plastik PET
                confidence: 0.94,
                bbox: [100, 150, 200, 180],
                area: 36000
            },
            {
                class: 0, // Plastik PET
                confidence: 0.87,
                bbox: [300, 200, 150, 200],
                area: 30000
            },
            {
                class: 3, // Kertas
                confidence: 0.76,
                bbox: [450, 100, 120, 160],
                area: 19200
            }
        ];

        // Process detections
        const processedResults = this.processDetections(mockDetections);
        
        return {
            detections: processedResults.detections,
            summary: processedResults.summary,
            metadata: {
                processingTime: 3.2,
                modelVersion: '1.0.0',
                inputSize: this.modelConfig.inputSize,
                totalDetections: processedResults.detections.length
            }
        };
    }

    processDetections(rawDetections) {
        const detections = rawDetections.map(det => {
            const category = this.wasteCategories[det.class];
            const estimatedWeight = this.estimateWeight(det.area, category.name);
            
            return {
                id: Math.random().toString(36).substr(2, 9),
                category: category.name,
                confidence: det.confidence,
                bbox: det.bbox,
                estimatedWeight: estimatedWeight,
                pointsPerKg: category.pointsPerKg,
                estimatedPoints: Math.floor(estimatedWeight * category.pointsPerKg),
                color: category.color
            };
        });

        // Group by category
        const groupedByCategory = detections.reduce((acc, det) => {
            if (!acc[det.category]) {
                acc[det.category] = {
                    category: det.category,
                    count: 0,
                    totalWeight: 0,
                    totalPoints: 0,
                    items: []
                };
            }
            
            acc[det.category].count++;
            acc[det.category].totalWeight += det.estimatedWeight;
            acc[det.category].totalPoints += det.estimatedPoints;
            acc[det.category].items.push(det);
            
            return acc;
        }, {});

        // Calculate totals
        const totalWeight = detections.reduce((sum, det) => sum + det.estimatedWeight, 0);
        const totalPoints = detections.reduce((sum, det) => sum + det.estimatedPoints, 0);

        // Generate detailed item list
        const detectedItems = Object.values(groupedByCategory).map(group => {
            const itemDescriptions = this.generateItemDescriptions(group.items);
            return `${group.category}: ${itemDescriptions.join(', ')}`;
        });

        return {
            detections,
            summary: {
                totalDetections: detections.length,
                totalWeight: Math.round(totalWeight * 100) / 100,
                totalPoints: totalPoints,
                categories: Object.values(groupedByCategory),
                detectedItems
            }
        };
    }

    estimateWeight(area, category) {
        // Weight estimation based on pixel area and waste type
        const baseWeightPerPixel = {
            'Plastik PET': 0.00008,
            'Plastik HDPE': 0.00009,
            'Plastik PP': 0.00007,
            'Kertas': 0.00005,
            'Kardus': 0.00006,
            'Organik': 0.0001,
            'Biomassa': 0.00008,
            'Logam': 0.00015
        };

        const weightPerPixel = baseWeightPerPixel[category] || 0.00008;
        const estimatedWeight = area * weightPerPixel;
        
        // Add some randomness for realism
        const variance = 0.1; // 10% variance
        const randomFactor = 1 + (Math.random() - 0.5) * variance;
        
        return Math.max(0.1, Math.round(estimatedWeight * randomFactor * 100) / 100);
    }

    generateItemDescriptions(items) {
        const categoryDescriptions = {
            'Plastik PET': ['Botol 500ml', 'Botol 1L', 'Wadah makanan', 'Tutup botol'],
            'Plastik HDPE': ['Botol susu', 'Wadah deterjen', 'Botol shampoo', 'Tutup wadah'],
            'Plastik PP': ['Wadah yogurt', 'Sedotan', 'Tutup botol', 'Kemasan snack'],
            'Kertas': ['Kertas HVS', 'Koran', 'Majalah', 'Kertas kemasan'],
            'Kardus': ['Kotak kemasan', 'Kardus bekas', 'Tube toilet paper'],
            'Organik': ['Sisa makanan', 'Kulit buah', 'Daun kering', 'Ranting'],
            'Biomassa': ['Sekam padi', 'Serbuk gergaji', 'Ampas tebu', 'Jerami'],
            'Logam': ['Kaleng minuman', 'Botol kaca', 'Tutup logam', 'Kawat']
        };

        const category = items[0].category;
        const descriptions = categoryDescriptions[category] || ['Item tidak dikenal'];
        
        return items.map((item, index) => {
            const desc = descriptions[index % descriptions.length];
            return `${desc} (${Math.round(item.estimatedWeight * 10) / 10}kg)`;
        });
    }

    // Calculate pirolysis outputs based on detected waste
    calculatePyrolysisOutputs(summary) {
        const outputs = {
            bioOil: 0,
            syngas: 0,
            biochar: 0,
            efficiency: 0
        };

        // Output ratios by waste type (based on research data)
        const outputRatios = {
            'Plastik PET': { bioOil: 0.75, syngas: 0.15, biochar: 0.10 },
            'Plastik HDPE': { bioOil: 0.72, syngas: 0.18, biochar: 0.10 },
            'Plastik PP': { bioOil: 0.70, syngas: 0.20, biochar: 0.10 },
            'Kertas': { bioOil: 0.35, syngas: 0.40, biochar: 0.25 },
            'Kardus': { bioOil: 0.32, syngas: 0.43, biochar: 0.25 },
            'Organik': { bioOil: 0.40, syngas: 0.35, biochar: 0.25 },
            'Biomassa': { bioOil: 0.45, syngas: 0.30, biochar: 0.25 },
            'Logam': { bioOil: 0, syngas: 0, biochar: 0 } // Metals don't pyrolyze
        };

        summary.categories.forEach(category => {
            const ratio = outputRatios[category.category];
            if (ratio) {
                outputs.bioOil += category.totalWeight * ratio.bioOil;
                outputs.syngas += category.totalWeight * ratio.syngas;
                outputs.biochar += category.totalWeight * ratio.biochar;
            }
        });

        // Calculate efficiency based on waste mix
        const totalProcessableWeight = summary.categories
            .filter(cat => cat.category !== 'Logam')
            .reduce((sum, cat) => sum + cat.totalWeight, 0);
        
        outputs.efficiency = totalProcessableWeight > 0 ? 
            ((outputs.bioOil + outputs.syngas + outputs.biochar) / totalProcessableWeight) * 100 : 0;

        // Round values
        outputs.bioOil = Math.round(outputs.bioOil * 100) / 100;
        outputs.syngas = Math.round(outputs.syngas * 100) / 100;
        outputs.biochar = Math.round(outputs.biochar * 100) / 100;
        outputs.efficiency = Math.round(outputs.efficiency * 10) / 10;

        return outputs;
    }

    // Calculate environmental impact
    calculateEnvironmentalImpact(totalWeight) {
        // CO2 reduction per kg of waste processed
        const co2ReductionPerKg = 2.1; // kg CO2
        const energyGeneratedPerKg = 3.8; // kWh
        
        return {
            co2Saved: Math.round(totalWeight * co2ReductionPerKg * 100) / 100,
            energyGenerated: Math.round(totalWeight * energyGeneratedPerKg * 100) / 100,
            equivalentTrees: Math.round((totalWeight * co2ReductionPerKg / 22) * 100) / 100 // 1 tree absorbs ~22kg CO2/year
        };
    }

    // Draw detection results on canvas
    drawDetections(canvas, detections) {
        if (!canvas || !detections || detections.length === 0) return;

        const ctx = canvas.getContext('2d');
        
        detections.forEach(detection => {
            const [x, y, width, height] = detection.bbox;
            
            // Draw bounding box
            ctx.strokeStyle = detection.color;
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
            
            // Draw label background
            const label = `${detection.category} ${Math.round(detection.confidence * 100)}%`;
            ctx.font = '14px Arial';
            const textMetrics = ctx.measureText(label);
            const textWidth = textMetrics.width;
            const textHeight = 16;
            
            ctx.fillStyle = detection.color;
            ctx.fillRect(x, y - textHeight - 4, textWidth + 8, textHeight + 4);
            
            // Draw label text
            ctx.fillStyle = '#ffffff';
            ctx.fillText(label, x + 4, y - 6);
            
            // Draw weight estimate
            const weightLabel = `~${detection.estimatedWeight}kg`;
            ctx.font = '12px Arial';
            ctx.fillStyle = detection.color;
            ctx.fillRect(x, y + height + 2, ctx.measureText(weightLabel).width + 6, 16);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(weightLabel, x + 3, y + height + 14);
        });
    }

    // Get model info
    getModelInfo() {
        return {
            name: 'YOLO Waste Detector',
            version: '1.0.0',
            inputSize: this.modelConfig.inputSize,
            categories: Object.values(this.wasteCategories).map(cat => cat.name),
            isLoaded: this.isModelLoaded,
            isLoading: this.isLoading
        };
    }
}

// Global YOLO detector instance
window.yoloDetector = new YOLOWasteDetector();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YOLOWasteDetector;
}