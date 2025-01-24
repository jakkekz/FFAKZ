const playerManager = {
        players: [],
    
        addPlayer: function(name, country) {
            this.players.push({
                name: name,
                country: country,
            });
    
            this.savePlayers();
            this.displayPlayers();
            bracketManager.generateBracket(this.players);
    
            // Reset form fields
            document.getElementById('playerName').value = '';
            document.getElementById('countrySearch').value = '';
            document.getElementById('countrySearch').dataset.countryCode = '';
            document.getElementById('countryDropdown').innerHTML = '';
        },
    
        removePlayer: function(index) {
            this.players.splice(index, 1);
            this.savePlayers();
            this.displayPlayers();
            bracketManager.generateBracket(this.players);
        },
    
        savePlayers: function() {
            localStorage.setItem('tournamentPlayers', JSON.stringify(this.players));
        },
    
        loadPlayers: function() {
            const saved = localStorage.getItem('tournamentPlayers');
            this.players = saved ? JSON.parse(saved) : [];
            this.displayPlayers();
            if (localStorage.getItem('bracketState')) {
                bracketManager.generateBracket(this.players);
                bracketManager.loadBracketState();
            } else {
                bracketManager.generateBracket(this.players);
            }
        },
    
        displayPlayers: function() {
            const list = document.getElementById('playerList');
            list.innerHTML = '';
            const playerCounter = document.createElement('div');
            playerCounter.style.marginBottom = '10px';
            playerCounter.textContent = `Players: ${this.players.length}`;
            list.appendChild(playerCounter);
            this.players.forEach((player, index) => {
                const entry = document.createElement('div');
                entry.className = 'player-entry';
                entry.innerHTML = `
                <div>
                    ${player.country ? `<span class="flag-icon flag-icon-${player.country.toLowerCase()}"></span>` : ''}
                    <span>${player.name}</span>
                </div>
                <button class="remove-player" data-index="${index}">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                `;
                list.appendChild(entry);
            });
    
            const removeButtons = document.querySelectorAll('.remove-player');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index, 10);
                    playerManager.removePlayer(index);
                });
            });
        }
    };