import React, {ReactNode} from "react";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from '@mui/icons-material/List';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BookImport from "../../page/BookImport";
import BookRegister from "../../page/BookRegister";
import {UserSetting} from "../../page/UserSetting";

export type ManagerMenu = {
    label: string;
    fontColor?: string;
    path: string;
    icon?: ReactNode;
    iconColor?: string;
    badge?: string;
    content?: ReactNode;
    menuItems?: ManagerMenu[];
}

export const ManagerMenuItem: ManagerMenu[] = [
    {
        label: '管理者画面',
        fontColor: 'white',
        path: '/admin',
        icon: <ManageAccountsIcon/>,
        iconColor: 'lightGreen',
        content: <div>管理者画面です</div>
    },
    {
        label: '図書在庫管理',
        fontColor: 'white',
        path: '/admin/books',
        icon: <ListIcon/>,
        iconColor: 'lightGreen',
        content: <BookRegister/>
    },
    {
        label: '目録登録',
        fontColor: 'white',
        path: '/admin/upload',
        icon: <FileUploadIcon/>,
        iconColor: 'lightGreen',
        content: <BookImport/>
    },
    {
        label: '利用者登録',
        fontColor: 'white',
        path: '/admin/user',
        icon: <FileUploadIcon/>,
        iconColor: 'lightGreen',
        content: <UserSetting/>
    },
]