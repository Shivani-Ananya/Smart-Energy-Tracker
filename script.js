// Energy Consumption Tracker - Main Application
class EnergyTracker {
    constructor() {
        this.appliances = [];
        this.history = {};
        this.settings = {
            tariff: 7.5,
            currency: '₹',
            country: 'INDIA',
            theme: 'light',
            alerts: true
        };
        this.charts = {
            consumption: null,
            distribution: null
        };
        this.currentEditingId = null;
        
        // Resources data
        this.resources = {
            formula: {
                title: 'Formula Guide',
                content: `
                    <div class="resource-section">
                        <h3>Energy Consumption Formula</h3>
                        
                        <div class="formula-box">
                            <h4>Core Formula</h4>
                            <div class="formula">Energy (kWh) = (Power × Hours) ÷ 1000</div>
                            <div class="formula-explanation">Where Power is in Watts and Hours is daily usage time</div>
                        </div>
                        
                        <h4>How It Works</h4>
                        <p>This formula calculates the energy consumption of electrical appliances:</p>
                        
                        <div class="example-grid">
                            <div class="example-item">
                                <h5>Step 1: Power Rating</h5>
                                <p>Check the appliance label for power rating in Watts (W)</p>
                                <small>Example: LED Bulb = 10W, AC = 1500W</small>
                            </div>
                            
                            <div class="example-item">
                                <h5>Step 2: Usage Time</h5>
                                <p>Estimate daily usage in hours</p>
                                <small>Example: 5 hours/day for TV</small>
                            </div>
                            
                            <div class="example-item">
                                <h5>Step 3: Calculation</h5>
                                <p>Multiply power by hours, divide by 1000</p>
                                <small>Example: (100W × 5h) ÷ 1000 = 0.5 kWh</small>
                            </div>
                        </div>
                        
                        <h4>Example Calculation</h4>
                        <p><strong>Scenario:</strong> A 100W TV used for 5 hours daily</p>
                        <p><strong>Calculation:</strong> (100 × 5) ÷ 1000 = 0.5 kWh/day</p>
                        <p><strong>Monthly:</strong> 0.5 × 30 = 15 kWh/month</p>
                        <p><strong>Cost:</strong> 15 kWh × ₹7.5 = ₹112.5/month</p>
                        
                        <h4>Common Appliance Power Ratings</h4>
                        <ul>
                            <li>LED Bulb: 7-15W</li>
                            <li>Ceiling Fan: 50-80W</li>
                            <li>LED TV: 50-150W</li>
                            <li>Refrigerator: 100-200W</li>
                            <li>Air Conditioner: 1000-2000W</li>
                            <li>Washing Machine: 300-500W</li>
                            <li>Microwave: 800-1200W</li>
                            <li>Laptop: 50-100W</li>
                        </ul>
                    </div>
                `
            },
            
            faq: {
                title: 'Frequently Asked Questions',
                content: `
                    <div class="resource-section">
                        <h3>FAQ - Energy Consumption Tracker</h3>
                        
                        <div class="faq-item">
                            <h4>How accurate are the calculations?</h4>
                            <p>The calculations are based on the standard formula and provide estimates. Actual consumption may vary based on appliance efficiency, usage patterns, and power fluctuations.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>Where can I find my appliance's power rating?</h4>
                            <p>Check the appliance label, manual, or manufacturer's website. Most appliances have a wattage rating printed on them.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>What if my appliance has a range of power ratings?</h4>
                            <p>Use the maximum or average rating. For appliances with variable power (like ACs), use the typical operating wattage.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>How do I calculate standby power?</h4>
                            <p>Many appliances consume 1-5W in standby mode. Multiply by 24 hours for daily standby consumption.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>Can I track multiple appliances?</h4>
                            <p>Yes! Add all your appliances to get a complete picture of your energy consumption.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>How often should I update appliance usage?</h4>
                            <p>Update when your usage patterns change significantly. The app saves your data automatically.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>Is my data saved locally?</h4>
                            <p>Yes, all data is stored in your browser's localStorage and persists between sessions.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>Can I export my data?</h4>
                            <p>Yes! Use the Export button in the header to download all your data as a JSON file.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>How can I reduce my energy consumption?</h4>
                            <p>The app provides personalized tips based on your usage. Check the Tips tab for suggestions.</p>
                        </div>
                        
                        <div class="faq-item">
                            <h4>What is the CO₂ calculation based on?</h4>
                            <p>CO₂ emissions are calculated using average emission factors per kWh for your selected country.</p>
                        </div>
                    </div>
                `
            },
            
            privacy: {
                title: 'Privacy Policy',
                content: `
                    <div class="resource-section">
                        <h3>Privacy Policy</h3>
                        
                        <div class="privacy-content">
                            <h4>Last Updated: ${new Date().toLocaleDateString()}</h4>
                            
                            <h4>Data Collection</h4>
                            <p>Energy Tracker Pro collects and stores the following data locally on your device:</p>
                            <ul>
                                <li>Appliance information (name, power rating, usage hours)</li>
                                <li>Energy consumption calculations</li>
                                <li>Cost estimates</li>
                                <li>Usage history</li>
                                <li>App settings and preferences</li>
                            </ul>
                            
                            <h4>Local Storage</h4>
                            <p>All data is stored locally in your browser's localStorage. No data is transmitted to external servers.</p>
                            
                            <h4>Third-Party Services</h4>
                            <p>This application uses:</p>
                            <ul>
                                <li>Chart.js for data visualization</li>
                                <li>Font Awesome for icons</li>
                                <li>Google Fonts for typography</li>
                            </ul>
                            <p>These services may collect usage data according to their respective privacy policies.</p>
                            
                            <h4>Data Export</h4>
                            <p>You can export all your data as a JSON file using the Export button. This data remains on your device.</p>
                            
                            <h4>Data Deletion</h4>
                            <p>You can delete all stored data using the Reset Data button in the footer.</p>
                            
                            <h4>Cookies</h4>
                            <p>This application does not use cookies for tracking purposes.</p>
                            
                            <h4>Changes to This Policy</h4>
                            <p>We may update this privacy policy. The updated date will be reflected at the top of this document.</p>
                            
                            <h4>Contact</h4>
                            <p>For privacy-related questions, please check the FAQ section or use the contact form in the app.</p>
                        </div>
                    </div>
                `
            },
            
            terms: {
                title: 'Terms of Use',
                content: `
                    <div class="resource-section">
                        <h3>Terms of Use</h3>
                        
                        <div class="terms-content">
                            <h4>Acceptance of Terms</h4>
                            <p>By using Energy Tracker Pro, you agree to these Terms of Use.</p>
                            
                            <h4>Service Description</h4>
                            <p>Energy Tracker Pro is a web-based application that helps users track and estimate energy consumption of electrical appliances.</p>
                            
                            <h4>Disclaimer</h4>
                            <p>This application provides estimates only. Actual energy consumption and costs may vary based on multiple factors including but not limited to:</p>
                            <ul>
                                <li>Appliance efficiency and condition</li>
                                <li>Power supply fluctuations</li>
                                <li>Usage patterns</li>
                                <li>Local electricity rates</li>
                                <li>Environmental conditions</li>
                            </ul>
                            <p>The developers are not responsible for any discrepancies between estimated and actual electricity bills.</p>
                            
                            <h4>User Responsibilities</h4>
                            <p>Users are responsible for:</p>
                            <ul>
                                <li>Providing accurate appliance information</li>
                                <li>Backing up their data regularly</li>
                                <li>Using the application for personal, non-commercial purposes</li>
                                <li>Complying with all applicable laws and regulations</li>
                            </ul>
                            
                            <h4>Intellectual Property</h4>
                            <p>The application code, design, and content are provided for personal use. You may not redistribute or commercialize any part of this application without permission.</p>
                            
                            <h4>Limitation of Liability</h4>
                            <p>The developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of this application.</p>
                            
                            <h4>Modifications</h4>
                            <p>We reserve the right to modify or discontinue the application at any time without notice.</p>
                            
                            <h4>Governing Law</h4>
                            <p>These terms shall be governed by and construed in accordance with applicable laws.</p>
                            
                            <h4>Contact</h4>
                            <p>For questions regarding these terms, please refer to the FAQ section.</p>
                        </div>
                    </div>
                `
            }
        };
        
        this.initializeApp();
    }
    
    // Initialize the application
    initializeApp() {
        console.log('Initializing Energy Tracker...');
        
        // Load data first
        this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup resize handler for charts
        this.setupResizeHandler();
        
        // Render initial dashboard
        this.renderDashboard();
        
        // Initialize charts after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
        
        // Start live updates
        this.startLiveUpdates();
        
        // Apply theme
        this.applyTheme();
        
        console.log('App initialized successfully');
    }
    
    // Load data from localStorage
    loadData() {
        // Load appliances
        const savedAppliances = localStorage.getItem('energy_tracker_appliances');
        if (savedAppliances) {
            this.appliances = JSON.parse(savedAppliances);
            console.log('Loaded appliances:', this.appliances.length);
        }
        
        // Load history
        const savedHistory = localStorage.getItem('energy_tracker_history');
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
        }
        
        // Load settings
        const savedSettings = localStorage.getItem('energy_tracker_settings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }
    
    // Save data to localStorage
    saveData() {
        localStorage.setItem('energy_tracker_appliances', JSON.stringify(this.appliances));
        localStorage.setItem('energy_tracker_history', JSON.stringify(this.history));
        localStorage.setItem('energy_tracker_settings', JSON.stringify(this.settings));
    }
    
    // Calculate energy consumption
    calculateEnergy(powerWatts, hours) {
        return (powerWatts * hours) / 1000; // kWh
    }
    
    // Calculate cost
    calculateCost(energyKWh) {
        return energyKWh * this.settings.tariff;
    }
    
    // Calculate CO2 emissions
    calculateCO2(energyKWh) {
        const factors = {
            'INDIA': 0.92,
            'USA': 0.43,
            'UK': 0.23,
            'GERMANY': 0.36
        };
        return energyKWh * (factors[this.settings.country] || 0.92);
    }
    
    // Get equivalent for CO2
    getCO2Equivalent(kgCO2) {
        const equivalencies = [
            { value: kgCO2 / 0.21, unit: 'km driven by car' },
            { value: kgCO2 / 0.0008, unit: 'smartphones charged' },
            { value: kgCO2 / 3.6, unit: 'tree days of oxygen production' }
        ];
        
        return equivalencies.map(eq => 
            `${eq.value.toFixed(1)} ${eq.unit}`
        )[0];
    }
    
    // Setup all event listeners
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Add appliance button
        document.getElementById('add-appliance-btn').addEventListener('click', () => this.showApplianceModal());
        document.getElementById('add-first-appliance').addEventListener('click', () => this.showApplianceModal());
        
        // Modal events
        document.getElementById('modal-close').addEventListener('click', () => this.hideApplianceModal());
        document.getElementById('modal-cancel').addEventListener('click', () => this.hideApplianceModal());
        document.getElementById('appliance-form').addEventListener('submit', (e) => this.handleApplianceSubmit(e));
        
        // Tariff selector
        document.getElementById('tariff-select').addEventListener('change', (e) => this.handleTariffChange(e));
        document.getElementById('custom-tariff').addEventListener('input', (e) => this.handleCustomTariff(e));
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        
        // Export button
        document.getElementById('export-btn').addEventListener('click', () => this.exportData());
        
        // Reset button
        document.getElementById('reset-data').addEventListener('click', () => this.resetData());
        
        // Form preview updates
        document.getElementById('appliance-power').addEventListener('input', () => this.updateFormPreview());
        document.getElementById('usage-slider').addEventListener('input', (e) => {
            document.getElementById('hours-display').textContent = e.target.value;
            document.getElementById('usage-hours').value = e.target.value;
            this.updateFormPreview();
        });
        
        // Quick suggestions
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.useSuggestion(e));
        });
        
        // Power presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setPowerPreset(e));
        });
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });
        
        // Period buttons
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeChartPeriod(e));
        });
        
        // Alert buttons
        document.getElementById('alert-dismiss').addEventListener('click', () => {
            document.getElementById('alert-modal').classList.remove('active');
        });
        
        document.getElementById('alert-view').addEventListener('click', () => {
            document.getElementById('alert-modal').classList.remove('active');
        });
        
        // Donate button
        document.getElementById('donate-btn').addEventListener('click', () => {
            alert('Thank you for your support! This is a demo application.');
        });
        
        // Resources links
        document.querySelectorAll('.resource-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const resourceType = e.target.getAttribute('data-resource');
                this.showResource(resourceType);
            });
        });
        
        // Resources modal close buttons
        document.getElementById('resources-close').addEventListener('click', () => this.hideResourceModal());
        document.getElementById('resources-close-btn').addEventListener('click', () => this.hideResourceModal());
        
        // Resources print button
        document.getElementById('resources-print').addEventListener('click', () => this.printResource());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                this.hideApplianceModal();
                this.hideResourceModal();
                document.getElementById('alert-modal').classList.remove('active');
            }
        });
    }
    
    // Setup resize handler for charts
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.charts.consumption) {
                    this.charts.consumption.resize();
                }
                if (this.charts.distribution) {
                    this.charts.distribution.resize();
                }
            }, 250);
        });
    }
    
    // Clean up charts
    cleanupCharts() {
        if (this.charts.consumption) {
            this.charts.consumption.destroy();
            this.charts.consumption = null;
        }
        if (this.charts.distribution) {
            this.charts.distribution.destroy();
            this.charts.distribution = null;
        }
    }
    
    // Initialize charts
    initializeCharts() {
        console.log('Initializing charts...');
        
        // Clean up any existing charts
        this.cleanupCharts();
        
        // Check if canvas elements exist
        const consumptionCanvas = document.getElementById('consumption-chart');
        const distributionCanvas = document.getElementById('distribution-chart');
        
        if (!consumptionCanvas || !distributionCanvas) {
            console.error('Chart canvases not found');
            return;
        }
        
        // Set canvas dimensions to prevent infinite growth
        consumptionCanvas.style.width = '100%';
        consumptionCanvas.style.height = '300px';
        distributionCanvas.style.width = '100%';
        distributionCanvas.style.height = '300px';
        
        try {
            // Create consumption chart with FIXED OPTIONS
            const consumptionCtx = consumptionCanvas.getContext('2d');
            this.charts.consumption = new Chart(consumptionCtx, {
                type: 'line',
                data: {
                    labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: [1.2, 0.8, 1.0, 2.5, 3.0, 3.5, 4.0, 2.8],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#4361ee',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const value = context.raw;
                                    const cost = this.calculateCost(value);
                                    return `${value.toFixed(2)} kWh (${this.settings.currency}${cost.toFixed(2)})`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + ' kWh';
                                }
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    }
                }
            });
            
            // Create distribution chart with FIXED OPTIONS
            const distributionCtx = distributionCanvas.getContext('2d');
            this.charts.distribution = new Chart(distributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['No Data'],
                    datasets: [{
                        data: [1],
                        backgroundColor: ['rgba(0, 0, 0, 0.1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const value = context.raw;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return `${context.label}: ${value.toFixed(2)} kWh (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Charts initialized successfully');
            
            // Initial chart updates
            this.updateDistributionChart();
            this.updateConsumptionChart('day');
            
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }
    
    // Show appliance modal
    showApplianceModal(appliance = null) {
        const modal = document.getElementById('appliance-modal');
        const title = document.getElementById('modal-title');
        
        if (appliance) {
            // Edit mode
            title.textContent = 'Edit Appliance';
            this.currentEditingId = appliance.id;
            
            // Fill form with appliance data
            document.getElementById('appliance-name').value = appliance.name;
            document.getElementById('appliance-power').value = appliance.power;
            document.getElementById('usage-slider').value = appliance.hours;
            document.getElementById('usage-hours').value = appliance.hours;
            document.getElementById('hours-display').textContent = appliance.hours;
            document.getElementById('appliance-category').value = appliance.category;
            document.getElementById('appliance-status').checked = appliance.active !== false;
            document.getElementById('appliance-id').value = appliance.id;
        } else {
            // Add mode
            title.textContent = 'Add New Appliance';
            this.currentEditingId = null;
            
            // Reset form
            document.getElementById('appliance-form').reset();
            document.getElementById('usage-slider').value = 3;
            document.getElementById('hours-display').textContent = 3;
            document.getElementById('appliance-category').value = 'kitchen';
            document.getElementById('appliance-status').checked = true;
            document.getElementById('appliance-id').value = '';
        }
        
        modal.classList.add('active');
        this.updateFormPreview();
    }
    
    // Hide appliance modal
    hideApplianceModal() {
        document.getElementById('appliance-modal').classList.remove('active');
        document.getElementById('appliance-form').reset();
        this.currentEditingId = null;
    }
    
    // Handle appliance form submission
    handleApplianceSubmit(e) {
        e.preventDefault();
        
        const formData = {
            id: document.getElementById('appliance-id').value || Date.now().toString(),
            name: document.getElementById('appliance-name').value.trim(),
            power: parseInt(document.getElementById('appliance-power').value),
            hours: parseFloat(document.getElementById('usage-hours').value),
            category: document.getElementById('appliance-category').value,
            active: document.getElementById('appliance-status').checked,
            createdAt: new Date().toISOString()
        };
        
        if (!formData.name || formData.power <= 0 || formData.hours <= 0) {
            alert('Please fill all fields with valid values');
            return;
        }
        
        if (this.currentEditingId) {
            // Update existing appliance
            const index = this.appliances.findIndex(a => a.id === this.currentEditingId);
            if (index !== -1) {
                this.appliances[index] = formData;
            }
        } else {
            // Add new appliance
            this.appliances.push(formData);
        }
        
        this.saveData();
        this.renderDashboard();
        this.updateCharts();
        this.hideApplianceModal();
        
        // Check for alerts
        this.checkForAlerts(formData);
    }
    
    // Use quick suggestion
    useSuggestion(e) {
        const name = e.target.getAttribute('data-name');
        const power = e.target.getAttribute('data-power');
        
        document.getElementById('appliance-name').value = name;
        document.getElementById('appliance-power').value = power;
        this.updateFormPreview();
    }
    
    // Set power preset
    setPowerPreset(e) {
        const power = parseInt(e.target.getAttribute('data-power'));
        document.getElementById('appliance-power').value = power;
        this.updateFormPreview();
    }
    
    // Update form preview
    updateFormPreview() {
        const power = parseInt(document.getElementById('appliance-power').value) || 0;
        const hours = parseFloat(document.getElementById('usage-slider').value) || 0;
        
        if (power > 0 && hours > 0) {
            const energy = this.calculateEnergy(power, hours);
            const dailyCost = this.calculateCost(energy);
            const monthlyCost = dailyCost * 30;
            
            document.getElementById('preview-energy').textContent = `${energy.toFixed(2)} kWh/day`;
            document.getElementById('preview-cost').textContent = `${this.settings.currency}${dailyCost.toFixed(2)}/day`;
            document.getElementById('preview-monthly').textContent = `${this.settings.currency}${monthlyCost.toFixed(2)}/month`;
        }
    }
    
    // Handle tariff change
    handleTariffChange(e) {
        const value = e.target.value;
        
        if (value === 'custom') {
            document.getElementById('custom-tariff').style.display = 'inline-block';
            document.getElementById('custom-tariff').value = this.settings.tariff;
            document.getElementById('custom-tariff').focus();
        } else {
            document.getElementById('custom-tariff').style.display = 'none';
            this.settings.tariff = parseFloat(value);
            this.saveData();
            this.renderDashboard();
            this.updateCharts();
        }
    }
    
    // Handle custom tariff
    handleCustomTariff(e) {
        const value = parseFloat(e.target.value);
        if (value > 0) {
            this.settings.tariff = value;
            this.saveData();
            this.renderDashboard();
            this.updateCharts();
        }
    }
    
    // Toggle theme
    toggleTheme() {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveData();
        
        // Update icon
        const icon = document.querySelector('#theme-toggle i');
        icon.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Apply theme
    applyTheme() {
        document.body.setAttribute('data-theme', this.settings.theme);
    }
    
    // Export data
    exportData() {
        const data = {
            appliances: this.appliances,
            history: this.history,
            settings: this.settings,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], 
            { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `energy-tracker-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Reset data
    resetData() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            this.appliances = [];
            this.history = {};
            this.saveData();
            this.renderDashboard();
            this.updateCharts();
        }
    }
    
    // Switch tabs
    switchTab(e) {
        const tabId = e.target.getAttribute('data-tab');
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
        
        // Load content if needed
        if (tabId === 'tips') {
            this.renderTips();
        } else if (tabId === 'gamification') {
            this.renderGamification();
        }
    }
    
    // Change chart period
    changeChartPeriod(e) {
        const period = e.target.getAttribute('data-period');
        
        // Update active button
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Update chart
        this.updateConsumptionChart(period);
    }
    
    // Update consumption chart
    updateConsumptionChart(period = 'day') {
        if (!this.charts.consumption) return;
        
        let labels, data;
        
        if (period === 'day') {
            labels = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
            // Use actual data if available, otherwise mock data
            const dailyTotal = this.calculateTotalDailyEnergy();
            const baseValue = dailyTotal > 0 ? dailyTotal / 8 : 2.5;
            data = [
                baseValue * 0.5,
                baseValue * 0.4,
                baseValue * 0.5,
                baseValue * 1.0,
                baseValue * 1.2,
                baseValue * 1.4,
                baseValue * 1.6,
                baseValue * 1.1
            ];
        } else if (period === 'week') {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const weeklyTotal = this.calculateTotalDailyEnergy() * 7;
            const baseValue = weeklyTotal > 0 ? weeklyTotal / 7 : 15;
            data = [
                baseValue * 0.8,
                baseValue * 0.9,
                baseValue * 0.85,
                baseValue * 0.95,
                baseValue * 1.05,
                baseValue * 1.25,
                baseValue * 1.15
            ];
        } else {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            const monthlyTotal = this.calculateTotalDailyEnergy() * 30;
            const baseValue = monthlyTotal > 0 ? monthlyTotal / 4 : 60;
            data = [
                baseValue * 0.85,
                baseValue * 0.95,
                baseValue * 1.05,
                baseValue * 1.15
            ];
        }
        
        this.charts.consumption.data.labels = labels;
        this.charts.consumption.data.datasets[0].data = data.map(val => parseFloat(val.toFixed(2)));
        this.charts.consumption.update();
    }
    
    // Update distribution chart
    updateDistributionChart() {
        if (!this.charts.distribution) return;
        
        if (this.appliances.length === 0) {
            this.charts.distribution.data.labels = ['No Data'];
            this.charts.distribution.data.datasets[0].data = [1];
            this.charts.distribution.data.datasets[0].backgroundColor = ['rgba(0, 0, 0, 0.1)'];
        } else {
            const labels = [];
            const data = [];
            const colors = [
                'rgb(67, 97, 238)',
                'rgb(114, 9, 183)',
                'rgb(76, 201, 240)',
                'rgb(6, 214, 160)',
                'rgb(248, 150, 30)',
                'rgb(247, 37, 133)',
                'rgb(108, 117, 125)',
                'rgb(40, 167, 69)',
            ];

            // Group by category
            const categories = {};
            
            this.appliances.forEach(appliance => {
                const energy = this.calculateEnergy(appliance.power, appliance.hours);
                
                if (!categories[appliance.category]) {
                    categories[appliance.category] = 0;
                }
                categories[appliance.category] += energy;
            });

            let colorIndex = 0;
            for (const [category, energy] of Object.entries(categories)) {
                labels.push(category);
                data.push(parseFloat(energy.toFixed(2)));
                colorIndex = (colorIndex + 1) % colors.length;
            }

            this.charts.distribution.data.labels = labels;
            this.charts.distribution.data.datasets[0].data = data;
            this.charts.distribution.data.datasets[0].backgroundColor = colors.slice(0, labels.length);
        }
        
        this.charts.distribution.update();
    }
    
    // Update all charts
    updateCharts() {
        this.updateDistributionChart();
        const activePeriodBtn = document.querySelector('.period-btn.active');
        if (activePeriodBtn) {
            const activePeriod = activePeriodBtn.getAttribute('data-period');
            this.updateConsumptionChart(activePeriod);
        }
    }
    
    // Render dashboard
    renderDashboard() {
        this.renderApplianceCount();
        this.renderAppliances();
        this.updateSummary();
        this.renderHistory();
        this.updateLiveMeter();
    }
    
    // Render appliance count
    renderApplianceCount() {
        document.getElementById('appliance-count').textContent = this.appliances.length;
    }
    
    // Render appliances list
    renderAppliances() {
        const container = document.getElementById('appliances-container');
        
        if (this.appliances.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-plug-circle-exclamation"></i>
                    <h3>No Appliances Added</h3>
                    <p>Start by adding your first appliance to track energy consumption</p>
                    <button class="btn btn-primary" id="add-first-appliance">
                        <i class="fas fa-plus"></i> Add First Appliance
                    </button>
                </div>
            `;
            
            // Re-add event listener
            const addBtn = document.getElementById('add-first-appliance');
            if (addBtn) {
                addBtn.addEventListener('click', () => this.showApplianceModal());
            }
            return;
        }
        
        let html = '';
        
        this.appliances.forEach(appliance => {
            const energy = this.calculateEnergy(appliance.power, appliance.hours);
            const cost = this.calculateCost(energy);
            const co2 = this.calculateCO2(energy);
            const monthlyCost = cost * 30;
            
            // Calculate percentage for energy bar
            const totalEnergy = this.calculateTotalDailyEnergy();
            const percentage = totalEnergy > 0 ? (energy / totalEnergy * 100) : 0;
            
            html += `
                <div class="appliance-card" data-id="${appliance.id}">
                    <div class="appliance-header">
                        <div class="appliance-info">
                            <h4>${appliance.name}</h4>
                            <span class="appliance-category">${appliance.category}</span>
                        </div>
                        <div class="appliance-actions">
                            <button class="btn-icon edit-appliance" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete-appliance" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                            <span class="status-indicator ${appliance.active ? 'active' : 'inactive'}">
                                <i class="fas fa-power-off"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div class="appliance-details">
                        <div class="detail-item">
                            <span class="detail-label">Power Rating</span>
                            <span class="detail-value">${appliance.power} W</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Daily Usage</span>
                            <span class="detail-value">${appliance.hours} hrs</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Energy Usage</span>
                            <span class="detail-value energy">${energy.toFixed(2)} kWh</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Daily Cost</span>
                            <span class="detail-value cost">${this.settings.currency}${cost.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="energy-bar">
                        <div class="energy-fill" style="width: ${percentage}%"></div>
                    </div>
                    
                    <div class="appliance-footer">
                        <small>Monthly: ${this.settings.currency}${monthlyCost.toFixed(2)} | CO₂: ${co2.toFixed(2)} kg/day</small>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-appliance').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.appliance-card');
                const id = card.getAttribute('data-id');
                const appliance = this.appliances.find(a => a.id === id);
                if (appliance) this.showApplianceModal(appliance);
            });
        });
        
        document.querySelectorAll('.delete-appliance').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.appliance-card');
                const id = card.getAttribute('data-id');
                this.deleteAppliance(id);
            });
        });
    }
    
    // Delete appliance
    deleteAppliance(id) {
        if (confirm('Are you sure you want to delete this appliance?')) {
            this.appliances = this.appliances.filter(appliance => appliance.id !== id);
            this.saveData();
            this.renderDashboard();
            this.updateCharts();
        }
    }
    
    // Calculate total daily energy
    calculateTotalDailyEnergy() {
        return this.appliances.reduce((total, appliance) => {
            return total + this.calculateEnergy(appliance.power, appliance.hours);
        }, 0);
    }
    
    // Update summary cards
    updateSummary() {
        const dailyEnergy = this.calculateTotalDailyEnergy();
        const dailyCost = this.calculateCost(dailyEnergy);
        const dailyCO2 = this.calculateCO2(dailyEnergy);
        
        // Update values
        document.getElementById('daily-energy').textContent = `${dailyEnergy.toFixed(2)} kWh`;
        document.getElementById('daily-cost').textContent = `${this.settings.currency}${dailyCost.toFixed(2)}`;
        document.getElementById('daily-co2').textContent = `${dailyCO2.toFixed(2)} kg`;
        
        // Update CO2 equivalent
        const equivalent = this.getCO2Equivalent(dailyCO2);
        document.getElementById('co2-equivalent').textContent = `Equivalent to ${equivalent}`;
        
        // Calculate percentage change (mock data for demo)
        const energyChange = 5.2;
        const costChange = dailyCost * 0.052;
        
        document.getElementById('energy-change').innerHTML = `
            <i class="fas fa-arrow-up"></i> ${energyChange}% from yesterday
        `;
        
        document.getElementById('cost-change').innerHTML = `
            <i class="fas fa-arrow-up"></i> ${this.settings.currency}${costChange.toFixed(2)} from yesterday
        `;
        
        // Update tip
        this.updateDailyTip();
    }
    
    // Update daily tip
    updateDailyTip() {
        if (this.appliances.length === 0) {
            document.getElementById('daily-tip').textContent = 'Add appliances to get personalized tips';
            document.getElementById('potential-savings').textContent = 'Potential save: ₹0/month';
            return;
        }
        
        const highestConsumer = this.appliances.reduce((max, appliance) => {
            const energy = this.calculateEnergy(appliance.power, appliance.hours);
            return energy > max.energy ? { appliance, energy } : max;
        }, { appliance: null, energy: 0 });
        
        if (highestConsumer.appliance) {
            const tips = {
                'Air Conditioner': 'Increase temperature by 1°C to save 3-5% energy',
                'Refrigerator': 'Ensure door seals are tight and clean condenser coils',
                'Water Heater': 'Use timer for 30 mins before needed',
                'TV': 'Enable power saving mode and reduce brightness',
                'Washing Machine': 'Use cold water and full loads',
                'default': 'Consider upgrading to energy-efficient model'
            };
            
            const tip = tips[highestConsumer.appliance.name] || tips[highestConsumer.appliance.category] || tips.default;
            const potentialSavings = highestConsumer.energy * 0.1 * this.settings.tariff * 30;
            
            document.getElementById('daily-tip').textContent = tip;
            document.getElementById('potential-savings').textContent = 
                `Potential save: ${this.settings.currency}${potentialSavings.toFixed(2)}/month`;
        }
    }
    
    // Update live meter
    updateLiveMeter() {
        const activeAppliances = this.appliances.filter(a => a.active);
        const totalPower = activeAppliances.reduce((sum, a) => sum + a.power, 0);
        const hourlyEnergy = totalPower / 1000;
        const hourlyCost = this.calculateCost(hourlyEnergy);
        
        document.getElementById('current-power').textContent = `${totalPower} W`;
        document.getElementById('hourly-cost').textContent = `${this.settings.currency}${hourlyCost.toFixed(2)}`;
    }
    
    // Render history
    renderHistory() {
        const container = document.getElementById('history-list');
        const today = new Date().toISOString().split('T')[0];
        
        // Create mock history for demo
        if (Object.keys(this.history).length === 0) {
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                
                if (dateStr !== today) {
                    const energy = 10 + Math.random() * 5;
                    const cost = this.calculateCost(energy);
                    
                    this.history[dateStr] = { energy, cost };
                }
            }
            this.saveData();
        }
        
        // Add today's data
        const todayEnergy = this.calculateTotalDailyEnergy();
        const todayCost = this.calculateCost(todayEnergy);
        this.history[today] = { energy: todayEnergy, cost: todayCost };
        
        // Sort dates
        const sortedDates = Object.keys(this.history).sort().reverse().slice(0, 7);
        
        let html = '';
        let weeklyTotal = 0;
        let monthlyTotal = 0;
        
        sortedDates.forEach(date => {
            const record = this.history[date];
            weeklyTotal += record.energy;
            monthlyTotal += record.energy;
            
            const displayDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            html += `
                <div class="history-item">
                    <span class="history-date">${displayDate}</span>
                    <span class="history-energy">${record.energy.toFixed(2)} kWh</span>
                    <span class="history-cost">${this.settings.currency}${record.cost.toFixed(2)}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Update stats
        document.getElementById('weekly-total').textContent = `${weeklyTotal.toFixed(1)} kWh`;
        document.getElementById('monthly-total').textContent = `${monthlyTotal.toFixed(1)} kWh`;
        document.getElementById('avg-daily').textContent = `${(weeklyTotal / sortedDates.length).toFixed(1)} kWh`;
    }
    
    // Render tips
    renderTips() {
        const container = document.getElementById('tips-list');
        
        const tips = [
            {
                title: 'Optimize AC Usage',
                description: 'Set your AC to 24°C instead of 22°C to save up to 5% on energy consumption.',
                savings: 'Saves approximately ₹500/month',
                type: 'warning'
            },
            {
                title: 'Use Natural Light',
                description: 'Open curtains during the day to reduce artificial lighting needs.',
                savings: 'Saves approximately ₹200/month',
                type: 'info'
            },
            {
                title: 'Unplug Idle Electronics',
                description: 'Devices on standby still consume 5-10% of their normal power. Unplug when not in use.',
                savings: 'Saves approximately ₹300/month',
                type: 'danger'
            },
            {
                title: 'Upgrade to LED Lights',
                description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.',
                savings: 'Saves approximately ₹400/month',
                type: 'info'
            }
        ];
        
        let html = '';
        
        tips.forEach(tip => {
            html += `
                <div class="tip-card ${tip.type}">
                    <h4>
                        <i class="fas fa-lightbulb"></i>
                        ${tip.title}
                    </h4>
                    <p>${tip.description}</p>
                    <div class="tip-savings">${tip.savings}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Render gamification
    renderGamification() {
        const totalEnergy = this.calculateTotalDailyEnergy() * 30;
        const points = Math.floor(totalEnergy * 10);
        
        // Update points
        document.getElementById('energy-points').textContent = points;
        
        // Update badges
        const badgesContainer = document.getElementById('badges-container');
        const badgeList = [
            { id: 'novice', name: 'Energy Novice', threshold: 1000, icon: 'fas fa-seedling' },
            { id: 'saver', name: 'Power Saver', threshold: 5000, icon: 'fas fa-leaf' },
            { id: 'warrior', name: 'Energy Warrior', threshold: 10000, icon: 'fas fa-bolt' },
            { id: 'hero', name: 'Planet Hero', threshold: 50000, icon: 'fas fa-globe-asia' }
        ];
        
        let html = '';
        
        badgeList.forEach(badge => {
            const unlocked = points >= badge.threshold;
            html += `
                <div class="badge-item ${unlocked ? 'unlocked' : ''}">
                    <div class="badge-icon">
                        <i class="${badge.icon}"></i>
                    </div>
                    <span class="badge-name">${badge.name}</span>
                    <small>${unlocked ? 'Unlocked!' : `${badge.threshold} points needed`}</small>
                </div>
            `;
        });
        
        badgesContainer.innerHTML = html;
        
        // Update challenge progress
        const progress = Math.min((points / 1000) * 100, 100);
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.progress-text').textContent = `${Math.round(progress)}% Complete`;
    }
    
    // Check for alerts
    checkForAlerts(appliance) {
        if (!this.settings.alerts) return;
        
        const energy = this.calculateEnergy(appliance.power, appliance.hours);
        
        if (energy > 5) {
            this.showAlert({
                title: 'High Energy Consumption Detected!',
                message: `${appliance.name} is using ${energy.toFixed(2)} kWh per day. Consider reducing usage or upgrading to a more efficient model.`,
                appliance: appliance
            });
        }
    }
    
    // Show alert
    showAlert(alertData) {
        const modal = document.getElementById('alert-modal');
        const message = document.getElementById('alert-message');
        
        message.innerHTML = `
            <p><strong>${alertData.title}</strong></p>
            <p>${alertData.message}</p>
        `;
        
        modal.classList.add('active');
    }
    
    // Show resource modal
    showResource(resourceType) {
        const resource = this.resources[resourceType];
        if (!resource) return;
        
        const modal = document.getElementById('resources-modal');
        const title = document.getElementById('resources-title');
        const content = document.getElementById('resources-content');
        
        title.textContent = resource.title;
        content.innerHTML = resource.content;
        
        modal.classList.add('active');
        
        // Scroll to top of content
        content.scrollTop = 0;
    }
    
    // Hide resource modal
    hideResourceModal() {
        document.getElementById('resources-modal').classList.remove('active');
    }
    
    // Print resource content
    printResource() {
        const content = document.getElementById('resources-content').innerHTML;
        const title = document.getElementById('resources-title').textContent;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title} - Energy Tracker Pro</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
                    h1 { color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 10px; }
                    h3 { color: #333; margin-top: 30px; }
                    .formula { font-size: 1.2em; font-weight: bold; color: #4361ee; margin: 20px 0; }
                    .example-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
                    .example-item { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                    .faq-item { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                <div class="print-content">
                    ${content}
                </div>
                <div class="no-print">
                    <hr>
                    <p><small>Printed from Energy Tracker Pro on ${new Date().toLocaleString()}</small></p>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 500);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
    
    // Start live updates
    startLiveUpdates() {
        // Update live meter every 5 seconds
        setInterval(() => {
            this.updateLiveMeter();
        }, 5000);
        
        // Save history every hour
        setInterval(() => {
            this.saveDailyHistory();
        }, 3600000);
    }
    
    // Save daily history
    saveDailyHistory() {
        const today = new Date().toISOString().split('T')[0];
        const energy = this.calculateTotalDailyEnergy();
        const cost = this.calculateCost(energy);
        
        this.history[today] = { energy, cost };
        this.saveData();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.energyTracker = new EnergyTracker();
});