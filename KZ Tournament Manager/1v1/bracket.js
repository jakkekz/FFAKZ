const bracketManager = {
    // Add this right here at the start of the bracketManager object
BRACKET_FEED_PATTERNS: {
    2:  [], // No play-in needed
    3:  [1],
    4:  [], // No play-in needed
    5:  [1,], 
    6:  [1,3], 
    7:  [1,3,4], 
    8:  [], // No play-in needed
    9:  [1], 
    10: [1,3], 
    11: [1,3,5], 
    12: [1,3,5,7], 
    13: [1,3,5,7,8], 
    14: [1,3,5,6,7,8], 
    15: [1,3,4,5,6,7,8], 
    16: [], // No play-in needed
    17: [1],
    18: [1,3], 
    19: [1,3,5], 
    20: [1,3,5,7], 
    21: [1,3,5,7,9], 
    22: [1,3,5,7,9,11], 
    23: [1,3,5,7,9,11,13], 
    24: [1,3,5,7,9,11,13,15], 
    25: [1,3,5,7,9,11,13,15,16], 
    26: [1,3,5,7,9,11,13,14,15,16], 
    27: [1,3,5,7,9,11,12,13,14,15,16], 
    28: [1,3,5,7,9,10,11,12,13,14,15,16],
    29: [1,3,5,7,8,9,10,11,12,13,14,15,16], 
    30: [1,3,5,6,7,8,9,10,11,12,13,14,15,16],
    31: [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    32: [] // No play-in needed
},

loadBestOfSettings: function() {
    const savedBestOf = JSON.parse(localStorage.getItem('bestOfSettings'));
    if (savedBestOf) {
        Object.keys(savedBestOf).forEach(round => {
            const roundElement = Array.from(document.querySelectorAll('.bracket-round')).find(r =>
                r.querySelector('h3').textContent === round
            );
            if (roundElement) {
                const bestOfSelect = roundElement.querySelector('.round-best-of');
                bestOfSelect.value = savedBestOf[round];
                this.updateRoundScoreBoxes(bestOfSelect, round.includes('Play-In') ? 'play-in' : parseInt(round.split(' ')[1]) - 1);
            }
        });
    }
},

saveBestOfSettings: function() {
    const bestOfSettings = {};
    document.querySelectorAll('.round-best-of').forEach((select) => {
        const roundTitle = select.closest('.bracket-round').querySelector('h3').textContent;
        bestOfSettings[roundTitle] = select.value;
    });
    localStorage.setItem('bestOfSettings', JSON.stringify(bestOfSettings));
},

    // Add these new methods at the top of the object
    saveBracketState: function() {
        const bracket = document.getElementById('tournamentBracket');
        if (!bracket) return;
    
        const state = {
            rounds: [],
            bestOf: {}
        };
    
        // Save best-of selections
        document.querySelectorAll('.round-best-of').forEach((select, index) => {
            state.bestOf[select.closest('.bracket-round').querySelector('h3').textContent] = select.value;
        });
    
        // Save matches state
        document.querySelectorAll('.bracket-round').forEach(round => {
            const roundState = {
                title: round.querySelector('h3').textContent,
                matches: []
            };
    
            round.querySelectorAll('.match').forEach(match => {
                const matchState = {
                    player1: {
                        name: match.querySelector('.player-container:first-child .player').textContent.trim(),
                        country: match.querySelector('.player-container:first-child .flag-icon').classList[1].split('flag-icon-')[1].toLowerCase() || ''

                    },
                    player2: {
                        name: match.querySelector('.player-container:last-child .player').textContent.trim(),
                        country: match.querySelector('.player-container:last-child .flag-icon').classList[1].split('flag-icon-')[1].toLowerCase() || ''
                    },
                    scores: {
                        player1: Array.from(match.querySelectorAll('.player1-scores .score-box')).map(box => box.classList.contains('won')),
                        player2: Array.from(match.querySelectorAll('.player2-scores .score-box')).map(box => box.classList.contains('won'))
                    },
                    feedsInto: match.dataset.feedsInto,
                    matchIndex: match.dataset.matchIndex
                };
                roundState.matches.push(matchState);
            });
    
            state.rounds.push(roundState);
        });
    
        localStorage.setItem('bracketState', JSON.stringify(state));
    },
    loadBracketState: function() {
        const savedState = localStorage.getItem('bracketState');
        if (!savedState) return;
    
        const state = JSON.parse(savedState);
    
        // Restore best-of selections
        state.rounds.forEach(roundState => {
            const round = Array.from(document.querySelectorAll('.bracket-round')).find(r => 
                r.querySelector('h3').textContent === roundState.title
            );
            if (round) {
                const bestOfSelect = round.querySelector('.round-best-of');
                bestOfSelect.value = state.bestOf[roundState.title];
                this.updateRoundScoreBoxes(bestOfSelect, roundState.title.includes('Play-In') ? 'play-in' : parseInt(roundState.title.split(' ')[1]) - 1);
            }
        });
    
        // Restore matches state
        state.rounds.forEach(roundState => {
            roundState.matches.forEach(matchState => {
                const match = document.querySelector(`.match[data-feeds-into="${matchState.feedsInto}"], .match[data-match-index="${matchState.matchIndex}"]`);
                if (!match) return;
    
                // Restore players
                const player1Div = match.querySelector('.player-container:first-child .player');
                const player2Div = match.querySelector('.player-container:last-child .player');
    
                player1Div.innerHTML = `
                    <span class="flag-icon flag-icon-${matchState.player1.country}"></span>
                    ${matchState.player1.name}
                `;
                player2Div.innerHTML = `
                    <span class="flag-icon flag-icon-${matchState.player2.country}"></span>
                    ${matchState.player2.name}
                `;
    
                // Restore scores
                const player1Boxes = match.querySelectorAll('.player1-scores .score-box');
                const player2Boxes = match.querySelectorAll('.player2-scores .score-box');
    
                matchState.scores.player1.forEach((won, i) => {
                    if (won && player1Boxes[i]) player1Boxes[i].classList.add('won');
                });
                matchState.scores.player2.forEach((won, i) => {
                    if (won && player2Boxes[i]) player2Boxes[i].classList.add('won');
                });
            });
        });
    },

    generateBracket: function(players) {
        localStorage.removeItem('bracketState');
        if (!players || players.length === 0) {
            document.getElementById('tournamentBracket').innerHTML = '';
            return;
        }

        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
        const totalPlayers = players.length;
        let x = 1;
        while (x * 2 <= totalPlayers) {
            x *= 2;
        }

        // Calculate how many play-in matches we need
        const playInMatches = [];
        const mainRoundMatches = [];
        const playInCount = totalPlayers - x; // Number of play-in matches needed

// Create play-in matches using first (playInCount * 2) players
let usedPlayers = new Set();
const feedPattern = this.BRACKET_FEED_PATTERNS[totalPlayers];

for (let i = 0; i < playInCount; i++) {
    const player1 = shuffledPlayers[i * 2];
    const player2 = shuffledPlayers[i * 2 + 1];
    usedPlayers.add(player1.name);
    usedPlayers.add(player2.name);

    // Use the feed pattern to determine where this match feeds into
    let feedsInto = feedPattern[i];

    playInMatches.push({
        player1: player1,
        player2: player2,
        isPlayIn: true,
        feedsInto: feedsInto
    });
}

        // Get remaining players that weren't used in play-in matches
        const remainingPlayers = shuffledPlayers.filter(p => !usedPlayers.has(p.name));

        // Create main round matches
        const mainRoundSize = x / 2; // Number of matches in first main round
        let remainingIndex = 0;

        for (let i = 0; i < mainRoundSize; i++) {
            let match = {
                player1: { name: 'TBD', country: '' },
                player2: { name: 'TBD', country: '' }
            };

            if (i * 2 + 1 <= playInCount * 2) { // Check if this slot should be a play-in fed slot (TBD slot)
                // Assign a player to the lower slot (player2)
                if (remainingIndex < remainingPlayers.length) {
                match.player2 = remainingPlayers[remainingIndex++];
                }
            } else {
                // Fill from remaining players if available
                if (remainingIndex < remainingPlayers.length) {
                match.player1 = remainingPlayers[remainingIndex++];
                }
                if (remainingIndex < remainingPlayers.length) {
                match.player2 = remainingPlayers[remainingIndex++];
                }
            }

            mainRoundMatches.push(match);
        }

        // Rest of the display logic 
        const bracket = document.getElementById('tournamentBracket');
        bracket.innerHTML = '';

        // Create play-in round
        if (playInMatches.length > 0) {
            const playInDiv = document.createElement('div');
            playInDiv.className = 'bracket-round';

            const playInHeader = document.createElement('div');
            playInHeader.className = 'round-header';
            playInHeader.innerHTML = `
                <h3>Play-In Round</h3>
                <select class="round-best-of" onchange="bracketManager.updateRoundScoreBoxes(this, 'play-in')">
                    ${[1, 3, 5, 7].map(n => `<option value="${n}">Best of ${n}</option>`).join('')}
                </select>
            `;
            playInDiv.appendChild(playInHeader);

            let slotIndex = 1;
            playInMatches.forEach((match, index) => {
                const matchDiv = this.createMatchDiv(match, 'play-in', slotIndex);
                slotIndex += 2;
                matchDiv.dataset.feedsInto = match.feedsInto; 
                playInDiv.appendChild(matchDiv);
            });

            bracket.appendChild(playInDiv);
        }

        // Generate main rounds
        const rounds = Math.ceil(Math.log2(x));
        
        for (let round = 0; round < rounds; round++) {
            const roundDiv = document.createElement('div');
            roundDiv.className = 'bracket-round';

            const roundHeader = document.createElement('div');
            roundHeader.className = 'round-header';
const roundName = () => {
    const totalRounds = rounds;
    if (round === totalRounds - 1) return 'Final';
    if (round === totalRounds - 2) return 'SF';
    if (round === totalRounds - 3) return 'QF';
    return `Round ${round + 1}`;
};

roundHeader.innerHTML = `
    <h3>${roundName()}</h3>
    <select class="round-best-of" onchange="bracketManager.updateRoundScoreBoxes(this, ${round})">
        ${[1, 3, 5, 7].map(n => `<option value="${n}">Best of ${n}</option>`).join('')}
    </select>
`;
            roundDiv.appendChild(roundHeader);
            let slotIndex = 1;
            if (round === 0) {
                mainRoundMatches.forEach((match, index) => {
                    const matchDiv = this.createMatchDiv(match, round, slotIndex);
                    slotIndex += 2;
                    matchDiv.dataset.matchIndex = index;
                    roundDiv.appendChild(matchDiv);
                });
            } else {
                const matchCount = Math.pow(2, rounds - round - 1);
                for (let match = 0; match < matchCount; match++) {
                    const matchDiv = this.createMatchDiv({
                        player1: { name: 'TBD', country: '' },
                        player2: { name: 'TBD', country: '' }
                    }, round, slotIndex);
                    slotIndex += 2;
                    roundDiv.appendChild(matchDiv);
                }
            }

            bracket.appendChild(roundDiv);
        }
        this.saveBracketState();
        this.loadBestOfSettings();
    },

    createMatchDiv: function(match, round, slotIndex) {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match';
        matchDiv.dataset.round = round;

        const boxCount = (Number(1) + 1) / 2;

        // Add a helper function to ensure proper flag display
        const getPlayerHtml = (player) => {
            const countryCode = player.country ? player.country.toLowerCase() : '';
            return `
                <span class="flag-icon flag-icon-${countryCode}"></span>
                ${player.name}
            `;
        };

        // Use slotIndex and slotIndex + 1 for labels
        matchDiv.innerHTML = `
        <div class="match-players">
            <div class="player-container">
                <div class="player-slot-label">#${slotIndex}</div>
                <div class="player">
                    ${getPlayerHtml(match.player1)}
                </div>
                <div class="score-boxes player1-scores">
                    ${Array(boxCount).fill('<div class="score-box" data-player="1"></div>').join('')}
                </div>
            </div>
            <div class="player-container">
                <div class="player-slot-label">#${slotIndex + 1}</div>
                <div class="player">
                    ${getPlayerHtml(match.player2)}
                </div>
                <div class="score-boxes player2-scores">
                    ${Array(boxCount).fill('<div class="score-box" data-player="2"></div>').join('')}
                </div>
            </div>
        </div>
    `;

        const scoreBoxes = matchDiv.querySelectorAll('.score-box');
        scoreBoxes.forEach(box => {
            box.addEventListener('click', () => this.handleScoreClick(box));
        });

        return matchDiv;
    },

    updateScoreBoxes: function(selectElement) {
        const match = selectElement.closest('.match');
        const boxCount = (Number(selectElement.value) + 1) / 2;
        
        const player1Scores = match.querySelector('.player1-scores');
        const player2Scores = match.querySelector('.player2-scores');
        
        player1Scores.innerHTML = Array(boxCount).fill('<div class="score-box" data-player="1"></div>').join('');
        player2Scores.innerHTML = Array(boxCount).fill('<div class="score-box" data-player="2"></div>').join('');
        
        // Reattach click handlers
        const scoreBoxes = match.querySelectorAll('.score-box');
        scoreBoxes.forEach(box => {
            box.addEventListener('click', () => this.handleScoreClick(box));
        });
    },

    handleScoreClick: function(clickedBox) {
        const player = clickedBox.dataset.player;
        const match = clickedBox.closest('.match');
        
        // If box was lit and is being unlit
        if (clickedBox.classList.contains('won')) {
            clickedBox.classList.remove('won');
            // Clear next round spot since the winner might have changed
            this.clearNextRoundSpot(match);
        } else {
            // Box was unlit and is being lit
            clickedBox.classList.add('won');
        }
        
        // Check if there's a winner after the toggle
        this.checkMatchWinner(match);
        this.saveBracketState();
    },
    
    movePlayerToNextRound: function(match, winner) {
        const currentRound = match.dataset.round;
        const isPlayIn = currentRound === 'play-in';
        
        if (isPlayIn) {
            const feedsIntoSlot = parseInt(match.dataset.feedsInto);
            // Find all matches in round 1 and filter for the one with the matching slot label
            const round1Matches = Array.from(document.querySelectorAll('.match[data-round="0"]'));
            const targetMatch = round1Matches.find(match => {
                const slotLabels = match.querySelectorAll('.player-slot-label');
                return Array.from(slotLabels).some(label => label.textContent === `#${feedsIntoSlot}`);
            });
            
            if (targetMatch) {
                // Find the correct slot
                const slotLabels = targetMatch.querySelectorAll('.player-slot-label');
                const targetContainer = Array.from(slotLabels).find(label => 
                    label.textContent === `#${feedsIntoSlot}`
                ).closest('.player-container');
                
                const playerDiv = targetContainer.querySelector('.player');
                const winnerContainer = Array.from(match.querySelectorAll('.player')).find(p => 
                    p.textContent.trim() === winner
                );
                const countryCode = winnerContainer.querySelector('.flag-icon').classList[1].split('flag-icon-')[1];
                
                playerDiv.innerHTML = `
                    <span class="flag-icon flag-icon-${countryCode}"></span>
                    ${winner}
                `;
            }
        } else {
            const nextRound = parseInt(currentRound) + 1;
            const matchIndex = Array.from(match.parentNode.children).indexOf(match) - 1;
            const nextMatchIndex = Math.floor(matchIndex / 2);
            
            const nextRoundMatches = document.querySelectorAll(`.match[data-round="${nextRound}"]`);
            const nextMatch = nextRoundMatches[nextMatchIndex];
            
            if (nextMatch) {
                const isTopPlayer = matchIndex % 2 === 0;
                const playerContainers = nextMatch.querySelectorAll('.player-container');
                const targetContainer = isTopPlayer ? playerContainers[0] : playerContainers[1];
                const playerDiv = targetContainer.querySelector('.player');
                
                const winnerContainer = Array.from(match.querySelectorAll('.player')).find(p => p.textContent.trim() === winner);
                const countryCode = winnerContainer.querySelector('.flag-icon').classList[1].split('flag-icon-')[1];
                
                playerDiv.innerHTML = `
                    <span class="flag-icon flag-icon-${countryCode}"></span>
                    ${winner}
                `;
            }
        }
    },
    checkMatchWinner: function(match) {
        const bestOf = match.closest('.bracket-round').querySelector('.round-best-of').value;
        const winsNeeded = Math.ceil(bestOf / 2);
        
        const player1Wins = match.querySelectorAll('.score-box[data-player="1"].won').length;
        const player2Wins = match.querySelectorAll('.score-box[data-player="2"].won').length;
        
        this.clearNextRoundSpot(match);
        
        // Check if this is the final match AND not a play-in match
        const currentRound = match.dataset.round;
        const nextRound = parseInt(currentRound) + 1;
        const nextRoundMatches = document.querySelectorAll(`.match[data-round="${nextRound}"]`);
        const isFinalMatch = nextRoundMatches.length === 0 && currentRound !== 'play-in';
    
        if (isFinalMatch) {
            match.querySelectorAll('.player-container').forEach(container => {
                container.classList.remove('winner');
            });
    
            if (player1Wins >= winsNeeded) {
                match.querySelector('.player-container:first-child').classList.add('winner');
            } else if (player2Wins >= winsNeeded) {
                match.querySelector('.player-container:last-child').classList.add('winner');
            }
        }
    
        if (player1Wins >= winsNeeded) {
            const winner = match.querySelector('.player-container:first-child .player').textContent.trim();
            this.movePlayerToNextRound(match, winner);
        } else if (player2Wins >= winsNeeded) {
            const winner = match.querySelector('.player-container:last-child .player').textContent.trim();
            this.movePlayerToNextRound(match, winner);
        }
    },
    clearNextRoundSpot: function(match) {
        const currentRound = match.dataset.round;
        const isPlayIn = currentRound === 'play-in';
        
        if (isPlayIn) {
            const feedsIntoSlot = parseInt(match.dataset.feedsInto);
            const round1Matches = Array.from(document.querySelectorAll('.match[data-round="0"]'));
            const targetMatch = round1Matches.find(match => {
                const slotLabels = match.querySelectorAll('.player-slot-label');
                return Array.from(slotLabels).some(label => label.textContent === `#${feedsIntoSlot}`);
            });
            
            if (targetMatch) {
                // Find the correct slot
                const slotLabels = targetMatch.querySelectorAll('.player-slot-label');
                const targetContainer = Array.from(slotLabels).find(label => 
                    label.textContent === `#${feedsIntoSlot}`
                ).closest('.player-container');
                
                const playerDiv = targetContainer.querySelector('.player');
                playerDiv.innerHTML = `
                    <span class="flag-icon flag-icon-"></span>
                    TBD
                `;
            }
        } else {
            const nextRound = parseInt(currentRound) + 1;
            const matchIndex = Array.from(match.parentNode.children).indexOf(match) - 1;
            const nextMatchIndex = Math.floor(matchIndex / 2);
            
            const nextRoundMatches = document.querySelectorAll(`.match[data-round="${nextRound}"]`);
            const nextMatch = nextRoundMatches[nextMatchIndex];
            
            if (nextMatch) {
                const isTopPlayer = matchIndex % 2 === 0;
                const playerContainers = nextMatch.querySelectorAll('.player-container');
                const targetContainer = isTopPlayer ? playerContainers[0] : playerContainers[1];
                const playerDiv = targetContainer.querySelector('.player');
                
                // Check if the current match has a qualified winner
                const bestOf = match.closest('.bracket-round').querySelector('.round-best-of').value;
                const winsNeeded = Math.ceil(bestOf / 2);
                const player1Wins = match.querySelectorAll('.score-box[data-player="1"].won').length;
                const player2Wins = match.querySelectorAll('.score-box[data-player="2"].won').length;
                
                // Only keep the player if they have enough wins
                if (!((player1Wins >= winsNeeded && playerDiv.textContent.trim() === match.querySelector('.player-container:first-child .player').textContent.trim()) ||
                      (player2Wins >= winsNeeded && playerDiv.textContent.trim() === match.querySelector('.player-container:last-child .player').textContent.trim()))) {
                    playerDiv.innerHTML = `
                        <span class="flag-icon flag-icon-"></span>
                        TBD
                    `;
                }
            }
        }
    },

    updateRoundScoreBoxes: function(selectElement, round) {
        const boxCount = (Number(selectElement.value) + 1) / 2;
        const roundMatches = document.querySelectorAll(`.match[data-round="${round}"]`);
        
        roundMatches.forEach(match => {
            const player1Scores = match.querySelector('.player1-scores');
            const player2Scores = match.querySelector('.player2-scores');
            
            player1Scores.innerHTML = Array(boxCount).fill('<div class="score-box" data-player="1"></div>').join('');
            player2Scores.innerHTML = Array(boxCount).fill('<div class="score-box" data-player="2"></div>').join('');
            
            const scoreBoxes = match.querySelectorAll('.score-box');
            scoreBoxes.forEach(box => {
                box.addEventListener('click', () => this.handleScoreClick(box));
            });
        });
        this.saveBestOfSettings();
    }
}

