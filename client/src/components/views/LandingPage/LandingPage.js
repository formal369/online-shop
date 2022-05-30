import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Card } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

const LandingPage = () => {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)


    useEffect(() =>{

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)

    }, [])

    const renderCards = Products.map((product, index) => {
        console.log('product', product.title)
        console.log('Products', Products)
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if(response.data.success) {
                    if(variables.loadMore) {
                        setProducts([...Products, response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    console.log(response.data.products)
                } else {
                    alert('데이터를 가져오는데 실패했습니다.')
                }
            })
    }


    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(variables)
        setSkip(skip)
        
    }

    return (
        <div style={{ width: '75%', margin: '5rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2> Let's Travel Anywhere <GlobalOutlined /> </h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {Products.length === 0 ? 
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> 
                    :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }

            <br /><br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={onLoadMore}>Load more</button>
            </div>
        </div>
    );
};

export default LandingPage;