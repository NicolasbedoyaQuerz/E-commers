import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import { createProductThunk } from "../store/slices/favorite.slice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {

    const {id} = useParams()
    const [ detail, setDetail] = useState({})
    const [ counter, setCounter] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(resp => setDetail(resp.data))
            .catch(error => console.error(error))
    }, [])

    const addProducts = () => {
        const data = {
            quantity: counter,
            productId: id
        }
        dispatch(createProductThunk(data))
    }

    return (
        <Container>
            <Row>
                <h1>{detail.title}</h1>
                <p> {detail.description} </p>
                <p> {detail.price} </p>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button onClick={() => setCounter( counter + 1 )}>+</Button>
                        { counter}
                    <Button onClick={() => {
                        if( counter > 1){
                            setCounter( counter - 1 )
                        }
                        }}>-</Button>
                </Col>
                <Col>
                    <Button onClick={ addProducts}>Agregar Al Carrito</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={9}>
                    <img src={detail.images?.[0].url} alt="" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;