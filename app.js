       // Country codes and names (partial list)
     const countries = [
        { name: "Afghanistan", code: "af" },
        { name: "Albania", code: "al" },
        { name: "Algeria", code: "dz" },
        { name: "Andorra", code: "ad" },
        { name: "Angola", code: "ao" },
        { name: "Antigua and Barbuda", code: "ag" },
        { name: "Argentina", code: "ar" },
        { name: "Armenia", code: "am" },
        { name: "Australia", code: "au" },
        { name: "Austria", code: "at" },
        { name: "Azerbaijan", code: "az" },
        { name: "Bahamas", code: "bs" },
        { name: "Bahrain", code: "bh" },
        { name: "Bangladesh", code: "bd" },
        { name: "Barbados", code: "bb" },
        { name: "Belarus", code: "by" },
        { name: "Belgium", code: "be" },
        { name: "Belize", code: "bz" },
        { name: "Benin", code: "bj" },
        { name: "Bhutan", code: "bt" },
        { name: "Bolivia", code: "bo" },
        { name: "Bosnia and Herzegovina", code: "ba" },
        { name: "Botswana", code: "bw" },
        { name: "Brazil", code: "br" },
        { name: "Brunei", code: "bn" },
        { name: "Bulgaria", code: "bg" },
        { name: "Burkina Faso", code: "bf" },
        { name: "Burundi", code: "bi" },
        { name: "Cambodia", code: "kh" },
        { name: "Cameroon", code: "cm" },
        { name: "Canada", code: "ca" },
        { name: "Cape Verde", code: "cv" },
        { name: "Central African Republic", code: "cf" },
        { name: "Chad", code: "td" },
        { name: "Chile", code: "cl" },
        { name: "China", code: "cn" },
        { name: "Colombia", code: "co" },
        { name: "Comoros", code: "km" },
        { name: "Congo", code: "cg" },
        { name: "Costa Rica", code: "cr" },
        { name: "Croatia", code: "hr" },
        { name: "Cuba", code: "cu" },
        { name: "Cyprus", code: "cy" },
        { name: "Czech Republic", code: "cz" },
        { name: "Democratic Republic of the Congo", code: "cd" },
        { name: "Denmark", code: "dk" },
        { name: "Djibouti", code: "dj" },
        { name: "Dominica", code: "dm" },
        { name: "Dominican Republic", code: "do" },
        { name: "East Timor", code: "tl" },
        { name: "Ecuador", code: "ec" },
        { name: "Egypt", code: "eg" },
        { name: "El Salvador", code: "sv" },
        { name: "Equatorial Guinea", code: "gq" },
        { name: "Eritrea", code: "er" },
        { name: "Estonia", code: "ee" },
        { name: "Eswatini", code: "sz" },
        { name: "Ethiopia", code: "et" },
        { name: "Fiji", code: "fj" },
        { name: "Finland", code: "fi" },
        { name: "France", code: "fr" },
        { name: "Gabon", code: "ga" },
        { name: "Gambia", code: "gm" },
        { name: "Georgia", code: "ge" },
        { name: "Germany", code: "de" },
        { name: "Ghana", code: "gh" },
        { name: "Greece", code: "gr" },
        { name: "Grenada", code: "gd" },
        { name: "Guatemala", code: "gt" },
        { name: "Guinea", code: "gn" },
        { name: "Guinea-Bissau", code: "gw" },
        { name: "Guyana", code: "gy" },
        { name: "Haiti", code: "ht" },
        { name: "Honduras", code: "hn" },
        { name: "Hungary", code: "hu" },
        { name: "Iceland", code: "is" },
        { name: "India", code: "in" },
        { name: "Indonesia", code: "id" },
        { name: "Iran", code: "ir" },
        { name: "Iraq", code: "iq" },
        { name: "Ireland", code: "ie" },
        { name: "Israel", code: "il" },
        { name: "Italy", code: "it" },
        { name: "Ivory Coast", code: "ci" },
        { name: "Jamaica", code: "jm" },
        { name: "Japan", code: "jp" },
        { name: "Jordan", code: "jo" },
        { name: "Kazakhstan", code: "kz" },
        { name: "Kenya", code: "ke" },
        { name: "Kiribati", code: "ki" },
        { name: "Kuwait", code: "kw" },
        { name: "Kyrgyzstan", code: "kg" },
        { name: "Laos", code: "la" },
        { name: "Latvia", code: "lv" },
        { name: "Lebanon", code: "lb" },
        { name: "Lesotho", code: "ls" },
        { name: "Liberia", code: "lr" },
        { name: "Libya", code: "ly" },
        { name: "Liechtenstein", code: "li" },
        { name: "Lithuania", code: "lt" },
        { name: "Luxembourg", code: "lu" },
        { name: "Madagascar", code: "mg" },
        { name: "Malawi", code: "mw" },
        { name: "Malaysia", code: "my" },
        { name: "Maldives", code: "mv" },
        { name: "Mali", code: "ml" },
        { name: "Malta", code: "mt" },
        { name: "Marshall Islands", code: "mh" },
        { name: "Mauritania", code: "mr" },
        { name: "Mauritius", code: "mu" },
        { name: "Mexico", code: "mx" },
        { name: "Micronesia", code: "fm" },
        { name: "Moldova", code: "md" },
        { name: "Monaco", code: "mc" },
        { name: "Mongolia", code: "mn" },
        { name: "Montenegro", code: "me" },
        { name: "Morocco", code: "ma" },
        { name: "Mozambique", code: "mz" },
        { name: "Myanmar", code: "mm" },
        { name: "Namibia", code: "na" },
        { name: "Nauru", code: "nr" },
        { name: "Nepal", code: "np" },
        { name: "Netherlands", code: "nl" },
        { name: "New Zealand", code: "nz" },
        { name: "Nicaragua", code: "ni" },
        { name: "Niger", code: "ne" },
        { name: "Nigeria", code: "ng" },
        { name: "North Korea", code: "kp" },
        { name: "North Macedonia", code: "mk" },
        { name: "Norway", code: "no" },
        { name: "Oman", code: "om" },
        { name: "Pakistan", code: "pk" },
        { name: "Palau", code: "pw" },
        { name: "Palestine", code: "ps" },
        { name: "Panama", code: "pa" },
        { name: "Papua New Guinea", code: "pg" },
        { name: "Paraguay", code: "py" },
        { name: "Peru", code: "pe" },
        { name: "Philippines", code: "ph" },
        { name: "Poland", code: "pl" },
        { name: "Portugal", code: "pt" },
        { name: "Qatar", code: "qa" },
        { name: "Romania", code: "ro" },
        { name: "Russia", code: "ru" },
        { name: "Rwanda", code: "rw" },
        { name: "Saint Kitts and Nevis", code: "kn" },
        { name: "Saint Lucia", code: "lc" },
        { name: "Saint Vincent and the Grenadines", code: "vc" },
        { name: "Samoa", code: "ws" },
        { name: "San Marino", code: "sm" },
        { name: "Sao Tome and Principe", code: "st" },
        { name: "Saudi Arabia", code: "sa" },
        { name: "Senegal", code: "sn" },
        { name: "Serbia", code: "rs" },
        { name: "Seychelles", code: "sc" },
        { name: "Sierra Leone", code: "sl" },
        { name: "Singapore", code: "sg" },
        { name: "Slovakia", code: "sk" },
        { name: "Slovenia", code: "si" },
        { name: "Solomon Islands", code: "sb" },
        { name: "Somalia", code: "so" },
        { name: "South Africa", code: "za" },
        { name: "South Korea", code: "kr" },
        { name: "South Sudan", code: "ss" },
        { name: "Spain", code: "es" },
        { name: "Sri Lanka", code: "lk" },
        { name: "Sudan", code: "sd" },
        { name: "Suriname", code: "sr" },
        { name: "Sweden", code: "se" },
        { name: "Switzerland", code: "ch" },
        { name: "Syria", code: "sy" },
        { name: "Tajikistan", code: "tj" },
        { name: "Tanzania", code: "tz" },
        { name: "Thailand", code: "th" },
        { name: "Togo", code: "tg" },
        { name: "Tonga", code: "to" },
        { name: "Trinidad and Tobago", code: "tt" },
        { name: "Tunisia", code: "tn" },
        { name: "Turkey", code: "tr" },
        { name: "Turkmenistan", code: "tm" },
        { name: "Tuvalu", code: "tv" },
        { name: "Uganda", code: "ug" },
        { name: "Ukraine", code: "ua" },
        { name: "United Arab Emirates", code: "ae" },
        { name: "United Kingdom", code: "gb" },
        { name: "United States", code: "us" },
        { name: "Uruguay", code: "uy" },
        { name: "Uzbekistan", code: "uz" },
        { name: "Vanuatu", code: "vu" },
        { name: "Vatican City", code: "va" },
        { name: "Venezuela", code: "ve" },
        { name: "Vietnam", code: "vn" },
        { name: "Yemen", code: "ye" },
        { name: "Zambia", code: "zm" },
        { name: "Zimbabwe", code: "zw" }
    ];
// Function to update player count
function updatePlayerCount() {
    const playerCount = document.getElementById('playerCount');
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    playerCount.textContent = `(${savedPlayers.length})`;
}

// Update setupCountrySearch function
function setupCountrySearch() {
    const selectElement = document.getElementById('playerCountry');
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'select-wrapper';

    // Create and insert search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Type to search countries...';
    searchInput.className = 'country-search';

    // Replace select with wrapper containing input and select
    selectElement.parentNode.replaceChild(selectWrapper, selectElement);
    selectWrapper.appendChild(searchInput);
    selectWrapper.appendChild(selectElement);

    // Add event listener for input
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        updateCountryOptions(searchText, selectElement);
    });

    // Add event listener for enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchText = searchInput.value.toLowerCase();
            const matchingCountry = countries.find(country => 
                country.name.toLowerCase().startsWith(searchText)
            );

            if (matchingCountry) {
                selectElement.value = matchingCountry.code;
                
                // If player name is filled, submit the form
                const playerName = document.getElementById('playerName').value;
                if (playerName) {
                    document.getElementById('playerForm').dispatchEvent(new Event('submit'));
                } else {
                    // Focus on player name if it's empty
                    document.getElementById('playerName').focus();
                }
            }
        }
    });

    // Add change event listener to select element
    selectElement.addEventListener('change', () => {
        // Store the selected value
        const selectedValue = selectElement.value;
        
        // Reset the country list to show all countries
        updateCountryOptions('', selectElement);
        searchInput.value = '';
        
        // Restore the selected value
        selectElement.value = selectedValue;
    });
}

