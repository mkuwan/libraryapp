import axios from "axios";
import React, {ReactNode, useEffect, useState} from "react";
import {Box, TableCell} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

type BookImageProps = {
    isbn?: string
}


export const BookImage = (props: BookImageProps) => {



    const [bookInfo, setBookInfo] = useState<string[][]>();


    useEffect(  () => {
        const func = async () => {
            axios.get(`https://api.openbd.jp/v1/get?isbn=${props.isbn}`)
                .then(result => {
                    if(result.data[0]){
                        setBookInfo(result.data);
                    } else{
                        setBookInfo([]);
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        func().then();
    }, [bookInfo])

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
            <Box >
                {bookInfo? (
                    <div>
                        {bookInfo ? (generateBookData(bookInfo)): ('')}
                    </div>
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