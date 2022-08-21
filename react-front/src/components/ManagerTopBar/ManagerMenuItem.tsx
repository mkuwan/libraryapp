import React, {ReactNode} from "react";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from '@mui/icons-material/List';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
        label: '図書一覧',
        fontColor: 'white',
        path: '/admin/books',
        icon: <ListIcon/>,
        iconColor: 'lightGreen',
        content: <>図書一覧</>
    },
    {
        label: 'Upload',
        fontColor: 'white',
        path: '/admin/upload',
        icon: <FileUploadIcon/>,
        iconColor: 'lightGreen',
        content: <>CSV Upload</>
    },
]