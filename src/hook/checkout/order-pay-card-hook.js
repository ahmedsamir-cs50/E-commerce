import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createOrderCard, createOrderCash } from '../../redux/actions/checkoutAction';
import { getOneUserAddress } from '../../redux/actions/userAddressesAction';
import notify from '../useNotifaction';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';

const OrderPayCardHook = (addressDetalis) => {
    const [loading, setLoading] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(true);
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()
    console.log(addressDetalis)
    console.log(cartID)
    //when user click
    const handelCreateOrderCard = async () => {
        console.log("hello card")
        if (cartID === '0') {
            notify("من فضلك اضف منتجات الى العربه اولا", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("من فضلك اختر عنوان اولا", "warn")
            return
        }
        setLoadingCreate(true)
        await dispatch(createOrderCard(cartID,{
            shippingAddress: {
                details: addressDetalis.alias,
                phone: addressDetalis.phone,
                city: "",
                postalCode: ""
            }
        }))
        setLoadingCreate(false)
    }


    //get response for create orser cash
    const resOrserCash = useSelector(state => state.checkoutReducer.createOrderCard)
    useEffect(() => {
        if (loadingCreate === false) {
            if (resOrserCash ) {
                console.log(resOrserCash)
                notify("تم انشاء طلبك بنجاح", "success")
                // setTimeout(() => {
                //     navigate('/user/allorders')
                // }, 1500);
            } else {
                notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
            }
        }
    }, [loadingCreate])


    return [ handelCreateOrderCard]

}

export default OrderPayCardHook