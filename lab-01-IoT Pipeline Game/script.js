/**
 * IoT Pipeline Game - Main Game Logic
 * A simple, educational web application that teaches IoT data pipeline concepts
 * through an interactive drag-and-drop quiz.
 */

class IoTPipelineGame {
    constructor() {
        this.gameState = {
            score: 0,
            startTime: Date.now(),
            moves: 0,
            gameCompleted: false
        };
        
        this.components = [
            {
                id: 'ingestion',
                title: '📡 Ingestion Layer',
                description: 'Data collection from IoT devices and sensors',
                correctPosition: 1,
                color: '#667eea'
            },
            {
                id: 'storage',
                title: '🗄️ Storage Layer',
                description: 'Raw data storage in data lake',
                correctPosition: 2,
                color: '#764ba2'
            },
            {
                id: 'bronze',
                title: '🥉 Bronze Layer',
                description: 'Raw data preservation and initial processing',
                correctPosition: 3,
                color: '#cd7f32'
            },
            {
                id: 'silver',
                title: '🥈 Silver Layer',
                description: 'Cleaned and validated data',
                correctPosition: 4,
                color: '#c0c0c0'
            },
            {
                id: 'gold',
                title: '🥇 Gold Layer',
                description: 'Business-ready aggregated data',
                correctPosition: 5,
                color: '#ffd700'
            },
            {
                id: 'query',
                title: '🔍 Query Platform',
                description: 'Data access and querying tools',
                correctPosition: 6,
                color: '#3498db'
            },
            {
                id: 'visualization',
                title: '📊 Visualization',
                description: 'Data presentation and reporting',
                correctPosition: 7,
                color: '#e74c3c'
            }
        ];
        
        this.pipelineSteps = [];
        this.placedComponents = new Map();
        this.timer = null;
        
        this.init();
    }

    /**
     * Initialize the game
     */
    init() {
        this.logAction('Game Initialization', 'Starting IoT Pipeline Game');
        this.setupEventListeners();
        this.shuffleComponents();
        this.renderComponents();
        this.renderPipelineSteps();
        this.startTimer();
        this.logAction('Game Initialization', 'Game setup completed successfully');
    }

    /**
     * Set up event listeners for game interactions
     */
    setupEventListeners() {
        // Game control buttons
        document.getElementById('checkAnswer').addEventListener('click', () => this.checkAnswer());
        document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
        document.getElementById('showHint').addEventListener('click', () => this.showHint());

        // Global drag and drop event listeners
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }

