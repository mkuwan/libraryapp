import {createContext, ReactNode, useState} from "react";


export type SidebarContextValue = {
    navVisible: boolean,
    sidebarWidth: number,
    isMobile: boolean;
    setNavVisibility: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
    navVisible: false,
    sidebarWidth: 260,
    isMobile: false,
    setNavVisibility: (value) => null
});

export const SidebarProvider = ({ children } : {children: ReactNode}) => {
    const [navVisible, setNavVisible] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(260);
    const [isMobile, setIsMobile] = useState(false);

    const setNavVisibility = (value: boolean) => { setNavVisible(value)};


    return(
        <SidebarContext.Provider value={{ navVisible, setNavVisibility, sidebarWidth, isMobile }}>
            { children }
        </SidebarContext.Provider>
    )
}