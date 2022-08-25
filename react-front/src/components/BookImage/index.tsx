import axios from "axios";
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider, UseQueryOptions, useMutation,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, {ReactNode, useEffect, useState} from "react";
import {Box, TableCell} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

type BookImageProps = {
    isbn?: string
}

// const useApi = <TQueryKey extends [string, Record<string, unknown>?],
//                 TQueryFuncData,
//                 TError,
//                 TData = TQueryFuncData>
//     (queryKey: TQueryKey,
//        fetcher: (params: TQueryKey[1]) => Promise<TQueryFuncData>,
//        options?: Omit<UseQueryOptions<unknown, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>) => {
//
//     return useQuery({
//         queryKey,
//         queryFn: async () => fetcher(queryKey[1]),
//         ...options
//     })
// }
//
// const useApiTasks = (isbn: string) =>
//     useApi(
//         /**
//          * 第1引数 QueryKey、2番めにはデータ取得関数に渡すパラメーターを渡す
//          * パラメーターがそのまま QueryKeyとなる
//          */
//         ['bookIsbn', {isbn}],
//
//         /**
//          * 第2引数 第1引数の2番目の値がそのままデータ取得用の1つ目の引数に入る
//          * 2つ目にはuseApiで取得したaccessTokenが入る
//          * @param isbn
//          */
//         async (isbn) => axios.get(`https://api.openbd.jp/v1/get?isbn=${isbn}`),
//
//         /**
//          * 第3引数 useQueryのオプション
//          */
//         {
//             enabled: !!isbn,
//         }
//     )


export const BookImage = (props: BookImageProps) => {

    const [bookInfo, setBookInfo] = useState<string[][]>();


    useEffect(  () => {
        const func = async () => {
            axios.get(`https://api.openbd.jp/v1/get?isbn=${props.isbn}`)
                .then(result => {
                    if(result.data[0]){
                        setBookInfo(result.data);
                    }

                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        func().then();
    }, [])

    const generateBookData = (data: { [x: string]: any; }) => {
        const generatedData = Object.keys(data)
            .reduce((result: ReactNode[], currentKey: string) => {
                if(typeof data[currentKey] === 'string' || data[currentKey] instanceof String){
                    if(currentKey === 'cover'){
                        const elementToPush = generateElement(currentKey, data[currentKey]);
                        result.push(elementToPush);
                    }
                } else{
                    const nested = generateBookData(data[currentKey]);
                    result.push(...nested);
                }
                return result;
            }, [])
        return generatedData;
    }

    const generateElement = (key: string, value: string) => {
        return (
            // <div key={key} className="row">
            //     <div className="col-xs-6 ins-label">{key}</div>
            //     <div className="col-xs-6">{value}</div>
            // </div>
            <div >
                <img src={value}
                     style={{ maxWidth: 150, maxHeight: 200}}
                     alt={value}
                     loading={"lazy"}/>
            </div>

        );
    }

    return(
        <Grid2 container={true} wrap={"nowrap"}>
            <Box sx={{ width: 200, height: 200}}>
                {bookInfo? (
                    <>
                        {generateBookData(bookInfo)}
                    </>
                ) : (
                    <div >
                        not found
                    </div>
                )}
            </Box>
        </Grid2>
    )
}

export default BookImage;