import {API_URL, API_VERSION1, CONTROLLER_CSV} from "../../constant/HostData";
import React, {forwardRef, useRef, useState} from "react";
import axios from "axios";
import {Box, Button, FormControl, Input, InputLabel, Typography} from "@mui/material";

const BASE_URI = `${API_URL}${API_VERSION1}${CONTROLLER_CSV}`

interface HiddenInputProps {
    onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CsvInput = forwardRef<HTMLInputElement, HiddenInputProps>(
    ({ onFileInputChange }, inputRef) => {
        return (
            <input
                ref={inputRef}
                type={"file"}
                accept={"text/csv"}
                onChange={onFileInputChange}
            />
        );
    }
);

export const BookImport = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadFile, setUploadFile] =useState<File | undefined>();
    const [progress, setProgress] = useState<number | string>('');
    const [uploading, setUploading] = useState(false);
    const [enableUpload, setEnableUpload] = useState(false);

    /**
     * ファイル選択ボタンクリックイベント
     */
    const buttonCsvClicked = () => {
        if(inputRef.current)
            inputRef.current.click();
    }

    /**
     * inputのonChangeイベントハンドラー
     * @param e
     */
    const onSelectCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setUploadFile(e.target.files[0]);
            setEnableUpload(true);
        }

    }

    /**
     * アップロードボタンクリックイベントハンドラー
     * @param ev
     */
    const onUploadHandler = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        let data = await getFormData();
        if(data)
            await uploadCsvFile(data);
    }

    /**
     * FileをFormDataに変換します
     */
    const getFormData = async (): Promise<undefined | FormData> => {
        if(!uploadFile){
            alert(`ファイルを入力してください`);
            return;
        }
        const formData = new FormData();
        await formData.append('file', uploadFile);

        return formData;
    }

    /**
     * axios で　csvデータをアップロードします
     * @param formData
     */
    const uploadCsvFile = async (formData: FormData) => {
        try {
            setProgress('0%');
            setEnableUpload(false);
            const url = `${BASE_URI}/upload`;
            await axios.post(
                url,
                formData,
                {
                    onUploadProgress: (event) => {
                        setProgress(Math.round((event.loaded * 100) / event.total) + '%');
                    },
                })
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
            // setPercent('');
        }
    }


    return(
        <>
            <Typography>
                アップロードするCSVファイルを入力してください
            </Typography>
            {/* input をhiddenにして、ボタンで登録できるようにしています */}
            <input type={"file"}
                   accept={"text/csv"}
                   ref={inputRef}
                   hidden
                   onChange={onSelectCsvFile}
            />
            <Button onClick={buttonCsvClicked}>Select</Button>
            <Typography>
                {uploadFile?.name}
            </Typography>
            <Button
                onClick={(e) => onUploadHandler(e)}
                disabled={!enableUpload}
            >
                Upload
            </Button>
            <Typography>
                {`${progress}`}
            </Typography>
        </>
    )
}

export default BookImport;