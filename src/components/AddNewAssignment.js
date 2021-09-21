import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import TextField from '@material-ui/core/TextField';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

//  required properties -  assignment
//  
//  NOTE: because AddNewAssignment is invoked via <Route> in App.js  
//  props are accessed via props.location 
class AddNewAssignment extends Component {
    constructor(props) {
      super(props);
      this.state = { courseId:0, name:'', date:'' };
    } 
	
	handleIdChange = (event) => {
	  this.setState( {courseId: event.target.value});
	}
	
	handleNameChange = (event) => {
	  this.setState({name: event.target.value});
	}
	
	handleDateChange = (event) => {
      this.setState({date: event.target.value});
    }
  
   // when submit button pressed, send new assignment data to server
   handleSubmit = ( ) => {
      console.log(".handleSubmit");
	  const token = Cookies.get('XSRF-TOKEN');
	  this.courseId = parseInt(this.courseId);
	  
	  ///?courseId=999001&name=Super Special Assignment 2&due=2021-09-09
      fetch(`${SERVER_URL}/gradebook/?courseId=${this.state.courseId}&name=${this.state.name}&due=${this.state.date}` , 
          {  
          method: 'POST', 
          headers: { 'X-XSRF-TOKEN': token }
		} )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment successfully added.", {
            position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Assignment update failed. Please check your given information!", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);
      }})
        .catch(err => {
          toast.error("Assignment update failed. Please check your given information!", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
   };        
      
 
    render() {
      
        return(
      <div className='App' aligh='left'>
			  <div>
          <TextField autoFocus fullWidth label="Course Id" name="course_id" onChange={this.handleIdChange}/>
				  <TextField autoFocus fullWidth label="Assignment Name" name="name" onChange={this.handleNameChange}/>
				  <TextField autoFocus fullWidth label="Due Date (in YYYY-MM-DD form)" name="date" onChange={this.handleDateChange}/>
				  <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
			  </div>
        <ToastContainer autoClose={1500} /> 
      </div>



            ); 
        };
}

AddNewAssignment.propTypes = {
  AddNewAssignment : PropTypes.func.isRequired
}

export default AddNewAssignment;