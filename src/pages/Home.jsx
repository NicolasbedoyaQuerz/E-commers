import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk} from '../store/slices/products.slice'
import { useEffect, useState } from 'react';
import axios from 'axios';




const Home = () => {

    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios
            .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(resp => setCategories(resp.data))
            .catch(error => console.error(error))   
    }, [])


    return (
        <div>
            <Container>
                <Row className='py=3'>
                    {
                        categories.map(category => (
                            <Col key={category.id}>
                                <Button className='w-100' onClick={() => dispatch(filterCategoriesThunk(category.id))}>{category.name}</Button>
                            </Col>
                        ))
                    }
                   
                </Row>
                <Row xs={1} md={2} lg={3} className='py-3'>
                    {
                        products.map( items => (
                            <Col key={ items.id}> <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={items.images[0]?.url} 
                                style={{height:200, objectFit:'cover'}}
                                />
                                <Card.Body>
                                    <Card.Title> {items.title} </Card.Title>
                                    <Card.Text >
                                    {items.description}
                                    </Card.Text>
                                    <Card.Text>
                                    {items.price}
                                    </Card.Text>
                                    <Card.Text>
                                    {items.brand}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                   
                </Row>
            </Container>
        </div>
    );
};

export default Home;