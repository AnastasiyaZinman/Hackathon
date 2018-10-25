import React, { Component } from 'react';
import './DeleteForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DeleteForm extends Component {
  render() {
    return (
      <div className="delete-form">
        <div>Are you sure you want to delete record? </div>
        <div>
          <button>Send</button>
        </div>
      </div>
    )
  }
}

export default DeleteForm;

