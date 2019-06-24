import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Services from '../components/Services/Services';
import Controls from '../components/Services/Controls/Controls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Services/OrderSummary/OrderSummary';

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
        purchasing:false
    };

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseClosedHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        alert("You have purchase successfully!");
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

        return (
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modelClosed={this.purchaseClosedHandler}
                ><OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseClosedHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                /></Modal>
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
