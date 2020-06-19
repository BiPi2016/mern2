import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ExcerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            excercises: []
        };
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/excercises')    
        .then( response => response.data)
        .then(data => this.setState({
            excercises: data
        }))
        .catch(err => console.log(err));
    }

    onEdit = id => {
        console.log('To be edited ' + id);
    };

    onDelete = id => {
        console.log('To be deleted ' + id);
        axios.delete('http://localhost:4000/excercises/delete/'+id)
        .then(response => console.log(response))
        .catch(err => console.log(err));
        this.setState(prevState => {
            return {
                excercises: prevState.excercises.filter(ex => ex._id !== id)
            }
        })
    };

    render() {
        return(
            <div className="container">
                <h1>Logged excercises</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">User</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Date</th>
                        <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                         {this.state.excercises.map((ex, index) => <Excercise 
                            excercise = {ex} 
                            key={ex+index}
                            edit={this.onEdit}
                            delete={this.onDelete} />)}                       
                    </tbody>
                </table>
            </div>
        );
    }
}

const Excercise = props => {
    const excercise = props.excercise;
    return (
        <tr>
            <th scope="row">{excercise.username}</th>
            <td>{excercise.description}</td>
            <td>{excercise.duration}</td>
            <td>{excercise.date}</td>
            <td>
                <button type="button" className="btn btn-link" onClick={() => props.edit(excercise._id)}>Edit</button>
                |
                <button type="button" className="btn btn-link" onClick={() => props.delete(excercise._id)}>Delete</button>
            </td>
        </tr>
    )
};

export default ExcerciseList;

