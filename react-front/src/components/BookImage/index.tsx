import axios from "axios";
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider, UseQueryOptions,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const useApi = <TQueryKey extends [string, Record<string, unknown>?],
                TQueryFuncData,
                TError,
                TData = TQueryFuncData>
    (queryKey: TQueryKey,
       fetcher: (params: TQueryKey[1]) => Promise<TQueryFuncData>,
       options?: Omit<UseQueryOptions<unknown, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>) => {

    return useQuery({
        queryKey,
        queryFn: async () => fetcher(queryKey[1]),
        ...options
    })
}

const useApiTasks = (isbn: string) =>
    useApi(
        ['posts', {isbn}],
        async (isbn) => axios.get(`https://api.openbd.jp/v1/get?isbn=${isbn}`),
        {
            enabled: !!isbn,
        }
    )

export const BookImage = (isbn: string) => {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useApiTasks(isbn);

    return(
        <>
            {status === 'loading' ? (
                <></>
            ): (
                <></>
            )}
        </>
    )

}