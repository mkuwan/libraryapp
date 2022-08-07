import {PaletteMode} from "@mui/material";
import {createContext, ReactNode, useState} from "react";

export type ContentWidth = 'full' | 'boxed'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type Settings = {
    mode: PaletteMode
    themeColor: ThemeColor
    contentWidth: ContentWidth
}

export type SettingsContextValue = {
    settings: Settings
    saveSettings: (updateSettings: Settings) => void
}

export type ThemeConfig = {
    mode: PaletteMode
    routingLoader: boolean
    disableRipple: boolean
    navigationSize: number
    menuTextTruncate: boolean
    contentWidth: ContentWidth
    responsiveFontSizes:boolean
}

const themeConfig: ThemeConfig = {
    mode: 'light',
    routingLoader: true,
    disableRipple: false,
    navigationSize: 260,
    menuTextTruncate: true,
    contentWidth: 'boxed',
    responsiveFontSizes: true
}

const initialSettings: Settings = {
    mode: themeConfig.mode,
    themeColor: 'primary',
    contentWidth: themeConfig.contentWidth
}

// create context
export const SettingsContext = createContext<SettingsContextValue>({
    saveSettings: () => null,
    settings: initialSettings
})

export const SettingsProvider = ({children} : {children: ReactNode}) => {
    const [settings, setSettings] = useState<Settings>({...initialSettings});

    const saveSettings = (updateSettings: Settings) => {
        setSettings(updateSettings);
    }

    return <SettingsContext.Provider value={{settings, saveSettings}}>
        {children}
    </SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer;