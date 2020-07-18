const ptbr = {

    code: 'pt' as 'pt',
    language: 'Português',

    'app': {
        Settings: 'Opções',
        Config: 'Config',
        Counters: 'Contadores'
    },

    'screens/Settings': {
        theme: 'Tema',
        language: 'Idioma',
        languageValue: 'Português',
        selectTheme: 'Selecione um Tema',
        selectLanguage: 'Selecione um Idioma',
        themes: {
            light: 'Claro',
            dark: 'Escuro'
        }
    },

    'components/CounterEdit': {
        title: 'Contador Selecionado',
        reset: 'Reiniciar',
        allyLabel: 'Painel de Edição do Contador Selecionado',
        a11yIncrement: 'Incrementar valor do contador selecionado',
        a11yDecrement: 'Decrementar valor do contador selecionado'
    },

    'components/CountersConfig': {
        title: 'Contadores',
        add: `Adicionar\nContador`,
        remove: `Remover\nContador`
    },

    'components/CounterView': {
        title: 'Contador ',
        a11ySelected: 'Contador Selecionado',
        a11yUnselected: 'Contador Não Selecionado'
    },

    'components/CounterList': {
        emptyListTitle: `Nenhum Contador 🙁`,
        emptyListInfo: 'Crie um contador na aba "Config"!'
    }
}

export default ptbr