import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Services from '../components/Services/Services';
import Controls from '../components/Services/Controls/Controls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Services/OrderSummary/OrderSummary';
import axios from '../axios-order';
import Spinner from '../components/UI/Spinner/Spinner';

const PRICEBOOK = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class CustomerPortal extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 0,
        purchasable:false,
        purchasing:false,
        loading:false
    };

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseClosedHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
      //  alert("You have purchase successfully!");
       this.setState({loading:true});
       const order ={
           ingredients:this.state.ingredients,
           totalPrice:this.state.totalPrice,
           customer:{
               name:'Sanjay Sinalkar',
               address:{
                    street:'Test airoli',
                    zipCode:'400708',
                    country:'India'
               },
               email:'test@joister.net'  
           },
           deliveryMethod:'fastest'
       }

       axios.post('orders.json',order)
            .then(response => {
                this.setState({loading:false,purchasing:false});
            })
            .catch(error => {
                this.setState({loading:false,purchasing:false});
            });
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0});
    }

    addIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = PRICEBOOK[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = PRICEBOOK[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseClosedHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        />;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modelClosed={this.purchaseClosedHandler}
                >
                    {orderSummary}
                </Modal>
                <Services ingredients={this.state.ingredients} />
                <Controls 
                ingredientAdded={this.addIngredientsHandler}
                ingredientRemoved={this.removeIngredientsHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default CustomerPortal
