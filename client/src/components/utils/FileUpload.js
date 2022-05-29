import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';
import Axios from 'axios';

const FileUpload = (props) => {

    const [Images, setImages] = useState([]);

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        // 노드 서버에 선택한 이미지를 저장한다.
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                console.log('디버그',response.data);
                if(response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('이미지를 서버에 저장하는데 실패했습니다.')
                }
            })
    } 

    return (
        <div style={{ display:'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height:'240px', border:'1px solid lightgray', display:'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <UploadOutlined style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

                <div style={{ display: 'flex', width: '350px', height: '240px', overflowX:'scroll' }}>

                    <div>
                        <img />
                    </div>
                </div>
        </div>
    );
};

export default FileUpload;