import React,{ Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

   componentWillUpdate(){
       console.log("componentWillUpdate Update");
   } 

   render(){
    const itemSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
        return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
    });
    return (
        <Aux>   
            <h3>Your order</h3>         
            <p>A menu selected as follows</p>
            <ul>{itemSummary}                
            </ul>
            <p><strong> Total Price : {this.props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>Continue</Button>
        </Aux>
    )
   }
}; 

// const OrderSummary = (props) => {
//     const itemSummary = Object.keys(this.props.ingredients)
//     .map(igKey =>{
//         return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
//     });
//     return (
//         <Aux>   
//             <h3>Your order</h3>         
//             <p>A menu selected as follows</p>
//             <ul>{itemSummary}                
//             </ul>
//             <p><strong> Total Price : {this.props.price.toFixed(2)} </strong></p>
//             <p>Continue to checkout ?</p>
//             <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
//             <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>Continue</Button>
//         </Aux>
//     )
// }

export default OrderSummary
