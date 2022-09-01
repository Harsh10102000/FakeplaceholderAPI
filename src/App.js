
import React , { Component  } from 'react';

import './App.css';

// import FormControl from './components/FormControl';

class App extends Component() {

 constructor(props){
  super(props)
  this.state = {
    users : [],   //here we setting up default value
    isLoading : false ,
    isError : false  // If there is any error by default its false
  }
 }

   // Async Function to get a request from an API
   async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    // console.log(response)
    if (response.ok) { //Ok is property if it true then if condition follow otherwise else
      const users = await response.json()
      //console.log(users)
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }
  
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }

  renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.address.street}, ${user.address.city}`}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>
        </tr>
      )
    })
  }

  render(){
    const { users, isLoading, isError } = this.state
 
    if (isLoading) {
      return <div>Loading...</div>
    }
 
    if (isError) {
      return <div>Error</div>
    }
 
    return users.length > 0
      ? (
        <table>
          <thead>
            <tr>
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }

}


export default App;
