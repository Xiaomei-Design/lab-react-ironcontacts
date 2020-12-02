import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json'


export default class App extends Component {

  state = {
    initialContacts: contacts.slice(0, 5),
  }

  addRandomContact = () => {
    const randomContact = contacts[Math.floor(Math.random()*contacts.length)]
    console.log('hahaha')
    // const newContact = this.state.initialContacts.push(randomContact)
    this.setState((state,props) => ({
      initialContacts: state.initialContacts.concat(randomContact)
    }))
  }

  sortByName = () => {
    this.setState((state, props) => ({
      initialContacts: state.initialContacts.sort((a, b) => 
        (a.name > b.name) ? 1: ((b.name > a.name) ? -1 : 0)
      )
      })) 
    console.log(this.state.initialContacts)
  }

  sortByPopularity = () => {
    this.setState((state, props) => ({
      initialContacts: state.initialContacts.sort((a, b) => 
        (a.popularity > b.popularity) ? 1: ((b.popularity > a.popularity) ? -1 : 0)
      )
      })) 
  }

  removeContact = (event) => {
    console.log(event.target.parentElement.parentElement.getAttribute('data-key'))
    const array = [...this.state.initialContacts];
    const index = array.indexOf(event.target.parentElement.parentElement.getAttribute('data-key'));
    
    if (index !== -1) {
      array.splice(index, 1)
      this.setState((state,props) => ({
          initialContacts: state.array
        }))
    }
    // this.setState((state,props) => ({
    //   initialContacts: state.initialContacts.filter(item => item.id !== deleteContactId)
    // }))
  }

  // removePeople(e) {
  //   var array = [...this.state.people]; // make a separate copy of the array
  //   var index = array.indexOf(e.target.value)
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //     this.setState({people: array});
  //   }
  // },

  render() {
    // console.log(this.state.initialContacts)
    return (
      <div className="App">
      <h1>IronContacts</h1>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
              <thead>
                  <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Popularity</th>
                  </tr>
              </thead>
              <tbody>
                {
                  this.state.initialContacts.map((contact) => {
                    return (
                      <tr key={contact.id} data-key={contact.id}>
                        <td><img src={contact.pictureUrl} alt="" style={{width:'60px'}}/></td>
                        <td>{contact.name}</td>
                        <td>{Math.round(contact.popularity*100)/100}</td>
                        <td><button type="button" onClick={this.removeContact}>Delete</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
      </div>
    )
  }
}