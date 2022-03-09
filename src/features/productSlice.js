import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'currentProduct',
    initialState : {
        currentProduct : null
    },
    reducers: {
        selectProduct : (state,action) => {
            state.currentProduct = action.payload
        },
        resetProduct : (state) => {
            state.currentProduct = null;
        }
    }
});

export const {selectProduct} = productSlice.actions
export const currentProduct = state => state.product.currentProduct;
export default productSlice.reducer;


