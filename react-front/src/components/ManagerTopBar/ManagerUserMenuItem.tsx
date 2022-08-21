import React, {ReactNode} from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import Top from "../../page/Top";

export type ManagerUserMenu = {
    label: string;
    fontColor?: string;
    path: string;
    icon?: ReactNode;
    iconColor?: string;
    badge?: string;
    content?: ReactNode;
    menuItems?: ManagerUserMenu[];
}
export const ManagerUserMenuItem: ManagerUserMenu[] = [
    {
        label: 'プロフィール',
        fontColor: 'white',
        path: '/admin/profile',
        icon: <ManageAccountsIcon/>,
        iconColor: 'lightGreen',
        content: <div>プロフィール</div>
    },
    {
        label: 'ログアウト',
        fontColor: 'white',
        path: '/',
        icon: <HomeIcon/>,
        iconColor: 'lightGreen',
        content: <Top/>
    },

]