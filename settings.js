const defaultSettings = {
    theme: 'dark-blue',
    medalStyle: 'numbers'
};

const savedSettings = JSON.parse(localStorage.getItem('tournamentSettings')) || defaultSettings;
applySettings(savedSettings);

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('tournamentSettings')) || defaultSettings;
    const themeSelect = document.getElementById('theme');
    const medalStyleSelect = document.getElementById('medalStyle');
    if (themeSelect) themeSelect.value = settings.theme;
    if (medalStyleSelect) medalStyleSelect.value = settings.medalStyle;
    applySettings(settings);
}

function saveSettings() {
    const settings = {
        theme: document.getElementById('theme').value,
        medalStyle: document.getElementById('medalStyle').value
    };
    localStorage.setItem('tournamentSettings', JSON.stringify(settings));
    applySettings(settings);
}

function applySettings(settings) {
    const themeBackgrounds = {
        'dark-blue': '#0f172a',
        'dark': '#18181b',
        'light': '#f8fafc',
        'pink-purple': '#dd85c3'
    };
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.body.className = settings.theme;
    document.documentElement.style.backgroundColor = themeBackgrounds[settings.theme];
    localStorage.setItem('tournamentSettings', JSON.stringify(settings));
    localStorage.setItem('currentThemeBackground', themeBackgrounds[settings.theme]);
}

function initializeSettings() {
    const settingsButton = document.createElement('button');
    settingsButton.className = 'settings-button';
    settingsButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    `;
    document.body.appendChild(settingsButton);

    const settingsMenu = document.createElement('div');
    settingsMenu.className = 'settings-menu';
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
                        <option value="numbers">Numbers (1, 2, 3)</option>
                        <option value="medals">Medals (🏆, 🥈, 🥉)</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="settings-footer" style="margin-top: auto; text-align: center; padding: 1rem;">
            <img src="https://i.imgur.com/WQ6gZrp.png" alt="PurpSsaka" style="width: 150px; height: 150px; border-radius: 50%;">
        </div>
    `;
    document.body.appendChild(settingsMenu);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        settingsMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    function closeMenu(event) {
        if (!settingsMenu.contains(event.target) && !settingsButton.contains(event.target)) {
            settingsMenu.classList.remove('open');
            overlay.classList.remove('active');
        }
    }

    settingsButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    loadSettings();

    const themeSelect = document.getElementById('theme');
    const medalStyleSelect = document.getElementById('medalStyle');
    if (themeSelect) {
        themeSelect.addEventListener('change', saveSettings);
    }
    if (medalStyleSelect) {
        medalStyleSelect.addEventListener('change', () => {
            saveSettings();
            if (typeof displayResults === 'function') {
                displayResults();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeSettings);

window.addEventListener('storage', (e) => {
    if (e.key === 'tournamentSettings') {
        const settings = JSON.parse(e.newValue);
        applySettings(settings);
        loadSettings();
    }
});