    /**
     * Shuffle components for randomization
     */
    shuffleComponents() {
        this.logAction('Component Shuffling', 'Shuffling component order for new game');
        for (let i = this.components.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.components[i], this.components[j]] = [this.components[j], this.components[i]];
        }
        this.logAction('Component Shuffling', `Components shuffled. New order: ${this.components.map(c => c.id).join(', ')}`);
    }

    /**
     * Render components in the component library
     */
    renderComponents() {
        const container = document.getElementById('componentsContainer');
        container.innerHTML = '';

        this.components.forEach(component => {
            const componentElement = this.createComponentElement(component);
            container.appendChild(componentElement);
        });

        this.logAction('Component Rendering', 'All components rendered in component library');
    }

    /**
     * Create a draggable component element
     */
    createComponentElement(component) {
        const element = document.createElement('div');
        element.className = 'component';
        element.draggable = true;
        element.dataset.componentId = component.id;
        element.style.borderLeft = `4px solid ${component.color}`;

        element.innerHTML = `
            <div class="component-title">${component.title}</div>
            <div class="component-description">${component.description}</div>
        `;

        // Drag event listeners
        element.addEventListener('dragstart', (e) => this.handleDragStart(e, component));
        element.addEventListener('dragend', (e) => this.handleDragEnd(e));

        return element;
    }

    /**
     * Render pipeline steps (drop zones)
     */
    renderPipelineSteps() {
        const container = document.getElementById('pipelineSteps');
        container.innerHTML = '';

        for (let i = 1; i <= 7; i++) {
            const stepElement = this.createPipelineStepElement(i);
            container.appendChild(stepElement);
        }

        this.logAction('Pipeline Rendering', 'Pipeline steps created with drop zones');
    }

    /**
     * Create a pipeline step element (drop zone)
     */
    createPipelineStepElement(stepNumber) {
        const element = document.createElement('div');
        element.className = 'pipeline-step';
        element.dataset.position = stepNumber;
        element.dataset.stepNumber = stepNumber;

        element.innerHTML = `
            <div class="step-number">Step ${stepNumber}</div>
        `;

        // Drop event listeners
        element.addEventListener('dragover', (e) => this.handleDragOver(e));
        element.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        element.addEventListener('drop', (e) => this.handleDrop(e));

        return element;
    }

    /**
     * Handle drag start event
     */
    handleDragStart(e, component) {
        this.logAction('Drag Start', `Started dragging component: ${component.title}`);
        e.dataTransfer.setData('text/plain', component.id);
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    /**
     * Handle drag end event
     */
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.logAction('Drag End', 'Drag operation completed');
    }

    /**
     * Handle drag over event
     */
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('drag-over');
    }

    /**
     * Handle drag leave event
     */
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    /**
     * Handle drop event
     */
    handleDrop(e) {
        e.preventDefault();
        const dropZone = e.currentTarget;
        const componentId = e.dataTransfer.getData('text/plain');
        const position = parseInt(dropZone.dataset.position);

        dropZone.classList.remove('drag-over');

        // Check if component is already placed
        if (this.placedComponents.has(componentId)) {
            this.logAction('Drop Rejected', `Component ${componentId} is already placed`);
            this.showMessage('This component is already placed!', 'error');
            return;
        }

        // Check if position is already occupied
        if (this.placedComponents.has(position)) {
            this.logAction('Drop Rejected', `Position ${position} is already occupied`);
            this.showMessage('This position is already occupied!', 'error');
            return;
        }

        this.placeComponent(componentId, position, dropZone);
    }

    /**
     * Place a component in a pipeline step
     */
    placeComponent(componentId, position, dropZone) {
        const component = this.components.find(c => c.id === componentId);
        if (!component) return;

        // Update game state
        this.placedComponents.set(componentId, position);
        this.placedComponents.set(position, componentId);
        this.gameState.moves++;

        // Update UI
        dropZone.classList.add('filled');
        dropZone.innerHTML = `
            <div class="component placed" style="border-left: 4px solid ${component.color}">
                <div class="component-title">${component.title}</div>
                <div class="component-description">${component.description}</div>
            </div>
        `;

        // Mark component as placed in library
        const componentElement = document.querySelector(`[data-component-id="${componentId}"]`);
        if (componentElement) {
            componentElement.classList.add('placed');
            componentElement.style.opacity = '0.5';
        }

        // Update moves counter
        document.getElementById('moves').textContent = this.gameState.moves;

        this.logAction('Component Placement', `Component ${component.title} placed at position ${position}`);
        this.showMessage(`Great! ${component.title} placed at Step ${position}`, 'success');

        // Check if game is complete
        if (this.placedComponents.size === 14) { // 7 components × 2 (id + position)
            this.checkGameCompletion();
        }
    }

    /**
     * Check if the game is complete
     */
    checkGameCompletion() {
        this.logAction('Game Completion Check', 'Checking if all components are placed');
        
        if (this.placedComponents.size === 14) {
            this.logAction('Game Completion', 'All components placed, ready for validation');
            document.getElementById('checkAnswer').disabled = false;
        }
    }

    /**
     * Check the answer and calculate score
     */
    checkAnswer() {
        this.logAction('Answer Validation', 'Starting answer validation process');
        
        let correctPlacements = 0;
        let totalScore = 0;
        const timeBonus = this.calculateTimeBonus();

        // Check each component placement
        this.components.forEach(component => {
            const placedPosition = this.placedComponents.get(component.id);
            if (placedPosition === component.correctPosition) {
                correctPlacements++;
                totalScore += 100;
                
                // Mark as correct
                const stepElement = document.querySelector(`[data-position="${placedPosition}"]`);
                if (stepElement) {
                    const componentElement = stepElement.querySelector('.component');
                    if (componentElement) {
                        componentElement.classList.add('correct');
                    }
                }
            }
        });

        // Calculate final score
        totalScore += timeBonus;
        this.gameState.score = totalScore;
        this.gameState.gameCompleted = true;

        // Update UI
        document.getElementById('score').textContent = totalScore;
        document.getElementById('checkAnswer').disabled = true;

        // Show results
        this.showResults(correctPlacements, totalScore, timeBonus);
        
        this.logAction('Answer Validation Complete', `Score: ${totalScore}, Correct: ${correctPlacements}/7, Time Bonus: ${timeBonus}`);
    }

    /**
     * Calculate time bonus based on completion time
     */
    calculateTimeBonus() {
        const elapsedTime = (Date.now() - this.gameState.startTime) / 1000; // seconds
        const baseTime = 300; // 5 minutes base time
        
        if (elapsedTime <= baseTime) {
            return Math.max(0, Math.floor((baseTime - elapsedTime) / 10) * 10);
        }
        return 0;
    }

    /**
     * Show game results
     */
    showResults(correctPlacements, totalScore, timeBonus) {
        const accuracy = Math.round((correctPlacements / 7) * 100);
        let message = '';
        let messageType = '';

        if (accuracy === 100) {
            message = `🎉 Perfect! You got all ${correctPlacements} components correct! Final Score: ${totalScore} (${timeBonus} time bonus)`;
            messageType = 'success';
        } else if (accuracy >= 70) {
            message = `👍 Good job! You got ${correctPlacements}/7 correct. Final Score: ${totalScore} (${timeBonus} time bonus)`;
            messageType = 'success';
        } else {
            message = `📚 Keep learning! You got ${correctPlacements}/7 correct. Final Score: ${totalScore} (${timeBonus} time bonus)`;
            messageType = 'info';
        }

        this.showMessage(message, messageType);
        this.logAction('Game Results', `Accuracy: ${accuracy}%, Score: ${totalScore}, Time Bonus: ${timeBonus}`);
    }

    /**
     * Show hint to the user
     */
    showHint() {
        this.logAction('Hint Requested', 'User requested a hint');
        
        const hint = `💡 Hint: Think about the data flow! Data starts with collection (ingestion), then moves through storage and processing layers (bronze → silver → gold), and finally reaches users through querying and visualization.`;
        
        this.showMessage(hint, 'info');
    }

    /**
     * Reset the game
     */
    resetGame() {
        this.logAction('Game Reset', 'Resetting game to initial state');
        
        // Reset game state
        this.gameState = {
            score: 0,
            startTime: Date.now(),
            moves: 0,
            gameCompleted: false
        };

        // Clear placed components
        this.placedComponents.clear();

        // Reset UI
        document.getElementById('score').textContent = '0';
        document.getElementById('moves').textContent = '0';
        document.getElementById('checkAnswer').disabled = true;

        // Reset components
        this.shuffleComponents();
        this.renderComponents();

        // Reset pipeline steps
        this.renderPipelineSteps();

        // Clear messages
        this.hideMessage();

        // Restart timer
        this.startTimer();

        this.logAction('Game Reset', 'Game successfully reset and ready for new play');
    }

    /**
     * Start the game timer
     */
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            const elapsed = Date.now() - this.gameState.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);

        this.logAction('Timer Start', 'Game timer started');
    }

    /**
     * Show a message to the user
     */
    showMessage(message, type = 'info') {
        const messageElement = document.getElementById('gameMessage');
        messageElement.textContent = message;
        messageElement.className = `game-message ${type}`;
        messageElement.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideMessage();
        }, 5000);

        this.logAction('Message Display', `Showing ${type} message: ${message}`);
    }

    /**
     * Hide the message
     */
    hideMessage() {
        const messageElement = document.getElementById('gameMessage');
        messageElement.classList.add('hidden');
    }

    /**
     * Log actions for debugging and monitoring
     */
    logAction(action, details) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="action">${action}:</span>
            <span class="details">${details}</span>
        `;

        const logContainer = document.getElementById('actionLog');
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;

        // Also log to console for debugging
        console.log(`[${timestamp}] ${action}: ${details}`);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing IoT Pipeline Game...');
    window.game = new IoTPipelineGame();
});
