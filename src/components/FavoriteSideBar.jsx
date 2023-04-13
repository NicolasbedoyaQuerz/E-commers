import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getFavoritesThunk, cartCheckoutThunk } from '../store/slices/favorite.slice';

const FavoriteSideBar = ({ show, handleClose}) => {

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const token =  localStorage.getItem('token')
    const [ counter, setCounter] = useState(1)

    useEffect(() => {
        if(token){
            dispatch(getFavoritesThunk())
        }
    }, [])



    return (
        <div>
             <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Productos Favoritos</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {
                            favorites.map( item => (
                                <li key={ item.product.id} style={{ border: '1px solid grey', marginBottom: '1rem'}}>
                                    <h5> {item.product?.title}</h5>
                                    <img src={item.product?.images?.[0].url} alt=""  style={{ width: 80, objectFit: 'contain'}}/>
                                    <Button  onClick={() => setCounter( counter + 1 )}>+</Button >
                                        { counter}
                                    <Button onClick={() => {
                                        if( counter > 1){
                                            setCounter( counter - 1 )
                                        }
                                        }}>-</Button>
                                </li>
                            ))
                        }
                    </ul>
                    <Button onClick={ () => dispatch(cartCheckoutThunk())}> Comprar</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default FavoriteSideBar;