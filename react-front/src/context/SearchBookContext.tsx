import {createContext, ReactNode, useCallback, useState} from "react";

export type BookViewModel = {
    bookId: string
    titleAuthor: string
    publishInfo: string
    sizeInfo: string
    amount: number
    rentedCount: number
}

export type SearchBookContextValue = {
    searchValue?: string,
    onSearch: (value: string) => void;
    onClear: () => void;
    bookViewModels: BookViewModel[]
}

export const SearchBookContext = createContext<SearchBookContextValue>({
    searchValue: '',
    onClear: () => null,
    onSearch: (value: string) => null,
    bookViewModels: []
});

export const SearchBookProvider = ({ children } : {children: ReactNode})  => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [bookViewModels, setBookViewModels] = useState<BookViewModel[]>([]);

    const onClear = () => { setSearchValue('')}

    const onSearch = useCallback((value: string) => {
        alert('本の検索と結果を表示させるよ')
    }, [])

    return(
        <SearchBookContext.Provider value={{ searchValue, onClear, onSearch, bookViewModels }}>
            { children }
        </SearchBookContext.Provider>
)
}