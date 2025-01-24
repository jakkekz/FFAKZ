// settings.js

const themeOptions = [
    { value: "dark-blue", text: "Dark Blue (default)" },
    { value: "dark", text: "Dark" },
    { value: "light", text: "Light (warning)" },
    { value: "pink-purple", text: "Femboy" },
  ];
  
  const options = [
    { value: "numbers", html: "Numbers (1, 2, 3)" },
    {
      value: "coloredNumbers",
      html: `Colored Numbers (<span style="color: #FFD700">1</span>, <span style="color: #C0C0C0">2</span>, <span style="color: #CD7F32">3</span>)`,
    },
    { value: "medals", html: "Medals (🏆, 🥈, 🥉)" },
  ];
  
  const defaultSettings = {
    theme: "dark-blue",
    medalStyle: "numbers",
    coloredPadding: false,
    lastPlacePoop: false,
  };
  
  function applySettings(settings) {
    const themeBackgrounds = {
      "dark-blue": "#0f172a",
      "dark": "#18181b",
      "light": "#f8fafc",
      "pink-purple": "#dd85c3",
    };
  
    // Set the data-theme attribute
    document.documentElement.setAttribute("data-theme", settings.theme);
  
    // Set the background color directly
    document.documentElement.style.backgroundColor = themeBackgrounds[settings.theme];
  
    // Update localStorage
    localStorage.setItem("tournamentSettings", JSON.stringify(settings));
    localStorage.setItem("currentThemeBackground", themeBackgrounds[settings.theme]);
  
    // If displayResults is available, call it to refresh the UI
    if (typeof displayResults === "function") {
      displayResults();
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    const themeSelects = document.querySelectorAll("#theme");
    themeSelects.forEach(themeSelect => {
        themeSelect.addEventListener("change", function() {
            const settings = {
                theme: this.value,
                medalStyle: document.getElementById("medalStyle")?.value || "numbers", 
                coloredPadding: document.getElementById("coloredPadding")?.checked || false,
                lastPlacePoop: document.getElementById("lastPlacePoop")?.checked || false
            };
            localStorage.setItem("tournamentSettings", JSON.stringify(settings));
            applySettings(settings);
        });
    });
});
  // Load saved settings or use default
  const savedSettings =
    JSON.parse(localStorage.getItem("tournamentSettings")) || defaultSettings;
  applySettings(savedSettings);
  
  // Create settings button and menu only once
  const settingsButton = document.createElement("button");
  settingsButton.className = "settings-button";
  settingsButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
      </svg>
  `;
  document.body.appendChild(settingsButton);
  
  const settingsMenu = document.createElement("div");
  settingsMenu.className = "settings-menu";
  settingsMenu.innerHTML = `
      <div class="settings-content" style="flex: 1;">
          <h2>Settings</h2>
          <div class="settings-section">
              <h3></h3>
              <div class="settings-option">
                  <label for="theme">Theme</label>
                  <select id="theme">
                      <option value="dark-blue">Dark Blue (default)</option>
                      <option value="dark">Dark</option>
                      <option value="light">Light (warning)</option>
                      <option value="pink-purple">Femboy</option>
                  </select>
              </div>
              <div class="settings-option">
                  <label for="medalStyle">Top 3 style, shown after round 0</label>
                  <select id="medalStyle">
                      <option value="numbers">Default Numbers</option>
                      <option value="coloredNumbers">Colored Numbers</option>
                      <option value="medals">Medals 🏆, 🥈, 🥉</option>
                  </select>
              </div>
              <div class="settings-option" style="margin-top: 0.5rem;">
                  <label class="checkbox-label">
                      <input type="checkbox" id="coloredPadding">
                      Background color for top 3
                  </label>
                  <label class="checkbox-label" style="margin-top: 0.5rem;">
                      <input type="checkbox" id="lastPlacePoop">
                      Show 💩 for last place
                  </label>
              </div>
          </div>
      </div>
      <div class="settings-footer" style="margin-top: auto; text-align: center; padding: 1rem;">
          <img src="https://i.imgur.com/WQ6gZrp.png" alt="PurpSsaka" style="width: 150px; height: 150px; border-radius: 50%;">
      </div>
  `;
  document.body.appendChild(settingsMenu);
  
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
  
  // Initialize settings
  function initializeSettings() {
      loadSettings();
  
      // Event listeners for settings changes
      document.getElementById("theme").addEventListener("change", saveSettings);
      document.getElementById("medalStyle").addEventListener("change", saveSettings);
      document.getElementById("coloredPadding").addEventListener("change", saveSettings);
      document.getElementById("lastPlacePoop").addEventListener("change", saveSettings);
  }
  document.addEventListener("DOMContentLoaded", function() {
    const themeSelect = document.querySelector(".settings-content #theme");
    if (themeSelect) {
      themeSelect.addEventListener("change", function() {
        const settings = {
          theme: this.value,
          medalStyle: document.getElementById("medalStyle")?.value || "numbers",
          coloredPadding: document.getElementById("coloredPadding")?.checked || false,
          lastPlacePoop: document.getElementById("lastPlacePoop")?.checked || false
        };
        localStorage.setItem("tournamentSettings", JSON.stringify(settings));
        applySettings(settings);
      });
    }
  });
  // Add event listeners once
  let isMenuOpen = false;
  
  function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      settingsMenu.classList.toggle("open", isMenuOpen);
      overlay.classList.toggle("active", isMenuOpen);
  }
  
  function closeMenu(event) {
      if (isMenuOpen && !settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
          toggleMenu();
      }
  }
  
  settingsButton.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
          toggleMenu();
      }
  });
  
  // Load settings into the menu
  function loadSettings() {
      const settings = JSON.parse(localStorage.getItem("tournamentSettings")) || defaultSettings;
      const themeSelect = document.getElementById("theme");
      const medalStyleSelect = document.getElementById("medalStyle");
      const coloredPaddingCheckbox = document.getElementById("coloredPadding");
      const lastPlacePoopCheckbox = document.getElementById("lastPlacePoop");
  
      if (themeSelect) {
          themeSelect.value = settings.theme;
      }
      if (medalStyleSelect) {
          medalStyleSelect.value = settings.medalStyle;
      }
      if (coloredPaddingCheckbox) {
          coloredPaddingCheckbox.checked = settings.coloredPadding;
      }
      if (lastPlacePoopCheckbox) {
          lastPlacePoopCheckbox.checked = settings.lastPlacePoop;
      }
  
      applySettings(settings);
  }
  
  // Save settings to localStorage
  function saveSettings() {
      const settings = {
          theme: document.getElementById("theme").value,
          medalStyle: document.getElementById("medalStyle").value,
          coloredPadding: document.getElementById("coloredPadding")?.checked || false,
          lastPlacePoop: document.getElementById("lastPlacePoop")?.checked || false,
      };
      localStorage.setItem("tournamentSettings", JSON.stringify(settings));
      applySettings(settings);
  
      // Call displayResults to update the display immediately
      if (typeof displayResults === "function") {
          displayResults();
      }
  }
  
  // Call initializeSettings once on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", initializeSettings);
  
  window.addEventListener("storage", (e) => {
      if (e.key === "tournamentSettings") {
          const settings = JSON.parse(e.newValue);
          applySettings(settings);
          loadSettings();
      }
  });