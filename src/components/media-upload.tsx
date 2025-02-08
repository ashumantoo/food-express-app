import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useState } from 'react'
import { mediaUploader } from '@/utils/const';

interface IProgs {
  folderName: string;
  getUploadedMediaUrls: (urls: string[]) => void;
}

export const UploadMedia: FC<IProgs> = ({ folderName, getUploadedMediaUrls }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpload = async () => {
    try {
      setUploading(true);
      const response = await mediaUploader(fileList as RcFile[], folderName);
      if (response) {
        messageApi.success('upload successfully.');
        setFileList([]);
        setUploading(false);
        getUploadedMediaUrls(response);
      }
    } catch (error) {
      console.error(error);
      messageApi.error('upload failed.');
      setUploading(false);
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      {contextHolder}
      <Upload
        {...props}
        multiple={true}
      >
        <button
          className='border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-200'
          type='button'>
          <UploadOutlined />
          Select Image
        </button>
      </Upload>
      <Button
        type='primary'
        onClick={handleUpload}
        disabled={!fileList.length}
        loading={uploading}
        className={`mt-4`}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
}