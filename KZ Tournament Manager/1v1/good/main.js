
function showPage(pageId) {
    document.querySelectorAll(".page").forEach((page) => {
        page.style.display = page.id === pageId ? "flex" : "none";
    });

    const diceButton = document.getElementById("generateBracket");
    diceButton.style.display = pageId === "bracket" ? "block" : "none";

    const homeButton = document.querySelector(".header button:first-child");
    homeButton.style.display = pageId === "bracket" ? "none" : "block";

    document.getElementById("pageTitle").textContent =
        pageId === "registration" ? "Tournament Players" : "Tournament Bracket";
    localStorage.setItem("currentPage", pageId);

    const switchButton = document.querySelector(".header button:last-child");
    switchButton.textContent =
        pageId === "registration" ? "View Bracket" : "Registration";
}

function togglePage() {
    const currentPage = localStorage.getItem("currentPage") || "registration";
    showPage(currentPage === "registration" ? "bracket" : "registration");
}

document.addEventListener("DOMContentLoaded", function () {
    const lastPage = localStorage.getItem("currentPage") || "registration";
    showPage(lastPage);

    // Initialize countries
    countries.init();

// Event listener for player name input
document.getElementById("playerName").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const name = this.value.trim();
        const countryCode = document.getElementById("countrySearch").dataset.countryCode;
        if (name && countryCode) {
            playerManager.addPlayer(name, countryCode);
            document.getElementById("countrySearch").value = "";
            document.getElementById("countrySearch").dataset.countryCode = "";
            this.value = "";
            document.getElementById("countryDropdown").innerHTML = "";
        }
    }
});

    // Event listener for player name input
    document.getElementById("playerName").addEventListener("input", function () {
        const name = this.value.trim();
        const countryCode = document.getElementById("countrySearch").dataset.countryCode;
        // Do NOT add player here. Only add player if country is selected AFTER name.
    });

    // Event listener for country search input
    document.getElementById("countrySearch").addEventListener("input", function () {
        const searchTerm = this.value.trim();
        countries.searchCountries(searchTerm);

        const countryDropdown = document.getElementById("countryDropdown");
        countryDropdown.style.width = `${this.offsetWidth}px`; // Match dropdown width to input width
        countryDropdown.style.display = "block"; // Show the dropdown
    });

    // Event listener to handle Enter key press in country search
    document.getElementById("countrySearch").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            const playerName = document.getElementById("playerName").value.trim();
            const countryDropdown = document.getElementById("countryDropdown");
            const firstCountryItem = countryDropdown.querySelector(".country-dropdown-item");

            if (playerName && firstCountryItem) {
                const countryName = firstCountryItem.textContent.trim();
                const countryCode = firstCountryItem.querySelector("span").className.split("flag-icon-")[1];

                // Add player only if name was written before
                playerManager.addPlayer(playerName, countryCode);
                this.value = ""; // Clear the search input
                this.dataset.countryCode = ""; // Reset the data attribute
                countryDropdown.innerHTML = ""; // Clear the dropdown

                // Focus on the player name input after adding a player
                document.getElementById("playerName").focus();
            }
        }
    });

    document.getElementById("countryDropdown").addEventListener("click", function (event) {
        const playerName = document.getElementById("playerName").value.trim();
        const clickedItem = event.target.closest(".country-dropdown-item");
    
        if (clickedItem) {
            const countryCode = clickedItem.querySelector(".flag-icon").className.split("flag-icon-")[1];
            if (playerName) {
                playerManager.addPlayer(playerName, countryCode);
                document.getElementById("playerName").value = "";
                document.getElementById("countrySearch").value = "";
                document.getElementById("countrySearch").dataset.countryCode = "";
                document.getElementById("countryDropdown").innerHTML = "";
                document.getElementById("playerName").focus();
            }
        }
    });

    playerManager.loadPlayers();
    bracketManager.loadBracketState();

    // Keep the rest of the event listeners from your original code
    window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "WARNING: this action resets the bracket";
        return "WARNING: this action resets the bracket";
    });

    document
        .getElementById("generateBracket")
        .addEventListener("click", function (e) {
            if (!confirm("WARNING: this action resets the bracket")) {
                e.preventDefault();
                return;
            }

            this.classList.add("rolling");

            // Remove class after animation completes
            this.addEventListener(
                "animationend",
                () => {
                    this.classList.remove("rolling");
                },
                { once: true }
            );

            bracketManager.generateBracket(playerManager.players);
        });

    const settingsButton = document.getElementById("settingsButton");
    const settingsMenu = document.getElementById("settingsMenu");
    const settingsOverlay = document.getElementById("settingsOverlay");
    const contentWrapper = document.querySelector(".content-wrapper");
    const themeSelect = document.getElementById("themeSelect");

    settingsButton.addEventListener("click", function (event) {
        event.stopPropagation();

        settingsMenu.classList.toggle("open");
        settingsOverlay.classList.toggle("active");
        if (settingsMenu.classList.contains("open")) {
            contentWrapper.style.opacity = "0.5";
        } else {
            contentWrapper.style.opacity = "1";
        }
    });

    settingsMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    themeSelect.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (
            settingsMenu.classList.contains("open") &&
            !settingsMenu.contains(event.target) &&
            !settingsButton.contains(event.target) ||
            settingsOverlay.contains(event.target)
        ) {
            settingsMenu.classList.remove("open");
            settingsOverlay.classList.remove("active");
            contentWrapper.style.opacity = "1";
        }
    });

    function setTheme(themeName) {
        document.documentElement.setAttribute("data-theme", themeName);
        localStorage.setItem("theme", themeName);
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        themeSelect.value = savedTheme;
        setTheme(savedTheme);
    } else {
        setTheme("dark-blue");
    }

    themeSelect.addEventListener("change", function () {
        setTheme(this.value);
    });
});