import {createContext, ReactNode, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";


export type ManagerContextValue = {
    isManagerView: boolean
    isManagerLogin: boolean
    goManagerView: () => void
    goCustomerView: () => void
    managerLogin: (userId: string, password: string) => boolean
}

export const ManagerContext = createContext<ManagerContextValue>({
    isManagerView: false,
    isManagerLogin: false,
    goManagerView: () => null,
    goCustomerView: () => null,
    managerLogin: (userId: string, password: string) => false,
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

    const managerLogin = useCallback((userId: string, password: string) : boolean => {
        // TODO: ログイン処理
        if(userId === 'admin' && password === 'admin'){
            setIsManagerLogin(true);
            return true;
        }
        else{
            setIsManagerLogin(false);
            return false;
        }

    }, [])

    return(
        <ManagerContext.Provider value={{ isManagerView, goManagerView,goCustomerView, isManagerLogin, managerLogin}}>
            {children}
        </ManagerContext.Provider>
    )
}