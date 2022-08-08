import {Box, Stack} from "@mui/material";
import React, {ReactNode, useContext} from "react";
import {SidebarContext} from "../../context/SidebarContext";
import SideBar from "../SideBar";
import TopBar, {MailInfoProps} from "../TopBar";

const demoMailInfo: MailInfoProps[] = [
    {
        num: 1,
        content: 'メールその1だよ'
    },
    {
        num: 2,
        content: 'メールその2'
    }
]

const DesktopLayout = ({children} : {children: ReactNode}) => {
    const { sidebarWidth, isHidden } = useContext(SidebarContext);
    return(
        <Stack aria-orientation={'horizontal'}>
            <Box>
                <SideBar/>
            </Box>
            <Box>
                <TopBar mailProps={demoMailInfo}/>
                <Box>{children}</Box>
            </Box>

        </Stack>
    )
}

export const Layout = () => {
    const { sidebarWidth, isHidden } = useContext(SidebarContext);



    return(
        <>
            {isHidden ? (
                <>
                    <SideBar/>
                    <Box sx={{ flexGrow: 1 }}>
                        <TopBar mailProps={demoMailInfo}/>
                        <Box>
                            モバイル画面
                        </Box>
                    </Box>
                </>
            ) : (
                <Stack direction={'row'}>
                    <SideBar/>
                    <Box sx={{ flexGrow: 1 }}>
                        <TopBar mailProps={demoMailInfo}/>
                        <Box>
                            デスクトップ表示
                        </Box>
                    </Box>

                </Stack>
            )}
        </>
    )
}

export default Layout;