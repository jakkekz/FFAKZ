       // Country codes and names (partial list)
       const countries = [
        { name: "Afghanistan", code: "af" },
        { name: "Åland Islands", code: "ax" },
        { name: "Albania", code: "al" },
        { name: "Algeria", code: "dz" },
        { name: "American Samoa", code: "as" },
        { name: "Andorra", code: "ad" },
        { name: "Angola", code: "ao" },
        { name: "Anguilla", code: "ai" },
        { name: "Antarctica", code: "aq" },
        { name: "Antigua and Barbuda", code: "ag" },
        { name: "Argentina", code: "ar" },
        { name: "Armenia", code: "am" },
        { name: "Aruba", code: "aw" },
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
        { name: "Bermuda", code: "bm" },
        { name: "Bhutan", code: "bt" },
        { name: "Bolivia", code: "bo" },
        { name: "Bonaire, Saint Eustatius and Saba", code: "bq" },
        { name: "Bosnia and Herzegovina", code: "ba" },
        { name: "Botswana", code: "bw" },
        { name: "Bouvet Island", code: "bv" },
        { name: "Brazil", code: "br" },
        { name: "British Indian Ocean Territory", code: "io" },
        { name: "British Virgin Islands", code: "vg" },
        { name: "Brunei", code: "bn" },
        { name: "Bulgaria", code: "bg" },
        { name: "Burkina Faso", code: "bf" },
        { name: "Burundi", code: "bi" },
        { name: "Cambodia", code: "kh" },
        { name: "Cameroon", code: "cm" },
        { name: "Canada", code: "ca" },
        { name: "Cape Verde", code: "cv" },
        { name: "Cayman Islands", code: "ky" },
        { name: "Central African Republic", code: "cf" },
        { name: "Chad", code: "td" },
        { name: "Chile", code: "cl" },
        { name: "China", code: "cn" },
        { name: "Christmas Island", code: "cx" },
        { name: "Cocos Islands", code: "cc" },
        { name: "Colombia", code: "co" },
        { name: "Comoros", code: "km" },
        { name: "Cook Islands", code: "ck" },
        { name: "Costa Rica", code: "cr" },
        { name: "Croatia", code: "hr" },
        { name: "Cuba", code: "cu" },
        { name: "Curacao", code: "cw" },
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
        { name: "England", code: "gb-eng" },
        { name: "Equatorial Guinea", code: "gq" },
        { name: "Eritrea", code: "er" },
        { name: "Estonia", code: "ee" },
        { name: "Ethiopia", code: "et" },
        { name: "Falkland Islands", code: "fk" },
        { name: "Faroe Islands", code: "fo" },
        { name: "Fiji", code: "fj" },
        { name: "Finland", code: "fi" },
        { name: "France", code: "fr" },
        { name: "French Guiana", code: "gf" },
        { name: "French Polynesia", code: "pf" },
        { name: "French Southern Territories", code: "tf" },
        { name: "Gabon", code: "ga" },
        { name: "Gambia", code: "gm" },
        { name: "Georgia", code: "ge" },
        { name: "Germany", code: "de" },
        { name: "Ghana", code: "gh" },
        { name: "Gibraltar", code: "gi" },
        { name: "Greece", code: "gr" },
        { name: "Greenland", code: "gl" },
        { name: "Grenada", code: "gd" },
        { name: "Guadeloupe", code: "gp" },
        { name: "Guam", code: "gu" },
        { name: "Guatemala", code: "gt" },
        { name: "Guernsey", code: "gg" },
        { name: "Guinea", code: "gn" },
        { name: "Guinea-Bissau", code: "gw" },
        { name: "Guyana", code: "gy" },
        { name: "Haiti", code: "ht" },
        { name: "Honduras", code: "hn" },
        { name: "Hong Kong", code: "hk" },
        { name: "Hungary", code: "hu" },
        { name: "Iceland", code: "is" },
        { name: "India", code: "in" },
        { name: "Indonesia", code: "id" },
        { name: "Iran", code: "ir" },
        { name: "Iraq", code: "iq" },
        { name: "Ireland", code: "ie" },
        { name: "Isle of Man", code: "im" },
        { name: "Israel", code: "il" },
        { name: "Italy", code: "it" },
        { name: "Ivory Coast", code: "ci" },
        { name: "Jamaica", code: "jm" },
        { name: "Japan", code: "jp" },
        { name: "Jersey", code: "je" },
        { name: "Jordan", code: "jo" },
        { name: "Kazakhstan", code: "kz" },
        { name: "Kenya", code: "ke" },
        { name: "Kiribati", code: "ki" },
        { name: "Kosovo", code: "xk" },
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
        { name: "Macao", code: "mo" },
        { name: "Macedonia", code: "mk" },
        { name: "Madagascar", code: "mg" },
        { name: "Malawi", code: "mw" },
        { name: "Malaysia", code: "my" },
        { name: "Maldives", code: "mv" },
        { name: "Mali", code: "ml" },
        { name: "Malta", code: "mt" },
        { name: "Marshall Islands", code: "mh" },
        { name: "Martinique", code: "mq" },
        { name: "Mauritania", code: "mr" },
        { name: "Mauritius", code: "mu" },
        { name: "Mayotte", code: "yt" },
        { name: "Mexico", code: "mx" },
        { name: "Micronesia", code: "fm" },
        { name: "Moldova", code: "md" },
        { name: "Monaco", code: "mc" },
        { name: "Mongolia", code: "mn" },
        { name: "Montenegro", code: "me" },
        { name: "Montserrat", code: "ms" },
        { name: "Morocco", code: "ma" },
        { name: "Mozambique", code: "mz" },
        { name: "Myanmar", code: "mm" },
        { name: "Namibia", code: "na" },
        { name: "Nauru", code: "nr" },
        { name: "Nepal", code: "np" },
        { name: "Netherlands", code: "nl" },
        { name: "New Caledonia", code: "nc" },
        { name: "New Zealand", code: "nz" },
        { name: "Nicaragua", code: "ni" },
        { name: "Niger", code: "ne" },
        { name: "Nigeria", code: "ng" },
        { name: "Niue", code: "nu" },
        { name: "Norfolk Island", code: "nf" },
        { name: "North Korea", code: "kp" },
        { name: "Northern Ireland", code: "gb-nir" },
        { name: "Northern Mariana Islands", code: "mp" },
        { name: "Norway", code: "no" },
        { name: "Oman", code: "om" },
        { name: "Pakistan", code: "pk" },
        { name: "Palau", code: "pw" },
        { name: "Palestinian Territory", code: "ps" },
        { name: "Panama", code: "pa" },
        { name: "Papua New Guinea", code: "pg" },
        { name: "Paraguay", code: "py" },
        { name: "Peru", code: "pe" },
        { name: "Philippines", code: "ph" },
        { name: "Pitcairn", code: "pn" },
        { name: "Poland", code: "pl" },
        { name: "Portugal", code: "pt" },
        { name: "Puerto Rico", code: "pr" },
        { name: "Qatar", code: "qa" },
        { name: "Republic of the Congo", code: "cg" },
        { name: "Reunion", code: "re" },
        { name: "Romania", code: "ro" },
        { name: "Russia", code: "ru" },
        { name: "Rwanda", code: "rw" },
        { name: "Saint Barthelemy", code: "bl" },
        { name: "Saint Helena", code: "sh" },
        { name: "Saint Kitts and Nevis", code: "kn" },
        { name: "Saint Lucia", code: "lc" },
        { name: "Saint Martin", code: "mf" },
        { name: "Saint Pierre and Miquelon", code: "pm" },
        { name: "Saint Vincent and the Grenadines", code: "vc" },
        { name: "Samoa", code: "ws" },
        { name: "San Marino", code: "sm" },
        { name: "Sao Tome and Principe", code: "st" },
        { name: "Saudi Arabia", code: "sa" },
        { name: "Scotland", code: "gb-sct" },
        { name: "Senegal", code: "sn" },
        { name: "Serbia", code: "rs" },
        { name: "Seychelles", code: "sc" },
        { name: "Sierra Leone", code: "sl" },
        { name: "Singapore", code: "sg" },
        { name: "Sint Maarten", code: "sx" },
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
        { name: "Svalbard and Jan Mayen", code: "sj" },
        { name: "Swaziland", code: "sz" },
        { name: "Sweden", code: "se" },
        { name: "Switzerland", code: "ch" },
        { name: "Syria", code: "sy" },
        { name: "Taiwan", code: "tw" },
        { name: "Tajikistan", code: "tj" },
        { name: "Tanzania", code: "tz" },
        { name: "Thailand", code: "th" },
        { name: "Togo", code: "tg" },
        { name: "Tokelau", code: "tk" },
        { name: "Tonga", code: "to" },
        { name: "Trinidad and Tobago", code: "tt" },
        { name: "Tunisia", code: "tn" },
        { name: "Turkey", code: "tr" },
        { name: "Turkmenistan", code: "tm" },
        { name: "Tuvalu", code: "tv" },
        { name: "Uganda", code: "ug" },
        { name: "Ukraine", code: "ua" },
        { name: "United Arab Emirates", code: "ae" },
        { name: "United States", code: "us" },
        { name: "U.S. Virgin Islands", code: "vi" },
        { name: "Uruguay", code: "uy" },
        { name: "Uzbekistan", code: "uz" },
        { name: "Vanuatu", code: "vu" },
        { name: "Vatican", code: "va" },
        { name: "Venezuela", code: "ve" },
        { name: "Vietnam", code: "vn" },
        { name: "Wallis and Futuna", code: "wf" },
        { name: "Wales", code: "gb-wls" },
        { name: "Western Sahara", code: "eh" },
        { name: "Yemen", code: "ye" },
        { name: "Zambia", code: "zm" },
        { name: "Zimbabwe", code: "zw" }
 ]
