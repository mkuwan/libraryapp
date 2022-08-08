import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";


export type SidebarContextValue = {
    sidebarWidth: number,
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
    isHidden: boolean;
    toggleOpenClose: () => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
    sidebarWidth: 220,
    isOpen: false,
    onOpen: () => null,
    onClose: () => null,
    isHidden: false,
    toggleOpenClose: () => null
});

export const SidebarProvider = ({ children } : {children: ReactNode}) => {
    const [sidebarWidth, setSidebarWidth] = useState(220);
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    const theme = useTheme();
    const breakPoints = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        setIsHidden(breakPoints);
    }, [breakPoints])

    const toggleOpenClose = useCallback(() => {
        setIsOpen(!isOpen);
        console.log('メニー表示切り替え')
    }, []);

    return(
        <SidebarContext.Provider value={{ sidebarWidth, isOpen, isHidden, onOpen, onClose, toggleOpenClose }}>
            { children }
        </SidebarContext.Provider>
    )
}