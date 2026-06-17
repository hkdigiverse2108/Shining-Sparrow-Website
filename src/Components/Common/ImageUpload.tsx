import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface ImageUploadProps {
    fileList: UploadFile[];
    onChange: (fileList: UploadFile[]) => void;
    limit?: number;
    listType?: 'picture-card' | 'picture-circle';
    action?: string;
    beforeUpload?: (file: FileType) => boolean | Promise<void | boolean>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    fileList,
    onChange,
    limit = 8,
    listType = "picture-circle",
    action,
    beforeUpload
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        onChange(newFileList);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div className="common-image-upload">
            <Upload
                action={action}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                {fileList.length >= limit ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    styles={{ root: { display: 'none' } }}
                    preview={{
                        open: previewOpen,
                        onOpenChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default ImageUpload;
