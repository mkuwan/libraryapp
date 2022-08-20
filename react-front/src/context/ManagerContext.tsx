import {createContext, ReactNode, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";


export type ManagerContextValue = {
    isManagerView: boolean
    isManagerLogin: boolean
    goManagerView: () => void
    goCustomerView: () => void
}

export const ManagerContext = createContext<ManagerContextValue>({
    isManagerView: false,
    isManagerLogin: false,
    goManagerView: () => null,
    goCustomerView: () => null,
});

export const ManagerProvider = ({children} : {children: ReactNode}) => {
    const [isManagerView, setIsManagerView] = useState(false);
    const [isManagerLogin, setIsManagerLogin] = useState(false);

    const goManagerView = useCallback(() => {
        setIsManagerView(true);
    }, []);
    const goCustomerView = useCallback(() => {
        setIsManagerView(false);
        setIsManagerLogin(false);
    },[])

    return(
        <ManagerContext.Provider value={{ isManagerView, goManagerView,goCustomerView, isManagerLogin}}>
            {children}
        </ManagerContext.Provider>
    )
}