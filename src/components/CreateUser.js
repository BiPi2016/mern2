import React from 'react';
import Axios from 'axios';
import { baseURL } from '../util/constants';
import {baseURL} from '../util/constants';

const instance = Axios.create({
    baseURL: baseURL
});

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

    }

    render() {
        return(
            <div>
            </div>
        );
    }
}

export default CreateUser;