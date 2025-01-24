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
function getRankDisplay(position, settings) { // Add settings parameter
    const raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];
    const players = JSON.parse(localStorage.getItem('playerList')) || [];

    // Show 'x' if no rounds have been played yet
    if (raceResults.length === 0) {
        return 'x';
    }

    // Show poop emoji for last place if enabled
    if (settings.lastPlacePoop && position === players.length) {
        return '💩';
    }

    // Show medals or colored numbers if enabled and rounds have been played
    if (settings.medalStyle === 'medals') {
        switch (position) {
            case 1: return '🏆';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return position;
        }
    } else if (settings.medalStyle === 'coloredNumbers') {
        switch (position) {
            case 1: return `<span style="color: #FFD700">${position}</span>`; // Gold
            case 2: return `<span style="color: #C0C0C0">${position}</span>`; // Silver
            case 3: return `<span style="color: #CD7F32">${position}</span>`; // Bronze
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
    
    // Add current state to history before pushing new state
    if (stateHistory.length > 0) {
        const lastState = JSON.parse(stateHistory[stateHistory.length - 1]);
        if (JSON.stringify(lastState) !== JSON.stringify(currentState)) {
            stateHistory.push(JSON.stringify(currentState));
        }
    } else {
        stateHistory.push(JSON.stringify(currentState));
    }
    
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

    // Check if all players have been assigned positions
    let racePositions = [];
    let missingPlayers = [];
    
    for (let i = 1; i <= totalPlayers; i++) {
        const playerName = document.getElementById(`place${i}`).value.trim();
        if (playerName) {
            racePositions.push(playerName);
        } else {
            missingPlayers.push(i);
        }
    }

    // If not all players are assigned, show error message
    if (missingPlayers.length > 0) {
        const positions = missingPlayers.map(pos => `${pos}${getOrdinalSuffix(pos)}`).join(', ');
        alert(`Please assign all positions before submitting.\nMissing positions: ${positions}`);
        return;
    }

    // All players are assigned, proceed with point assignment
    
    // Save the current state before making changes
    saveState();

    raceResults.push({
        positions: racePositions
    });
    localStorage.setItem('raceResults', JSON.stringify(raceResults));
    
    recalculateAllPoints();
    generatePositionInputs(); // Regenerate dropdowns with updated order
}
function recalculateAllPoints() {
    applySettings(JSON.parse(localStorage.getItem("tournamentSettings")) || defaultSettings);
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

    // Call displayResults() here to update the display
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
        
        // Update the round counter
        const roundCountElement = document.getElementById('roundCount');
        const currentRound = previousState.raceResults.length; // Use the round count from the reverted state
        roundCountElement.textContent = currentRound;

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
    const currentRound = raceResults.length;

    // Update round counter
    roundCountElement.textContent = currentRound;

    resultsBody.innerHTML = '';

    // Read the updated settings from localStorage
    const settings = JSON.parse(localStorage.getItem("tournamentSettings")) || defaultSettings;
    
    rankedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        const currentRank = index + 1;
        const previousRank = getPreviousRank(player.name, currentRound);

        // Get rank display using the updated settings directly
        const rankDisplay = getRankDisplay(currentRank, settings);

        // Define padding colors for top 3 ranks
        let paddingStyle = "padding: 0.6rem;";
        if (settings.coloredPadding && index < 3) {
            const paddingColors = {
                0: "background: linear-gradient(45deg, #FFD700 0%, #FDB931 100%)", // Gold
                1: "background: linear-gradient(45deg, #C0C0C0 0%, #A7A7AD 100%)", // Silver
                2: "background: linear-gradient(45deg, #CD7F32 0%, #A0522D 100%)"  // Bronze
            };
            paddingStyle = `padding: 0.6rem; ${paddingColors[index]};`;
        }
        let rankChangeIndicator = '';
        if (currentRound > 1 && previousRank !== null) {
            if (currentRank < previousRank) {
                rankChangeIndicator = createUpArrowSVG();
            } else if (currentRank > previousRank) {
                rankChangeIndicator = createDownArrowSVG();
            } else { // currentRank === previousRank (no change)
                rankChangeIndicator = createHorizontalArrowSVG();
            }
        }

        row.innerHTML = `
        <td class="rank-column" style="${paddingStyle}">${rankDisplay}</td>
        <td class="player-column">
            <span class="flag-icon flag-icon-${player.countryCode.toLowerCase()}"></span>
            ${player.name}
        </td>
        <td class="points-column">${player.points}</td>
        <td class="rank-change-column">${rankChangeIndicator}</td>
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

function createUpArrowSVG() {
    return `
      <svg class="rank-change-indicator rank-up" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-135 12 12)">
              <path d="M12 5L12 19" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L18 13" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L6 13" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          </g>
      </svg>
    `;
  }
  
  function createDownArrowSVG() {
    return `
      <svg class="rank-change-indicator rank-down" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-45 12 12)">
              <path d="M12 5L12 19" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L18 13" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L6 13" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          </g>
      </svg>
    `;
  }

  function createHorizontalArrowSVG() {
    return `
      <svg class="rank-change-indicator rank-same" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-90 12 12)">
              <path d="M12 5L12 19" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L18 13" stroke-width="4" stroke-linecap="round"/>
              <path d="M12 19L6 13" stroke-width="4" stroke-linecap="round"/>
          </g>
      </svg>
    `;
  }

// Function to get the previous rank of a player
function getPreviousRank(playerName, currentRound) {
    const raceResults = JSON.parse(localStorage.getItem('raceResults')) || [];
    if (raceResults.length < 2) return null;
 
    // Get previous round results
    const previousRoundResults = raceResults[raceResults.length - 2];
    
    // Calculate points up to previous round
    const playerPoints = {};
    for (let i = 0; i < raceResults.length - 1; i++) {
        raceResults[i].positions.forEach((player, position) => {
            if (!playerPoints[player]) playerPoints[player] = 0;
            playerPoints[player] += getPointsForPosition(position + 1, raceResults[i].positions.length);
        });
    }
 
    // Sort players by points to get previous rankings
    const previousRankings = Object.entries(playerPoints)
        .sort(([,a], [,b]) => b - a)
        .map(([name]) => name);
    
    return previousRankings.indexOf(playerName) + 1;
 }
// Helper function to get ranked players from a given state
function getRankedPlayersFromState(state) {
    const playerPoints = state.playerPoints || {};
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];

    return savedPlayers.map(player => ({
        name: player.name,
        points: playerPoints[player.name] || 0,
        countryCode: player.countryCode // Directly use from savedPlayers
    }))
    .sort((a, b) => b.points - a.points);
}

// Helper function to get a player's country code (you may need to adjust this based on your data structure)
function getPlayerCountryCode(playerName) {
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    const player = savedPlayers.find(p => p.name === playerName);
    return player ? player.countryCode : '';
}