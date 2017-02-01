'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './css/styles.scss'
import AddRecipe from 'AddRecipe'
import RecipeList from 'RecipeList'
import {Button, Popover, Modal, Tooltip, OverlayTrigger} from 'react-bootstrap'
import Header from './components/Header'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: [], //[{name:'', ingredients:[]}],
            name: '',
            ingredients: ''
        }
    }

    componentDidMount() {   
        this.getData()
    }

    // Retrieve data from localStorage
    getData = (callback) => {
        const str = localStorage.getItem('recipeBox')
        const jsonData = JSON.parse(str)
        if (jsonData) {
            this.setState({store: jsonData})
        }

        if (callback) {
            callback()
        }
    }

    // Save data to Local Storage
    saveData = (store) => {
        const str = JSON.stringify(this.state.store)
        localStorage.setItem('recipeBox', str) //setItem and getItem are pretty much all you can do with localStorage
        //console.log('saved to localStorage')
        // TODO: add error handling, like pass back a return val and throw an error if unable to save
    }
    // counter = () => {
    //     let vl = 0
    //     return val+1}
    submitRecipe = () => {
        const name = this.state.name
        const ingredientsAry = this.state.ingredients.split(',')
        const newRecipe = {
            name: name,
            ingredients: ingredientsAry
        }

        if(name !== '' && ingredientsAry !== []) {
            this.setState({
                // if(counter() === 1) {
                //     this.state.store.splice(0,1)
                // }
                store: this.state.store.concat(newRecipe)
            }, function() {
                this.saveData(this.state.store)
            })
        }
        //{name: 'namof recipe', ingredients; 'tomatoes}
    }

    editRecipe = (index) => {
        console.log(index)
        const name = this.state.name
        const ingredientsAry = this.state.ingredients.split(',')
        //console.log(ingredientsAry);
        const updatedRecipe = {
            name: name,
            ingredients: ingredientsAry
        }
        const updatedStore = Object.assign([], this.state.store)
        updatedStore[index] = updatedRecipe
        if(name !== '' || ingredientsAry !== []) {
            this.setState({
                store: updatedStore
            }, function() {
                this.saveData(this.state.store)
            })
        }
    }

    deleteRecipe = (ref) => {
      const updatedStore = [...this.state.store.slice(0, ref), ...this.state.store.slice(ref + 1)];
      this.setState ({
        store: updatedStore
      }, function() {
        this.saveData(this.state.store)
      })
    }

    handleChange = (event) => {
        const newState = {}; 
        newState[event.target.id] = event.target.value; 
        this.setState(newState);
    }

    render() {
        return (
           <Header />
        )
    }
}

// ReactDOM.render(
//     <App/>, document.getElementById('app'))

module.exports = App