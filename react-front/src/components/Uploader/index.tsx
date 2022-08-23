import {ReactNode, useCallback, useMemo} from "react";
import {Accept, useDropzone} from "react-dropzone";
import {Box, Button, Container} from "@mui/material";

const baseStyle = {

    width: 104,
    height: 104,
};
const borderNormalStyle = {
    border: "1px solid #00f",
};
const borderDragStyle = {
    border: "2px solid #00f",
    // transition: 'border .5s ease-in-out',
    // padding: '1px'
};

type UploaderPropsType = {
    onChange: (files: File[]) => void;
    isMultiple: boolean;
    children?: ReactNode;
    accept: Accept;
    maxFiles: number;
    disabled: boolean;
}

export const Uploader = (props: UploaderPropsType) => {

    const onDrop = useCallback((droppedFiles: File[]) => {
        props.onChange(droppedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            multiple: props.isMultiple,
            onDrop,
            accept: props.accept,
            maxFiles: props.maxFiles,
            disabled: props.disabled,
        }
    )

    const style = useMemo(() => (
        {...(isDragActive ? borderDragStyle : borderNormalStyle)}
    ), [isDragActive]);

    return(
        <div >
            <div {...getRootProps({style})}>
                {/* ※ ...getInputPropsに()をつけるとinput fieldが消えます。()ないとinput fieldが出てくる*/}
                <input {...getInputProps()} />
                {props.children}
            </div>
        </div>
    )
}