import React,{Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Model extends Component {

    shouldComponentUpdate(newProp,newState){
        return newProp.show!== this.props.show || newProp.children!==this.props.children;
    }

    render(){

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modelClosed}/>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
};

export default Model
