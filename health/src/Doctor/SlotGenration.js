import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'
import DoctorHeader from "../DoctorHeader";
import axios, { post } from 'axios';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Redirect, withRouter } from 'react-router';
const moment = require('moment');

class SlotGenration extends Component{

  constructor(props){
    super(props);

    this.state = {
      startDate : null,
      endDate : null,
      openingTime: null,
      closingTime: null,
      appointmentGap : 15,
      disable : false,
    }
    this.handleOpeningTime = this.handleOpeningTime.bind(this);
    this.handleClosingTime = this.handleClosingTime.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);

  //   var pwd = 'ss';
  //     fetch(`http://localhost:8088/login/${this.props.loggin}/${pwd}`)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ doctorID : responseJson.id});
  //  })


  };
    
    handleOpeningTime(event, time){
      this.setState({openingTime: time})
    };

    handleClosingTime(event, time){
      this.setState({closingTime: time})
    };

    handleStartDateChange(event, date) {
      this.setState({startDate:date});
    }

    handleEndDateChange(event, date) {
      this.setState({endDate:date});
    }
  
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    continue = e =>{
     
      const {startDate, endDate, openingTime, closingTime, appointmentGap} = this.state; 
        var errorCount=0
        if(startDate === undefined || startDate === null){
          this.setState({
            startDate_error_text : "Opening time should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            startDate_error_text : null
          })
        }
        if(endDate === undefined || endDate === null){
          this.setState({
            endDate_error_text : "Opening time should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            endDate_error_text : null
          })
        }
        
        if(moment(startDate).format('MMM DD YYYY') < moment(new Date()).format('MMM DD YYYY')) {
          this.setState({
            startDate_error_text : "Invalid Start Date"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            startDate_error_text : null
          })
        } 
        
        if(startDate === undefined || startDate === null){
          this.setState({
            startDate_error_text : "Start Date should not be emprt"
          })
          errorCount = errorCount +1;
        }/*else if(moment(startDate).format('MMM DD YYYY') < moment(new Date()).format('MMM DD YYYY')) {
          this.setState({
            startDate_error_text : "Invalid Start Date"
          })
          errorCount = errorCount +1;
        }else if(moment(startDate).format('MMM DD YYYY') > moment(endDate).format('MMM DD YYYY')) {
          this.setState({
            startDate_error_text : "Invalid Start Date"
          })
          errorCount = errorCount +1;
        }*/else{  
          this.setState({
            startDate_error_text : null
          })
        }
        
        if(endDate === undefined || endDate === null){
          this.setState({
            endDate_error_text : "End Date should not be emprt"
          })
          errorCount = errorCount +1;
        }/*else if(moment(endDate).format('MMM DD YYYY') < moment(new Date()).format('MMM DD YYYY')) {
          this.setState({
            endDate_error_text : "Invalid End Date"
          })
          errorCount = errorCount +1;
        }else if(moment(endDate).format('MMM DD YYYY') < moment(startDate).format('MMM DD YYYY')) {
          this.setState({
            endDate_error_text : "Invalid End Date"
          })
          errorCount = errorCount +1;
        }*/else{  
          this.setState({
            endDate_error_text : null
          })
        }
        
        if(openingTime === undefined || openingTime === null){
          this.setState({
            openingTime_error_text : "Opening time should not be empty"
          })
          errorCount = errorCount +1;
        }/*else if(moment(closingTime).isBefore(openingTime)){
          this.setState({
            openingTime_error_text : "Invalid Opening time"
          })
          errorCount = errorCount +1;
        }else if(moment(openingTime).format("HH:mm:ss").isBefore(moment().format("HH:mm:ss")/){
          this.setState({
            openingTime_error_text : "Invalid Opening time"
          })
          errorCount = errorCount +1;
        }*/else{
          console.log(moment(openingTime).format("HH:mm:ss"))
          console.log(moment().format("HH:mm:ss"))
          this.setState({
            openingTime_error_text : null
          })
        }

        if(closingTime === undefined || closingTime === null){
          this.setState({
            closingTime_error_text : "Closing time should not be empty"
          })
          errorCount = errorCount +1;
        }/*else if(moment(closingTime).format("HH:mm:ss").isBefore(moment().format("HH:mm:ss"))){
          this.setState({
            closingTime_error_text : "Invalid Closing time"
          })
          errorCount = errorCount +1;
        }*/else if(moment(openingTime).isAfter(closingTime)){
          this.setState({
            closingTime_error_text : "Invalid Closing time"
          })
          errorCount = errorCount +1;
        }else{  
          console.log(moment(closingTime).format("HH:mm:ss"))
          console.log(moment().format("HH:mm:ss"))
          this.setState({
            closingTime_error_text : null
          })
        }

        if(appointmentGap === undefined || appointmentGap === null){
          this.setState({
            appointmentGap_error_text : "Appointment Gap should not be empty"
          })
          errorCount = errorCount +1;
        }else if(appointmentGap < 15){
          this.setState({
            appointmentGap_error_text : "Appointment Gap should not be less than 15 mins"
          })
          errorCount = errorCount +1;
        }
        else{  
          this.setState({
            appointmentGap_error_text : null
          })
        }
        
        if(errorCount == 0)
        {
         var doctor =  this.fileUpload(startDate, endDate, openingTime, closingTime, appointmentGap)
          /*
          if(doctor != null)
          {
            this.setState({
              startDate : null,
              endDate : null,
              openingTime : null,
              closingTime : null,
              appointment_gap : '',
              disable: ""
            })
            
            //alert("Slot Generated Saved Successfully!")

          } 
          */
        }

      this.setState({
        open: true,
        })
      
    };

    fileUpload(startDate, endDate, openingTime, closingTime, appointmentGap){
      let momentOpeningTime = moment(openingTime);
      let momentClosingTime = moment(closingTime);
      let formatOpeningTime = moment({
        hour: momentOpeningTime.hours(),
        minute: momentOpeningTime.minutes()
      }).format("hh:mm a");
     
      let formatClosingTime = moment({
        hour: momentClosingTime.hours(),
        minute: momentClosingTime.minutes()
      }).format("hh:mm a");

      openingTime = formatOpeningTime.toString();
      closingTime = formatClosingTime.toString();
      console.log("this.props.doctorID",this.props.doctorID)
      fetch(`http://localhost:8088/slotGenration/${this.props.doctorID}/${startDate}/${endDate}/${openingTime}/${closingTime}/${appointmentGap}/`, {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',      
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',      
        },  
     });
     this.setState({
      startDate : null,
      endDate : null,
      openingTime: null,
      closingTime: null,
      appointmentGap : 15,
      doctorID: null,
      active: "",
    })
     
    }
  
    render(){
        const { startDate , endDate } = this.state;
        const { classes } = this.props;
        return (
            <MuiThemeProvider >
                <React.Fragment >
                  
                    {/* <AppBar title="Enter User Details" /> */}
                    <DoctorHeader />
                    <h1>
                      Slots Genration
                     </h1>
                    {/* <Card style={{width:"650px",margin:"50px auto"}}> */}
                    <form className={classes.container} noValidate autoComplete="off">
                    <DatePicker
                      margin="normal"
                      label="Start Date"
                      hintText="Select Start Date" 
                      floatingLabelText="Start Date"
                      value={startDate}
                      onChange={this.handleStartDateChange}
                      errorText={this.state.startDate_error_text}
                    />
                   <DatePicker
                      margin="normal"
                      label="End Date"
                      hintText="Select End Date" 
                      floatingLabelText="End Date"
                      value={endDate}
                      onChange={this.handleEndDateChange}
                      errorText={this.state.endDate_error_text}
                    />

                    <TimePicker onChange={this.handleOpeningTime} 
                         value={this.state.openingTime} 
                         hintText="Select Opening Time" 
                         floatingLabelText="Opening Time"
                         className={classes.timePicker}
                         errorText={this.state.openingTime_error_text}
                      />
                       <TimePicker onChange={this.handleClosingTime} 
                          value={this.state.closingTime} 
                         hintText="Select Closing Time" 
                         floatingLabelText="Closing Time"
                         className={classes.timePicker}
                         errorText={this.state.closingTime_error_text}
                      />
                        <TextField 
                        hintText="Enter Appointment Gap"
                        floatingLabelText="Appointment Gap"
                        onChange={this.handleChange('appointmentGap')}
                        className={classes.textField}
                        errorText={this.state.appointmentGap_error_text}
                        value={this.state.appointmentGap} 
                        margin="normal"
                        />
                        <br/>
                        <br/>
                    <RaisedButton
                        label ="Generate Slot"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                        disabled = {this.state.disable}
                        />
                        </form>
                        {/* </Card> */}
                    <br/>
                    {this.state.active === '' ? 
                       <label for="test" id="test"style={{fontWeight: 'bold'}}>Slot generated successfully</label>
                       : ""
                    }
                </React.Fragment>

            </MuiThemeProvider>
        )
    }

}

const styles = theme => ({
  container: {
     display: 'inline-block',
    flexWrap: 'wrap',
    // width : '80%'
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    marginLeft: 15,
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
    width: 200,
  },
  timePicker: {
    marginLeft: 20,
    marginRight: 20,
    width: 200,
    
  },
  button: {
      margin: 15
  },
});

const mapStateToProps = state => ({
  loggin : state.adm.loggin,
  isloaded : state.adm.isloaded,
  specialist : state.patient.specialist,
  drlocation : state.patient.drlocation,
  doctors : state.patient.doctors,
  doctorID : state.patient.doctorID,
})

//export default (withStyles(styles)(SlotGenration))
export default withStyles(styles)(
  connect(mapStateToProps )(withRouter(SlotGenration))
)

