import { CREATE_ORDER_CARD, CREATE_ORDER_CASH } from '../type'
import { useGetData } from '../../hooks/useGetData'
import { useInsertData, useInsertDataWithImage } from '../../hooks/useInsertData'


//create order cash fro user
export const createOrderCash = (id, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/orders/${id}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CASH,
            payload: e.response,
        })
    }
}
export const createOrderCard = (id, body) => async (dispatch) => {
    try {
        console.log(body)
        const response = await useInsertData(`/api/v1/orders/checkout-session/${id}`, body);
        console.log(response)
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_CARD,
            payload: e.response,
        })
    }
}
