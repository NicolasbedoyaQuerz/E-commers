import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        setFavorites : (state, action) => {
            return action.payload
        }
    }
})

export const getFavoritesThunk = () => dispatch => {

    axios
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then(resp => dispatch(setFavorites(resp.data)))
        .catch( error => console.error(error))
}

export const createProductThunk = data => dispatch => {

    axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
        .then( () => dispatch( getFavoritesThunk()))
        .catch( error => console.error(error))
}

export const cartCheckoutThunk = () => dispatch => {

    axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {} ,getConfig())
        .then( () => dispatch( getFavoritesThunk()))
        .catch(error => {if(error.response?.status === 403){
            alert('Ya esta Agregado al Carrito De Compras')
        }else{
            console.log(error.response?.data);
        }
    })
}

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
