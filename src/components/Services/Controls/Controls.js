import React from 'react';

import classes from './Controls.css';
import Control from './Control/Control';

const  controls_arr = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]

const Controls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p><b>Current Price {props.price.toFixed(2)}</b></p>
            {controls_arr.map(ctrl=>(
                    <Control 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]}
                    />    
                ))}
             <button disabled={!props.purchasable} onClick={props.ordered} className={classes.OrderButton}>Order Now</button>   
        </div>
    )
}

export default Controls;
