import {ReactNode} from "react";
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Top from "../../page/Top";
import BookList from "../../page/BookList";
import RentalProcess from "../../page/RentalProcess";

export interface MenuItem {
    label: string;
    fontColor?: string;
    path: string;
    icon?: ReactNode;
    iconColor?: string;
    badge?: string;
    content?: ReactNode;
    menuItems?: MenuItem[];
}

export const menuItem: MenuItem[] = [
    {
        label: 'Top',
        fontColor: 'white',
        path: '/',
        icon: <HomeIcon/>,
        iconColor: 'lightGreen',
        content: <Top/>
    },
    {
        label: '図書一覧',
        fontColor: 'white',
        path: '/booklist',
        icon: <LibraryBooksIcon/>,
        iconColor: 'brown',
        content: <BookList/>
    },
    {
        label: '貸出',
        fontColor: 'white',
        path: '/rental',
        icon: <ShoppingBagIcon/>,
        iconColor: 'white',
        content: <RentalProcess/>
    }
]
