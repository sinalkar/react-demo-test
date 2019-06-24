import React from 'react';

import classes from './Services.css';
import Service from './Service/Service';


const Services = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <Service key={ igKey + i } type={igKey}/>
        })        
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);

    
    if(transformedIngredients.length ===0){
        transformedIngredients = <p><b>Please add ingredients!</b></p>
    }

    return (
        <div className={classes.Burger}>
            <Service type="bread-top" />
            {transformedIngredients}
            <Service type="bread-bottom"/>
        </div>
    )
}

export default Services
