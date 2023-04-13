import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products.slice'
import isLoading from './slices/isLoading.slice'
import favorites from './slices/favorite.slice'


export default configureStore({
    reducer: {
        products,
        isLoading,
        favorites
    }
})