// Function to update player count
function updatePlayerCount() {
    const playerCount = document.getElementById('playerCount');
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    playerCount.textContent = savedPlayers.length;
}

// Update setupCountrySearch function
function setupCountrySearch() {
    const selectElement = document.getElementById('playerCountry');
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'custom-select';
    selectWrapper.style.position = 'relative';
    selectWrapper.style.width = '100%';

    // Create and insert search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Type to search countries...';
    searchInput.className = 'country-search';
    searchInput.style.backgroundColor = 'var(--surface-light)';
    searchInput.style.color = 
    searchInput.style.borderRadius = 'var(--radius)';
    searchInput.style.padding = '0.53rem';
    

    // Create dropdown container with updated styles
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'options-container';
    dropdownContainer.style.display = 'none';
    dropdownContainer.style.position = 'absolute';
    dropdownContainer.style.width = '100%';
    dropdownContainer.style.backgroundColor = 'var(--surface)';
    dropdownContainer.style.borderRadius = 'var(--radius)';
    dropdownContainer.style.marginTop = '0px';
    dropdownContainer.style.zIndex = '1000';
    dropdownContainer.style.boxShadow = 'var(--shadow)';
    dropdownContainer.style.maxHeight = '400px';
    dropdownContainer.style.overflowY = 'auto';

    // Replace select with wrapper containing input and custom dropdown
    selectElement.parentNode.replaceChild(selectWrapper, selectElement);
    selectWrapper.appendChild(searchInput);
    selectWrapper.appendChild(dropdownContainer);

    // Add event listener for input
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        updateDropdownOptions(searchText, dropdownContainer);
        dropdownContainer.style.display = 'block';
    });

    // Add event listener for enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstOption = dropdownContainer.querySelector('.option');
            if (firstOption) {
                const countryCode = firstOption.dataset.value;
                handleCountrySelect(countryCode);
                dropdownContainer.style.display = 'none';
                searchInput.value = ''; // Clear the search input
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            dropdownContainer.style.display = 'none';
        }
    });

    return { searchInput, dropdownContainer, selectWrapper };
}

function updateDropdownOptions(searchText, dropdownContainer) {
    dropdownContainer.innerHTML = '';

    countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchText)) {
            const option = document.createElement('div');
            option.className = 'option';
            option.style.padding = '0.53rem';
            option.style.cursor = 'pointer';
            option.style.transition = 'background-color 0.2s';
            option.style.display = 'grid';
            option.style.gridTemplateColumns = '30px 1fr';
            option.style.gap = '0.4rem';
            option.style.alignItems = 'center';
            
            option.innerHTML = `
                <span class="flag-icon flag-icon-${country.code.toLowerCase()}"></span>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${country.name}</span>
            `;
            option.dataset.value = country.code;
            
            // Rest of event listeners stay the same
            option.addEventListener('mouseover', () => {
                option.style.backgroundColor = 'var(--background)';
            });
            
            option.addEventListener('mouseout', () => {
                option.style.backgroundColor = 'transparent';
            });
            
            option.addEventListener('click', () => {
                handleCountrySelect(country.code);
                dropdownContainer.style.display = 'none';
                const searchInput = dropdownContainer.previousElementSibling;
                searchInput.value = '';
            });
            
            dropdownContainer.appendChild(option);
        }
    });
}

function handleCountrySelect(countryCode) {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        addPlayerWithData(playerName, countryCode);
    }
}

// Helper function to update country options
function updateCountryOptions(searchText, selectElement) {
    const currentValue = selectElement.value;
    
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }

    countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchText)) {
            const option = document.createElement('option');
            option.value = country.code;
            option.innerHTML = `<span class="flag-icon flag-icon-${country.code.toLowerCase()}"></span> ${country.name}`;
            selectElement.appendChild(option);
        }
    });

    if (currentValue && Array.from(selectElement.options).some(opt => opt.value === currentValue)) {
        selectElement.value = currentValue;
    }
}
// Initialize on page load
window.onload = () => {
    // Populate the dropdown with countries
    const selectElement = document.getElementById("playerCountry");
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      selectElement.appendChild(option);
    });
  
    // Initialize player count
    updatePlayerCount();
  
    // Set up the search functionality
    const {
      searchInput,
      dropdownContainer,
      selectWrapper,
    } = setupCountrySearch(); // Destructure the returned object
  
    // Load saved players
    const savedPlayers = JSON.parse(localStorage.getItem("playerList")) || [];
    savedPlayers.forEach((player) => {
      addPlayerToDOM(player.name, player.countryCode);
    });
  
    // Add event listener to country select
    if (selectElement) {
      // Remove the old event listener that was tied to the original select element
      // selectElement.addEventListener('change', () => { ... });
  
      // Instead, handle country selection through the custom dropdown
      dropdownContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("option")) {
          const playerName = document.getElementById("playerName").value;
          const playerCountryCode = event.target.dataset.value;
  
          if (playerName && playerCountryCode) {
            addPlayer(event, playerCountryCode); // Pass the event and country code
          }
  
          // Close the dropdown after selection
          dropdownContainer.style.display = "none";
          searchInput.value = ""; // Clear the search input
        }
      });
    }
  };

// Function to add a player
function addPlayer(event, countryCode) {
    // Keep this for form submit handling
    event.preventDefault();
  
    const playerName = document.getElementById("playerName").value;
  
    // Use the passed countryCode if available, otherwise try to get it from the dropdown
    if (!playerName) {
      alert("Please fill out the player name.");
      return;
    }
    if (!countryCode) {
      const selectedOption = document.querySelector(
        ".dropdown-container .option:hover"
      );
      if (!selectedOption) {
        alert("Please select a country from the dropdown.");
        return;
      }
      countryCode = selectedOption.dataset.value;
    }
  
    addPlayerWithData(playerName, countryCode);
  }
  

function addPlayerWithData(playerName, countryCode) {
    // Add player to the DOM
    addPlayerToDOM(playerName, countryCode);

    // Save the player in localStorage
    const savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    savedPlayers.push({ name: playerName, countryCode: countryCode });
    localStorage.setItem('playerList', JSON.stringify(savedPlayers));
    
    updatePlayerCount();

    // Clear the form fields
    document.getElementById('playerName').value = '';
    
    // Reset country search input
    const countrySearch = document.querySelector('.country-search');
    if (countrySearch) {
        countrySearch.value = '';
    }

    // Focus back on the player name input
    document.getElementById('playerName').focus();
}

// In addPlayerToDOM function, add data-name attribute:
function addPlayerToDOM(playerName, playerCountryCode) {
    const playerList = document.getElementById('playerList');
    const playerItem = document.createElement('div');
    playerItem.classList.add('player-item');
    playerItem.dataset.name = playerName; // Add this line
    playerItem.innerHTML = `
        <span class="flag-icon flag-icon-${playerCountryCode.toLowerCase()}"></span>
        ${playerName}
        <button class="delete-player" onclick="deletePlayer(this)">
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    playerList.appendChild(playerItem);
    updatePlayerCount();
}
// And in deletePlayer function, use the data-name attribute:
function deletePlayer(buttonElement) {
    const playerItem = buttonElement.closest('.player-item');
    const playerName = playerItem.dataset.name;
    
    playerItem.remove();

    let savedPlayers = JSON.parse(localStorage.getItem('playerList')) || [];
    savedPlayers = savedPlayers.filter(player => player.name !== playerName);
    localStorage.setItem('playerList', JSON.stringify(savedPlayers));
    
    updatePlayerCount();
}