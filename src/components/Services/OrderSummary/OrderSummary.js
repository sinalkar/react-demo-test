import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const itemSummary = Object.keys(props.ingredients)
    .map(igKey =>{
        return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}</li>
    });
    return (
        <Aux>   
            <h3>Your order</h3>         
            <p>A menu selected as follows</p>
            <ul>{itemSummary}                
            </ul>
            <p><strong> Total Price : {props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinueHandler}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary