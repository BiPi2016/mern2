import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';


const instance = Axios.create();

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        instance.get('/users')
        .then( result => {
            this.setState({
                users: result.data,
                userDeleteResult: null
            })
            console.log(this.state.users);
        })
        .catch(err => console.log(err));
    }

    onEdit(id) {
        console.log('Editing ' + id);
    }
    
    onDelete(id) {
        console.log('Deleting ' + id);
        instance.delete(`/users/delete/${id}`)
        .then(result => {
            console.log(result);
            this.setState( prevState => {
                return {
                    users: prevState.users.filter(user => user._id !== id)
                }
            });
            return result.status
        })
        .then(status => {
            if(status === 200)
                alert('User deleted');
        })
        .catch( err => console.log(err))
    }

    render() {
        return(
            <div className="container">
                <h1>Users List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserList
                         users={this.state.users}
                         edit={this.onEdit}
                         delete={this.onDelete} />
                    </tbody>
                </table>    
            </div>
        );
    }
}

const UserList = props => {
    const users = props.users;
    return(
        users.map( (user, index) => {
            return( <tr key={user.username}>
                <th scope="row">{index+1}</th>
                <td>{user.username}</td>
                <td>
                    <Link to='/createUser/'>
                        <button type="button" className="btn btn-link" onClick={() => props.edit(user._id)}>Edit</button>
                    </Link>
                    |
                    <button type="button" className="btn btn-link" onClick={() => props.delete(user._id)}>Delete</button>
                </td>
            </tr>)
        })
    )
}

export default Users;