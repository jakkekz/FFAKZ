// State management variables
let stateHistory = [];
let redoHistory = [];
const MAX_HISTORY = 10;

// Function to calculate points for a position
function getPointsForPosition(position, totalPlayers) {
    if (position === 1) return Math.round(totalPlayers * 1.25); // Winner gets 1.25x points, rounded
    return Math.max(totalPlayers - position + 1, 1); // Others get descending points
}

// Helper function for ordinal numbers
function getOrdinalSuffix(i) {
    const j = i % 10,
          k = i % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

// Function to get rank display (numbers or medals)
function getRankDisplay(position) {
    const settings = JSON.parse(localStorage.getItem('tournamentSettings')) || defaultSettings;
    const raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];
    
    // Show 'x' if no rounds have been played yet
    if (raceResults.length === 0) {
        return 'x';
    }
    
    // Show medals if enabled and rounds have been played
    if (settings.medalStyle === 'medals') {
        switch(position) {
            case 1: return '🏆';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return position;
        }
    }
    return position;
}

// Get ranked players list
function getRankedPlayers() {
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    const playerPoints = JSON.parse(localStorage.getItem('playerPoints')) || {};

    return savedPlayers.map(player => ({
        ...player,
        points: playerPoints[player.name] || 0,
    }))
    .sort((a, b) => b.points - a.points);
}

// Generate position inputs
function generatePositionInputs() {
    const rankedPlayers = getRankedPlayers();
    const totalPlayers = rankedPlayers.length;
    const container = document.getElementById('pointAssignmentForm');
    
    container.innerHTML = '';
    
    const inputContainer = document.createElement('div');
    inputContainer.className = 'point-input-container';
    
    for (let i = 1; i <= totalPlayers; i++) {
        const points = getPointsForPosition(i, totalPlayers);
        const inputDiv = document.createElement('div');
        inputDiv.className = 'point-input';
        
        const select = document.createElement('select');
        select.id = `place${i}`;
        select.className = 'player-select';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = `Select ${i}${getOrdinalSuffix(i)} Place`;
        select.appendChild(defaultOption);
        
        rankedPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = player.name;
            option.textContent = player.name;
            select.appendChild(option);
        });
        
        select.addEventListener('change', function() {
            updateAvailablePlayers();
        });
        
        inputDiv.appendChild(select);
        
        const pointsSpan = document.createElement('span');
        pointsSpan.className = 'points-label';
        pointsSpan.textContent = points === 1 ? `${points} point` : `${points} points`;
        inputDiv.appendChild(pointsSpan);
        
        inputContainer.appendChild(inputDiv);
    }
    
    container.appendChild(inputContainer);
    
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.onclick = assignPoints;
    submitButton.textContent = 'Assign Points';
    container.appendChild(submitButton);

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.onclick = resetInputs;
    resetButton.textContent = 'Reset Current Inputs';
    resetButton.className = 'reset-current-inputs-button';
    container.appendChild(resetButton);
}

function updateAvailablePlayers() {
    const rankedPlayers = getRankedPlayers();
    const selects = document.querySelectorAll('.player-select');
    const selectedPlayers = new Set();
    
    selects.forEach(select => {
        if (select.value) {
            selectedPlayers.add(select.value);
        }
    });

    selects.forEach(select => {
        const currentSelection = select.value;
        
        while (select.options.length > 1) {
            select.remove(1);
        }

        rankedPlayers.forEach(player => {
            if (!selectedPlayers.has(player.name) || player.name === currentSelection) {
                const newOption = document.createElement('option');
                newOption.value = player.name;
                newOption.textContent = player.name;
                select.appendChild(newOption);
            }
        });

        if (currentSelection) {
            select.value = currentSelection;
        }
    });
}

function resetInputs() {
    const rankedPlayers = getRankedPlayers();
    const selects = document.querySelectorAll('.player-select');

    selects.forEach(select => {
        select.value = "";

        rankedPlayers.forEach(player => {
            let optionExists = Array.from(select.options).some(option => option.value === player.name);
            if (!optionExists) {
                const newOption = document.createElement('option');
                newOption.value = player.name;
                newOption.textContent = player.name;
                select.appendChild(newOption);
            }
        });
    });

    updateAvailablePlayers();
}

function updateButtonStates() {
    const revertButton = document.getElementById('revertButton');
    const redoButton = document.getElementById('redoButton');
    
    if (revertButton) {
        revertButton.disabled = stateHistory.length === 0;
    }
    if (redoButton) {
        redoButton.disabled = redoHistory.length === 0;
    }
}

function saveState() {
    const currentState = {
        raceResults: JSON.parse(localStorage.getItem('raceResults')) || [],
        playerPoints: JSON.parse(localStorage.getItem('playerPoints')) || {}
    };
    
    stateHistory.push(JSON.stringify(currentState));
    redoHistory = [];
    
    if (stateHistory.length > MAX_HISTORY) {
        stateHistory.shift();
    }

    updateButtonStates();
}

function assignPoints() {
    const rankedPlayers = getRankedPlayers();
    const totalPlayers = rankedPlayers.length;
    let raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];
    
    saveState();
    
    let racePositions = [];
    for (let i = 1; i <= totalPlayers; i++) {
        const playerName = document.getElementById(`place${i}`).value.trim();
        if (playerName) {
            racePositions.push(playerName);
        }
    }

    if (racePositions.length > 0) {
        raceResults.push({
            positions: racePositions
        });
        localStorage.setItem('raceResults', JSON.stringify(raceResults));
        
        recalculateAllPoints();
        generatePositionInputs(); // Regenerate dropdowns with updated order
    }
}

function recalculateAllPoints() {
    const rankedPlayers = getRankedPlayers();
    const totalPlayers = rankedPlayers.length;
    const raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];
    const playerPoints = {};
 
    rankedPlayers.forEach(player => {
        playerPoints[player.name] = 0;
    });
 
    raceResults.forEach(race => {
        race.positions.forEach((playerName, index) => {
            if (playerPoints.hasOwnProperty(playerName)) {
                const points = getPointsForPosition(index + 1, totalPlayers); 
                playerPoints[playerName] += points; 
            }
        });
    });
 
    localStorage.setItem('playerPoints', JSON.stringify(playerPoints));
    displayResults();
}

function revertLastAction() {
    if (stateHistory.length > 0) {
        const currentState = {
            raceResults: JSON.parse(localStorage.getItem('raceResults')) || [],
            playerPoints: JSON.parse(localStorage.getItem('playerPoints')) || {}
        };
        redoHistory.push(JSON.stringify(currentState));

        const previousState = JSON.parse(stateHistory.pop());
        
        localStorage.setItem('raceResults', JSON.stringify(previousState.raceResults));
        localStorage.setItem('playerPoints', JSON.stringify(previousState.playerPoints));
        
        displayResults();
        generatePositionInputs();
        
        updateButtonStates();
    }
}

function redoLastAction() {
    if (redoHistory.length > 0) {
        const currentState = {
            raceResults: JSON.parse(localStorage.getItem('raceResults')) || [],
            playerPoints: JSON.parse(localStorage.getItem('playerPoints')) || {}
        };
        stateHistory.push(JSON.stringify(currentState));

        const redoState = JSON.parse(redoHistory.pop());
        
        localStorage.setItem('raceResults', JSON.stringify(redoState.raceResults));
        localStorage.setItem('playerPoints', JSON.stringify(redoState.playerPoints));
        
        displayResults();
        generatePositionInputs();
        
        updateButtonStates();
    }
}

function resetAllPoints() {
    if (confirm("Are you sure you want to reset all points? This action cannot be undone.")) {
        saveState();
        
        localStorage.setItem('raceResults', JSON.stringify([]));
        
        const rankedPlayers = getRankedPlayers();
        const playerPoints = {};
        rankedPlayers.forEach(player => {
            playerPoints[player.name] = 0;
        });
        localStorage.setItem('playerPoints', JSON.stringify(playerPoints));
        
        recalculateAllPoints();
        generatePositionInputs();
    }
}

function displayResults() {
    const resultsBody = document.getElementById('resultsBody');
    const roundCountElement = document.getElementById('roundCount');
    const rankedPlayers = getRankedPlayers();
    const raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];

    // Update round counter
    roundCountElement.textContent = raceResults.length;

    resultsBody.innerHTML = '';

    rankedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank-column">${getRankDisplay(index + 1)}</td>
            <td class="player-column">
                <span class="flag-icon flag-icon-${player.countryCode.toLowerCase()}"></span>
                ${player.name}
            </td>
            <td class="points-column">${player.points}</td>
        `;
        resultsBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generatePositionInputs();
    recalculateAllPoints();
    
    const resetAllPointsButton = document.getElementById('resetAllPointsButton');
    if (resetAllPointsButton) {
        resetAllPointsButton.addEventListener('click', resetAllPoints);
    }

    const revertButton = document.getElementById('revertButton');
    if (revertButton) {
        revertButton.addEventListener('click', revertLastAction);
        revertButton.disabled = true;
    }

    const redoButton = document.getElementById('redoButton');
    if (redoButton) {
        redoButton.addEventListener('click', redoLastAction);
        redoButton.disabled = true;
    }

    const savedHistory = localStorage.getItem('stateHistory');
    if (savedHistory) {
        stateHistory = JSON.parse(savedHistory);
        updateButtonStates();
    }
});