'use strict'

import React from 'react'
import {Button, Popover, Modal, Tooltip, OverlayTrigger} from 'react-bootstrap';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  close = () => {
    this.setState({showModal: false});
  }

  open = () => {
    this.setState({showModal: true});
  }
	
  render() {
    
    return (
      <div>
        </p>hello<p>
      </div>
    );
  }
}

module.exports = AddRecipe
