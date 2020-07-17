import { pSBC } from "~/utils"

const darkTheme = {

    name: 'dark' as 'dark',

    dark: true,
    navBarLightSetting: false,
    
    color: {

        primary: pSBC(-0.8, '#001c47'), 
        secondary: pSBC(-0.9, '#0082c9'),
        tertiary: '#ff9500',
        quaternary: '#14437b',
        
        background: pSBC(-0.9, '#0082c9'),
        secondaryBackground: pSBC(-0.9, '#d8d8d8'),
        tertiaryBackground: pSBC(-0.8, '#14437b'),

        text: pSBC(+0.5, '#333333'),
        secondaryText: '#FFFFFF',
        tertiaryText: pSBC(+0.5, '#999999'),
        quaternaryText: pSBC(+0.5, '#14437b'),
    }
    
}

export default darkTheme