// Themes

const themePaths = import.meta.glob('/themes/*.css', { as: 'url', eager: true });
const themes = new Map(Object.entries(themePaths).map(([location, path]) => {
    const name = location.slice(8, -4);
    return [name, path];
}))


// Settings storage

interface Settings {
    theme: string
    negative: boolean
}

function loadSettings(): Settings {
    const stored = sessionStorage.getItem('settings') || localStorage.getItem('settings');
    if (stored) {
        return JSON.parse(stored);
    } else {
        return {
            theme: 'light',
            negative: false,
        }
    }
}

function saveSettings(settings: Settings) {
    const toStore = JSON.stringify(settings);
    sessionStorage.setItem('settings', toStore);
    localStorage.setItem('settings', toStore);
}


// Load stored settings

export const settings = loadSettings();


// Setup settings UI

const settingsThemeElement = document.getElementById('settings-theme') as HTMLSelectElement;
const settingsNegativeElement = document.getElementById('settings-negative') as HTMLInputElement;

const themeCSSLinkElement = document.getElementById('theme-css-link') as HTMLLinkElement;
function updateTheme(theme: string) {
    themeCSSLinkElement.href = themes.get(theme) || themes.get('light')!;
}

updateTheme(settings.theme);

settingsThemeElement.value = settings.theme;
settingsNegativeElement.checked = settings.negative;

settingsThemeElement.addEventListener('change', event => {
    settings.theme = (event.target as HTMLInputElement).value;
    updateTheme(settings.theme);
    saveSettings(settings);
})
settingsNegativeElement.addEventListener('change', event => {
    settings.negative = (event.target as HTMLInputElement).checked;
    saveSettings(settings);
})
