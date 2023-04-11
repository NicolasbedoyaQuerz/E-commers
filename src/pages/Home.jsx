import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/Products.slice';
import { useEffect } from 'react';


const Home = () => {


    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    return (
        <div>
            <Container>
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