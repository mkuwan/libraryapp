import {API_URL, API_VERSION1, CONTROLLER_CSV} from "../../constant/HostData";
import React, {forwardRef, useRef, useState} from "react";
import axios from "axios";
import {Box, Button, Container, FormControl, Grid, Input, InputLabel, Typography} from "@mui/material";
import {Uploader} from "../../components/Uploader";
import {Accept} from "react-dropzone";
import Grid2 from "@mui/material/Unstable_Grid2";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import {useCSVReader, usePapaParse } from "react-papaparse";
import Papa, {ParseResult} from "papaparse";
import {CarWash} from "mdi-material-ui";



export const BookImport = () => {
    const { CSVReader } = useCSVReader();
    const { readString } = usePapaParse();
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadFile, setUploadFile] =useState<File | undefined>();
    const [progress, setProgress] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [enableUpload, setEnableUpload] = useState(false);
    const [disableDropZone, setDisableDropZone] = useState(false);
    const BASE_URI = `${API_URL}${API_VERSION1}${CONTROLLER_CSV}`;
    const accept: Accept = {'text/csv': ['.csv']};

    /**
     * ファイル選択ボタンクリックイベント
     */
    const buttonCsvClicked = () => {
        if(inputRef.current){
            inputRef.current.click();
        }

    }

    /**
     * inputのonChangeイベントハンドラー
     * @param e
     */
    const onSelectCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(' ');

        if(e.target.files){
            setUploadFile(e.target.files[0]);
            setProgress('');
            setEnableUpload(true);
            readCsvFile(e.target.files[0]);
        }
    }

    const onSelectCsvFiles = (files: File[]) => {
        setProgress('2');

        if(files){
            setUploadFile(files[0]);
            setProgress('');
            setEnableUpload(true);
            readCsvFile(files[0]);
        }
    }

    /**
     * アップロードボタンクリックイベントハンドラー
     * @param ev
     */
    const onUploadHandler = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        let data = await getFormData();
        if(data){
            setUploading(true);
            await uploadCsvFile(data);
        }
        setUploading(false);
    }

    /**
     * FileをFormDataに変換します
     */
    const getFormData = async (): Promise<undefined | FormData> => {
        if(!uploadFile){
            alert(`ファイルを選択してください`);
            return;
        }
        const formData = new FormData();
        await formData.append('file', uploadFile);

        for (let data of formData.getAll('file'))
            console.log(data);

        return formData;
    }

    /**
     * csvファイルをローカルで読み込み
     */
    const readCsvFile = (file: File): String[][] | undefined => {
        const data = file.text();
        Papa.parse(file, {
            header: true,
            // preview: 0,
            // skipEmptyLines: true,
            complete: (results: ParseResult<String[]>, file: File) => {
                return results.data;
            },
        });
        return;
    }





    /**
     * axios で　csvデータをアップロードします
     * @param formData
     */
    const uploadCsvFile = async (formData: FormData) => {
        try {
            // setProgress('0%');
            setDisableDropZone(true);
            setEnableUpload(false);
            const url = `${BASE_URI}/upload`;
            await axios.post(
                url,
                formData,
                // {
                //     onUploadProgress: (event) => {
                //         setProgress(Math.round((event.loaded * 100) / event.total) + '%');
                //     },
                // }
                )
                .then((response) => {
                    console.log(response.status);
                    if(response.status === 200)
                        setProgress('完了しました');
                    else
                        setProgress('エラーが起きました');
                })
        } catch (error){
            console.log(error);
        } finally {
            setUploadFile(undefined);
            setDisableDropZone(false);
        }
    }



    return(
        <Container maxWidth={'lg'} sx={{ mt: '2rem'}}>
            <div>
                <Typography>
                    アップロードするCSVファイルを選択してください
                </Typography>
            </div>
            <Grid2 container spacing={1}>
                <Grid2 xs={8}>
                    {/* DropZone*/}
                    <Uploader accept={accept}
                              isMultiple={false}
                              maxFiles={1}
                              disabled={disableDropZone}
                              onChange={onSelectCsvFiles}>
                        <p>ファイルをここにドラッグ&ドロップするか、
                        クリックしてファイルを選択してください</p>
                    </Uploader>
                </Grid2>
                <Grid2 xs={4}>
                    <Grid2>
                        <Typography>
                            {uploadFile?.name}
                        </Typography>

                        <Typography>
                            {`${progress}`}
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <LoadingButton
                            onClick={(e) => onUploadHandler(e)}
                            endIcon={<SendIcon/>}
                            disabled={!enableUpload}
                            loading={uploading}
                            loadingPosition={"start"}
                            variant={"contained"}
                        >
                            UPLOAD
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </Grid2>
            {/*<div>*/}
            {/*    /!* input をhiddenにして、ボタンで選択する場合はこちらできるようにしています *!/*/}
            {/*    <input type={"file"}*/}
            {/*           accept={"text/csv"}*/}
            {/*           ref={inputRef}*/}
            {/*           hidden*/}
            {/*           multiple={false}*/}
            {/*           onChange={onSelectCsvFile}/>*/}
            {/*    <Button onClick={buttonCsvClicked}>Select</Button>*/}
            {/*</div>*/}

        </Container>
    )
}

export default BookImport;