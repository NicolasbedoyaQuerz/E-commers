import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoriesThunk, filterProductThunk} from '../store/slices/products.slice'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';




const Home = () => {

    const [categories, setCategories] = useState([])
    const [ inputSearch, setInputSearch] = useState('')
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
                    <Col>
                        <Button 
                        className='w-100'
                        onClick={() => dispatch(getProductsThunk())}
                        > 
                        All Products
                        </Button>
                    </Col>        
                </Row>
                <Row className='py-3'>
                    <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Buscar Productos"
                        aria-label="Product name"
                        aria-describedby="basic-addon2"
                        value={ inputSearch}
                        onChange={ e => setInputSearch(e.target.value)}
                        />
                        <Button 
                        variant="outline-secondary" 
                        id="button-addon2"
                        onClick={ () => dispatch(filterProductThunk(inputSearch))}
                        >
                        Search
                        </Button>
                    </InputGroup>
                    </Col>
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
                                    <Button as={Link} to={`/ProductDetail/${items.id}`} variant="primary">Ver Detalle</Button>
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