// Helper function to update country options
function updateCountryOptions(searchText, selectElement) {
    // Store the currently selected value
    const currentValue = selectElement.value;
    
    // Clear current options except the first disabled one
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }

    // Add all countries that match the search text
    countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchText)) {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            selectElement.appendChild(option);
        }
    });

    // Restore the previous selection if it exists and is valid
    if (currentValue && Array.from(selectElement.options).some(opt => opt.value === currentValue)) {
        selectElement.value = currentValue;
    }
}

// Initialize on page load
window.onload = () => {
    // Populate the dropdown with countries
    const selectElement = document.getElementById('playerCountry');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        selectElement.appendChild(option);
    });
    
    // Initialize player count
    updatePlayerCount();

    // Set up the search functionality
    setupCountrySearch();

    // Load saved players
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    savedPlayers.forEach(player => {
        addPlayerToDOM(player.name, player.countryCode);
    });
};

// Function to add a player
function addPlayer(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    const playerName = document.getElementById('playerName').value;
    const playerCountryCode = document.getElementById('playerCountry').value;

    // Check if the player name and country are filled out
    if (!playerName || !playerCountryCode) {
        alert("Please fill out both fields.");
        return;
    }

    // Add player to the DOM
    addPlayerToDOM(playerName, playerCountryCode);

    // Save the player in localStorage
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    savedPlayers.push({ name: playerName, countryCode: playerCountryCode });
    localStorage.setItem('playerList', JSON.stringify(savedPlayers));
    
    updatePlayerCount();

    // Clear the form fields
    document.getElementById('playerName').value = '';
    
    // Reset the country dropdown and search
    const selectElement = document.getElementById('playerCountry');
    selectElement.value = '';
    
    // Reset country search input
    const countrySearch = document.querySelector('.country-search');
    if (countrySearch) {
        countrySearch.value = '';
    }
    
    // Repopulate the full country list
    updateCountryOptions('', selectElement);

    // Focus back on the player name input
    document.getElementById('playerName').focus();
}

// Function to add a player to the DOM
function addPlayerToDOM(playerName, playerCountryCode) {
    const playerList = document.getElementById('playerList');
    const playerItem = document.createElement('div');
    playerItem.classList.add('player-item');
    playerItem.innerHTML = `
        <span class="flag-icon flag-icon-${playerCountryCode.toLowerCase()}"></span>
        <strong>${playerCountryCode}</strong> - <b>${playerName}</b>
        <button class="delete-player" onclick="deletePlayer(this)">❌</button>
    `;
    playerList.appendChild(playerItem);
    updatePlayerCount();
}
// delete player
function deletePlayer(buttonElement) {
    const playerItem = buttonElement.closest('.player-item');
    const playerName = playerItem.querySelector('b').textContent;
    
    playerItem.remove();

    let savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    savedPlayers = savedPlayers.filter(player => player.name !== playerName);
    localStorage.setItem('playerList', JSON.stringify(savedPlayers));
    
    updatePlayerCount(); // This line was missing - add it here
}