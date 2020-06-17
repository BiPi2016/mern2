import React from 'react';
import Axios from 'axios';

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

class CreateExcercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [ ],
            username: '',
            description: '',
            duration: 0,
            date: new Date()
        };
        this.onUserChange = this.onUserChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
        Axios.get('http://localhost:4000/users')
        .then(response => response.data)
        .then( data => this.setState({
            users: data.length > 0 ? data : ['No user found'],
            username: data[0].username
        }))
        .catch(err => console.log(err));
    }

    

    onUserChange(e) {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        });        
    }
    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }
    onDurationChange(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onDateChange(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const excercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        Axios.post('http://localhost:4000/excercises/add', excercise)
        .then( response => {
            console.log(response.data);
            window.location = '/';
            return(response.data);
        })
        .catch( err => console.log(err));
    }

    render() {
        return(
            <div className="container">
                <h1>Create a new excercise log</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="selectUser">User</label>
                        <select 
                         required
                         className="form-control" 
                         id="selectUser"
                         value={this.state.username}
                         onChange={this.onUserChange}>
                            {this.state.users.map( user => <option 
                             key={user.username}
                             value={user.username}>
                                {user.username}
                            </option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" 
                        required
                        className="form-control" 
                        id="description" 
                        value={this.state.description}
                        onChange={this.onDescriptionChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration <small id="duration" className="text-muted">(In minutes)</small></label>
                        <input 
                         required
                         type="number" 
                         className="form-control" 
                         id="duration" 
                         value={this.state.duration}
                         onChange={this.onDurationChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <br />
                        <DatePicker 
                         className="form-control" 
                         id="date" 
                         onChange={this.onDateChange}
                         selected = {this.state.date} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}


export default CreateExcercise;