import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'
import Header from "../Header";
import { Hidden } from "@material-ui/core";
import axios, { post } from 'axios';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TimePicker from 'material-ui/TimePicker';



import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {saveDoctorDetail,saveDoctorAvail} from './action'
const moment = require('moment');

class Admin extends Component{

  constructor(props){
    super(props);

    this.state = {
    openingTime: null,
    closingTime: null,
    location : "",
        specailist : "",
        hospName : "",
        drName : "",
        mobile : "",
        email : "",
        rating : "",
        address : "",
        opening_time : "",
        closing_time : "",
        //appointment_gap : 5,
        education : '',
        experience: '',
        hospital : "",
        img : '',
        disable : false,
        vertical: 'bottom',
        horizontal: 'left',
        open: false,
        hospital_error_text: '',
        drname_error_text	: '',
        mobile_error_text: '',
        email_error_text: '',
        specialist_error_text: '',
        location_error_text	: '',
        address_error_text: '',
        openingTime_error_text: '',
        closingTime_error_text: '',
        education_error_text: '',
        experience_error_text: '',
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpeningTime = this.handleOpeningTime.bind(this);
    this.handleClosingTime = this.handleClosingTime.bind(this);
  };

    // state ={
    //     location : "",
    //     specailist : "",
    //     hospName : "",
    //     drName : "",
    //     mobile : "",
    //     email : "",
    //     rating : "",
    //     address : "",
    //     opening_time : "",
    //     closing_time : "",
    //     appointment_gap : 0,
    //     hospital : "",
    //     img : '',
    //     disable : false,
    //     vertical: 'bottom',
    //     horizontal: 'left',
    //     open: false,
    //     hospital_error_text: '',
    //     drname_error_text	: '',
    //     mobile_error_text: '',
    //     email_error_text: '',
    //     specialist_error_text: '',
    //     location_error_text	: '',
    //     address_error_text: '',
    //     openingTime_error_text: '',
    //     closingTime_error_text: '',
    //     appointmentGap_error_text: '',
    //     time: null,

        
    // }
    
    handleOpeningTime(event, time){
      this.setState({openingTime: time})
    };

    handleClosingTime(event, time){
      this.setState({closingTime: time})
    };

    handleChange = input => e => {
      console.log("email")
        this.setState({[input]: e.target.value});
    };
  

    validate = (text) => {
      console.log(text);
      let reg = '/^\W+([\.-]?\W+)*(\.\W2,3})+$/';
      if(reg.test(text)==false){
        console.log("Email is not correct")
        this.serState({email:text})
        return false;
      }else{
        this.serState({email:text})
        console.log("Email is correct");
      }
    }

    handleClose = () => {
      this.setState({ open: false });
    };

    continue = e =>{
     
      const {location,specailist,hospName,drName,mobile,email,rating,
        address,openingTime, closingTime, education, experience,img} = this.state; 
     //   alert(parseInt(appointment_gap))
        var arr_morning = []

      //  var a = parseInt(opening_time), b = parseInt(closing_time), diff = (b-a)*60,
      //   gap = parseInt(appointment_gap), tempGap = 0, res = diff/gap, i = 0
              
        var errorCount=0
        if(location === undefined && location === null || location.length == 0){
          this.setState({
            location_error_text : "Location should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            location_error_text : null
          })
        }
        if(specailist === undefined && specailist === null || specailist.length == 0){
          this.setState({
            specialist_error_text : "Specailist should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            specialist_error_text : null
          })
        }
        if(hospName === undefined && hospName === null || hospName.length == 0){
          this.setState({
            hospital_error_text : "Hospital Name should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            hospital_error_text : null
          })
        }
        if(drName === undefined && drName === null || drName.length == 0){
          this.setState({
            drname_error_text : "Doctor Name should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            drname_error_text : null
          })
        }
        
        
        if(mobile === undefined && mobile === null || mobile.length == 0){
          this.setState({
            mobile_error_text : "Contact No. should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            mobile_error_text : null
          })
        }
        
       if(email === undefined && email === null || email.length == 0){
        this.setState({
          email_error_text : "Email should not be empty"
        })
        errorCount = errorCount +1;
      }else{
        if(email !== "/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/"){
          console.log("invalid email")
          this.setState({
            email_error_text : "Invalid Email address"
          })
          errorCount = errorCount +1;
        }else{
          console.log("valid email")      
          this.setState({
            email_error_text : null
          })
        }
      }
        
        if(address === undefined && address === null || address.length == 0){
          this.setState({
            address_error_text : "Address should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            address_error_text : null
          })
        }

        if(education === undefined && education === null || education.length == 0){
          this.setState({
            education_error_text : "Address should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            education_error_text : null
          })
        }

        if(experience === undefined && experience === null || experience.length == 0){
          this.setState({
            experience_error_text : "Experience should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            experience_error_text : null
          })
        }

        if(openingTime === undefined && openingTime === null){
          this.setState({
            openingTime_error_text : "Opening time should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            openingTime_error_text : null
          })
        }
        if(closingTime === undefined && closingTime === null){
          this.setState({
            closingTime_error_text : "Closing time should not be empty"
          })
          errorCount = errorCount +1;
        }else{  
          this.setState({
            closingTime_error_text : null
          })
        }
        // if(appointment_gap === undefined && appointment_gap === null || appointment_gap.length == 0){
        //   this.setState({
        //     appointmentGap_error_text : "Appointment Gap should not be empty"
        //   })
        //   errorCount = errorCount +1;
        // }else{  
        //   this.setState({
        //     appointmentGap_error_text : null
        //   })
        // }
        
        if(errorCount == 0)
        {
         var doctor =  this.fileUpload(location,specailist,hospName,drName,mobile,email,
            address,openingTime, closingTime, education, experience)

          if(doctor!=null)
          {
            this.setState({
              specailist : "",
              hospName : "",
              drName : "",
              mobile : "",
              email : "",
              address : "",
              openingTime : "",
              closingTime : "",
              hospital : "",
              location : "",
              education : "",
              experience: "",
            })

            alert("Doctor Details Saved Successfully!")

          }
        }
     
      let doctorDetail = {
          location : location,
          specailist : specailist,
          hospName : hospName,
          drName : drName,
          mobile : mobile,
          email : email,
          img : "./images/"+img+".jfif",
          rating : rating,
          address : address
      }

      this.setState({
       // disable : true,
        open: true,
        })
      
    };

    fileUpload(location,specialist,hospName,drName,mobile,email,
      address,openingTime, closingTime, education, experience){
      
      var userName = drName.replace( /\s/g, '');
      userName = userName.toLowerCase();      
      var password = drName+"@123";

      if(drName.indexOf(' ') >= 0){
        console.log("string contains space");
        password = drName.substr(0, drName.indexOf(" ")).toLowerCase()+"@123";
      }

      console.log(userName);
      console.log(password);

      const url = 'http://localhost:8088/doctors/';
      const formData = new FormData();
      formData.append('hospitalName',hospName)
      formData.append('location',location)
      formData.append('dName',drName)
      formData.append('contactNo',mobile)
      formData.append('email',email)
      formData.append('address',address)
      formData.append('openingTime',openingTime)
      formData.append('closingTime',closingTime)
      formData.append('specialist',specialist)
      formData.append('education',education)
      formData.append('experience',experience)
      formData.append('userName',userName)
      formData.append('password',password)
      
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return post(url, formData,config)
    }
  
    render(){
       // const {values} = this.state;
        const { vertical, horizontal, open } = this.state;
        const { classes } = this.props;
        return (
            <MuiThemeProvider >
                {/* <React.Fragment></React.Fragment> */}
                <React.Fragment >
                    {/* <AppBar title="Enter User Details" /> */}
                    <Header />
                    {/* <Card style={{width:"650px",margin:"50px auto"}}> */}
                    <form className={classes.container} noValidate autoComplete="off">
                    <TextField 
                        hintText="Enter Hospital Name"
                        floatingLabelText="Hospital Name"
                        onChange={this.handleChange('hospName')}
                        className={classes.textField}
                        errorText={this.state.hospital_error_text}
                        value={this.state.hospName}
                        margin="normal"
                        />
                     <TextField 
                        hintText="Enter Doctor Name"
                        floatingLabelText="Doctor Name"
                        onChange={this.handleChange('drName')}
                        className={classes.textField}
                        errorText={this.state.drname_error_text}
                        value={this.state.drName}
                        margin="normal"
                        />
                        <TextField 
                        hintText="Enter Specialist"
                        floatingLabelText="Specialist Name"
                        onChange={this.handleChange('specailist')}
                        className={classes.textField}
                        errorText={this.state.specialist_error_text}
                        value={this.state.specailist}
                        margin="normal"
                        />
                        <br/>
                        <TextField 
                        hintText="Enter Mobile"
                        floatingLabelText="Mobile"
                        onChange={this.handleChange('mobile')}
                        className={classes.textField}
                        errorText={this.state.mobile_error_text}
                        value={this.state.mobile}
                        margin="normal"
                        />
                     <TextField 
                        hintText="Enter Email"
                        floatingLabelText="Email"
                        onChange={this.handleChange('email')}
                        className={classes.textField}
                        errorText={this.state.email_error_text}
                        //onChangeText={(text)=>this.validate(text)}
                        value={this.state.email} 
                        margin="normal"
                        />                 
                     <TextField 
                        hintText="Enter Location"
                        floatingLabelText="Location"
                        onChange={this.handleChange('location')}
                        className={classes.textField}
                        errorText={this.state.location_error_text}
                        value={this.state.location} 
                        margin="normal"
                        />
                        <br/>

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
                        {/* <TextField 
                        hintText="Enter Appointment Gap"
                        floatingLabelText="Appointment Gap"
                        onChange={this.handleChange('appointment_gap')}
                        className={classes.textField}
                        errorText={this.state.appointmentGap_error_text}
                        value={this.state.appointment_gap} 
                        margin="normal"
                        /> */}
                        <TextField 
                        hintText="Enter Education Details"
                        floatingLabelText="Education"
                        onChange={this.handleChange('education')}
                        className={classes.textField}
                        errorText={this.state.education_error_text}
                        value={this.state.education} 
                        margin="normal"
                        />
                        <TextField 
                        hintText="Enter Experience"
                        floatingLabelText="Experience"
                        onChange={this.handleChange('experience')}
                        className={classes.textField}
                        errorText={this.state.experience_error_text}
                        value={this.state.experience} 
                        margin="normal"
                        />
                        <br/>
                        <TextField 
                        id="standard-full-width"
                        style={{ margin: 20,marginLeft:20,marginRight:20 }}
                        hintText="Enter Address"
                        floatingLabelText="Address"
                        fullWidth
                        onChange={this.handleChange('address')}
                        className={classes.textField}
                        errorText={this.state.address_error_text}
                        margin="normal"
                        value={this.state.address} 
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                         
                        <br />
                    <RaisedButton
                        label ="Submit"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                        disabled = {this.state.disable}
                        />
                        </form>
                        {/* </Card> */}
                </React.Fragment>

            </MuiThemeProvider>
        )
    }

}
const mapStateToProps = state => ({
    doctors : state.adm.doctors,
    isloaded : state.adm.isloaded,
    doctdoctorsAvailors : state.adm.doctdoctorsAvailors
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    saveDoctorDetail,saveDoctorAvail
},dispatch)

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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Admin))

