export type RootParamList = {
    TabNav: undefined
    Settings: undefined
    Picker: {
        title?: string
        data: {
            text: string,
            value: any
        }[]
        onPick: (item: {
            text: string,
            value: any
        }) => Promise<void>
    }
}