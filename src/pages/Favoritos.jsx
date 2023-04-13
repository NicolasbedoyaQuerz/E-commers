import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import Card from 'react-bootstrap/Card';

const Favoritos = () => {

    const [compras, setCompras] = useState([])

    useEffect(() => {

        axios
            .get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
            .then(resp => setCompras(resp.data))
            .catch( error => console.error(error))
    }, [])

    return (
        <div>
            <h1>Historial de Compras</h1>
            {
                compras.map(item => (
                    <Card key={item.id} style={{width: '100%', display: "flex", flexDirection : "row", marginTop: '20px' }}>
                    <Card.Img  style={{width: 200}} variant="left" src={item.product.images?.[0].url} />
                    <Card.Body>
                        <Card.Title>{item.product.title}</Card.Title>
                        <Card.Text>
                            {item.product.description}
                        </Card.Text>
                        <Card.Text>
                            {item.product.price}
                        </Card.Text>
                        <Card.Text>
                            {item.product.brand}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
};

export default Favoritos;