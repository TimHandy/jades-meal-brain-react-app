/*
This file renders an input text box and updates the state on the parent component defined in app.jsx on every keypress
*/

'use strict'

import React from 'react'
import {
  Button,
  Panel,
  Accordion,
  Popover,
  Modal,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      editIdx: 0
    }
  }

  close = () => {
    this.setState({showModal: false});
  }

  open = (idx) => {
    this.setState({showModal: true, editIdx: idx})
  }

  store = (name, ingredients) => {
    this.setState({name: name, ingredients: ingredients})
  }

  list = () => {

    const list = this
      .props
      .recipe
      .map((recipe, idx) => {
        return (
          <Panel eventKey={idx} key={idx} header={recipe.name}>
            <h3 className="text-center">Ingredients</h3>
            {recipe
              .ingredients
              .map((ingredient, idx) => {
                return <li className="list-group-item" key={idx}>{ingredient}</li>
              })}
            <br/>
            <button className='btn btn-primary' onClick={() => this.open(idx)}>Edit Recipe</button>
            <button className='btn btn-danger' onClick={() => this.props.deleteRecipe(idx)}>Delete Recipe</button>
          </Panel>
        )
      })

    return list
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    const rVal = this.props.recipe.length === 0 || this.props.recipe.length === undefined
      ? 'enter value'
      : [
        this.props.recipe[this.state.editIdx].name,
        this.props.recipe[this.state.editIdx].ingredients
      ]

    return (
      <div>
        <Accordion>
          {this.list()}
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p>Recipe name</p><input id='name' defaultValue={rVal[0]} onChange={this.props.handleChange}/>
                <p>Recipe ingredients</p><textarea
                  id='ingredients'
                  defaultValue={rVal[1]}
                  onChange={this.props.handleChange}/><br/>
                <button
                  className='btn btn-primary'
                  onClick={() => this.props.editRecipe(this.state.editIdx)}>Apply Edit</button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Accordion>
      </div>
    );
  }
}

module.exports = RecipeList
