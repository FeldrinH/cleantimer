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
    secondsLimit: number
}

const defaultSettings: Settings = {
    theme: 'light',
    secondsLimit: Infinity,
    negative: false,
}

function loadSettings(): Settings {
    const stored = sessionStorage.getItem('settings') || localStorage.getItem('settings');
    if (stored) {
        return { 
            ...defaultSettings,
            ...JSON.parse(stored, (k, v) => k === 'secondsLimit' ? Number(v) : v)
        };
    } else {
        return { 
            ...defaultSettings
        };
    }
}

function saveSettings(settings: Settings) {
    const toStore = JSON.stringify(settings, (k, v) => k === 'secondsLimit' ? String(v) : v);
    sessionStorage.setItem('settings', toStore);
    localStorage.setItem('settings', toStore);
}

// Load stored settings

export const settings = loadSettings();


// Setup settings UI

const settingsThemeElement = document.getElementById('settings-theme') as HTMLSelectElement;
const settingsSecondsElement = document.getElementById('settings-seconds') as HTMLSelectElement;
const settingsNegativeElement = document.getElementById('settings-negative') as HTMLInputElement;

const themeCSSLinkElement = document.getElementById('theme-css-link') as HTMLLinkElement;
function updateTheme(theme: string) {
    themeCSSLinkElement.href = themes.get(theme) || themes.get('light')!;
}

updateTheme(settings.theme);

settingsThemeElement.value = settings.theme;
settingsSecondsElement.value = String(settings.secondsLimit);
settingsNegativeElement.checked = settings.negative;

settingsThemeElement.addEventListener('change', event => {
    settings.theme = (event.target as HTMLInputElement).value;
    updateTheme(settings.theme);
    saveSettings(settings);
});
settingsSecondsElement.addEventListener('change', event => {
    settings.secondsLimit = Number((event.target as HTMLSelectElement).value);
    saveSettings(settings);
});
settingsNegativeElement.addEventListener('change', event => {
    settings.negative = (event.target as HTMLInputElement).checked;
    saveSettings(settings);
});
