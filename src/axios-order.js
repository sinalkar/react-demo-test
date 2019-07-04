import axios from 'axios';

const instance  = axios.create({
    baseURL :'https://react-my-burger-jipl.firebaseio.com/'
});

export default instance;