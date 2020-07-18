const en = {
    
    code: 'en' as 'en',
    language: 'English',

    'app': {
        Settings: 'Settings',
        Config: 'Config',
        Counters: 'Counters'
    },

    'screens/Settings': {
        theme: 'Theme',
        language: 'Language',
        languageValue: 'English',
        selectTheme: 'Select a Theme',
        selectLanguage: 'Select a Language',
        themes: {
            light: 'Light',
            dark: 'Dark'
        }
    },

    'components/CounterEdit': {
        title: 'Selected Counter',
        reset: 'Reset',
        allyLabel: 'Selected Counter Editing Panel',
        a11yIncrement: 'Increment value on selected counter',
        a11yDecrement: 'Decrement value on selected counter'
    },

    'components/CountersConfig': {
        title: 'Counters',
        add: `Add\nCounter`,
        remove: `Remove\nCounter`
    },

    'components/CounterView': {
        title: 'Counter ',
        a11ySelected: 'Selected Counter',
        a11yUnselected: 'Not Selected Counter'
    },

    'components/CounterList': {
        emptyListTitle: `No Counters 🙁`,
        emptyListInfo: 'Create a counter in the tab "Config"!'
    }
}

export default en