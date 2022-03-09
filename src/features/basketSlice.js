
export default (state = {basket : []}, { type, payload }) => {
    switch (type) {
    case 'FILL__BASKET':
        const ifObjExists = state.basket.some(el => el.id === payload.id);
        if(!ifObjExists){
            return { ...state,
                basket : [
                ...state.basket, payload
            ]};
        }
        return {basket : [...state.basket]}
    case 'CLEAR__BASKET':
        return { 
            basket : []
        }
    case 'REMOVE__BASKET__ITEMS':
        return {
            ...state,
            basket : state.basket.filter(el => el.id !== payload.id)
        }
    case 'UPDATE__BASKET__QTY':
        return {
            ...state,
            basket : state.basket.map(el => {
                if(el.id === payload.id){
                    return {...el, quantity : payload.quantity}
                }
                return {...el}
            })
        }
    default:
        return state
    }
}

export const fillBasket = (payload) => {
    return {
        type : 'FILL__BASKET',
        payload
    }
}