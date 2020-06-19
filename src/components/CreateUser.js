import React from 'react';
import Axios from 'axios';

import {baseURL} from '../util/constants';

const instance = Axios.create({
    baseURL: baseURL
});

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userCreatedMsg: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
    }

    onUsernameChange(e) {
        this.setState({ username: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('submiting');
        const newUser = {
            username: this.state.username
        }
        console.log(newUser);
        instance.post('/users/add', newUser)
        .then(result => {
            console.log(result.data);
            if(result.status == 200) {
                this.setState({
                    userCreatedMsg: true,
                    username: ''
                });
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        let success = null;
        if(this.state.userCreatedMsg) {
            success = 'User created'
        }
        return(
            <div className="container">
                <h1>Create a new user</h1>
                <h3>{success}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                         type="text" 
                         className="form-control" 
                         id="username" 
                         value={this.state.username}    
                         onChange={this.onUsernameChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default CreateUser;