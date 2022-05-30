import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Form, message, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;


const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
]

const UploadProductPage = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);

    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        console.log('newImages', newImages)
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
            return alert('모든 항목을 작성해주세요.')
        }

        const variables = {
            writer: user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            continents: ContinentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if(response.data.success) {
                    alert('상품이 성공적으로 업로드되었습니다.')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else {
                    alert('상품을 업로드하는데 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'5rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom:'2rem' }}>
                <Title level={2}> Upload Travel Product </Title>
            </div>
            
            <Form onSubmit={onSubmit}>

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <select onChange={onContinentsSelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;