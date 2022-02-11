import React, {useState} from "react";
import {Upload, Button, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {url} from "../../../../config/config";
import { InboxOutlined } from '@ant-design/icons';
import {UploadFile} from "antd/lib/upload/interface";

const { Dragger } = Upload;

const props = {
    name: 'audio',
    multiple: false,
    action: `${url}/api/files/audio-upload`,
    maxCount: 1,
    beforeUpload: (file: UploadFile) => {
                    const isMP3 = file.type === "audio/mpeg";
                    if (!isMP3) {
                        message.error(`${file.name} is not a mp3 file`);
                    }
                    return isMP3 || Upload.LIST_IGNORE;
                },
    onChange(info: { file: UploadFile; fileList: any; }) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e: { dataTransfer: { files: any; }; }) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export function UploadAudioPage() {
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            </p>
        </Dragger>
    );
}
