import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'
import Header from "../Header";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {savePatientDetail,onLoadStepper} from './action'
import {updateAppointment} from '../Admin/action'
import axios, { post } from 'axios';

class Register extends Component{

    state = {
        firstName : "",
        lastName : "",
        email : "",
        mobile : "",
        book: "",
        booking_ID: "",
        diseseDesc:"",
        disable : false
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    continue = e =>{
        e.preventDefault();
       // this.props.nextStep();
       const {firstName, lastName, email, mobile} = this.state;
       let drName = this.props.doctor.map(list=>list.dName)
       let drID = this.props.doctor.map(list=>list.id)
       let bookingID = Math.floor(Math.random() * 1000000000000000);

       //let Timing = this.props.doctor.map(list=>list.)
       console.log('test book')
       console.log(this.props.slotID)
       console.log(drName, drID)
     /*  let res = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        mobile : mobile,
        drName : drName[0],
        bookingTime : this.props.bookingID,
        appointment_date : this.props.appointment_date,
        bookingID  :bookingID,
        selectedTime : this.props.selectedTime,       
       }*/

       //this.props.savePatientDetail(res)
      //this.saveAppointmentDetails(bookingID)
      /* console.log(this.props.selectedTime)
       let obj = {
           book : this.props.selectedTime
           ,drName : drName[0]
           ,appointment_date : this.props.appointment_date
       }*/
       
    
      // this.props.updateAppointment(this.props.selectedTime)
      /* this.props.updateAppointment(obj)
       this.setState({
        disable : true,
        })*/
        console.log(this.props.appointment_date)
        const moment = require('moment');
        const appointmentdDate = moment(this.props.appointment_date).format('MMM DD YYYY')
        console.log(appointmentdDate)
        console.log(this.props.sessions,this.props.slotID)
        //alert("Your booking id is: "+bookingID)
        console.log("disease desc")
        console.log(this.state.diseseDesc)
        this.setState({booking_ID:bookingID})
        const url = 'http://localhost:8081/makeAppointment';
        const formData = new FormData();
        formData.append('bookingID',bookingID)
        formData.append('doctorID',this.props.doctor.map(list=>list.id))
        formData.append('doctorName',this.props.doctor.map(list=>list.dName))
        formData.append('appointmentDate',appointmentdDate)
        formData.append('appointmentSession',this.props.sessions)
        formData.append('appointmentTime',this.props.selectedTime)
        formData.append('patientFirstName',this.state.firstName)
        formData.append('patientLastName',this.state.lastName)
        formData.append('mobileNo',this.state.mobile)
        formData.append('email',this.state.email)
        formData.append('diseaseDesc',this.state.diseseDesc)
        formData.append('consultationAmount',100)
        console.log(this.props.slotID)
        formData.append('slotID',parseInt(this.props.slotID))
        console.log(url)
        const config = {
            //mode:'no-cors',
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        }
        this.props.onLoadStepper(5)

        this.setState({
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            disable: "",
            diseaseDesc: ""
        })

        post(url, formData,config)

       console.log(this.state.firstName)
        

       /* var blocked = true;
       fetch(`http://localhost:8080/slotBooking/?doctorID=${drID}&session=${this.props.sessions}&slotId=${this.props.slotID}&blocked=${blocked}`, {
        method: 'PUT',  
        //mode : 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',      
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',      
        },  
     });*/

     /*fetch('http://localhost:8081/makeAppointment',
     {
        headers: {
            "content-type" : "application/json",
            'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        method: "POST",
        mode : 'no-cors',
        body: JSON.stringify({
            bookingID:bookingID
            ,doctorID:this.props.doctor.map(list=>list.id)
            ,doctorName:this.props.doctor.map(list=>list.dName)
            ,appointmentDate:appointmentdDate
            ,appointmentSession:this.props.sessions
            ,appointmentTime:this.props.bookingID +  'AM'
            ,patientFirstName:this.state.firstName
            ,patientLastName:this.state.lastName
            ,mobileNo:this.state.mobile
            ,email:this.state.email
            ,diseaseDesc:'Virus Fever'
            ,consultationAmount:100
            ,slotID:parseInt(this.props.slotID)
        })

     })*/
     
       
    };

   /* saveAppointmentDetails(bookingID){
        console.log(this.props.appointment_date)
        const moment = require('moment');
        const appointmentdDate = moment(this.props.appointment_date).format('MMM DD YYYY')
        console.log(appointmentdDate)
        console.log(this.props.sessions,this.props.slotID)
        const url = 'http://localhost:8081/appointments/makeAppointment';
        const formData = new FormData();
        formData.append('bookingID',bookingID)
        formData.append('doctorID',this.props.doctor.map(list=>list.id))
        formData.append('doctorName',this.props.doctor.map(list=>list.dName))
        formData.append('appointmentDate',appointmentdDate)
        formData.append('appointmentSession',this.props.sessions)
        formData.append('appointmentTime',this.props.bookingID + ' AM')
        formData.append('patientFirstName',this.state.firstName)
        formData.append('patientLastName',this.state.lastName)
        formData.append('mobileNo',this.state.mobile)
        formData.append('email',this.state.email)
        formData.append('diseaseDesc','Virus Fever')
        formData.append('consultationAmount',100)
        console.log(this.props.slotID)
        formData.append('slotID',parseInt(this.props.slotID))
        console.log(url)
        const config = {
            //mode:'no-cors',
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        }

       // const { data: post } =  axios.post(url, formData)
      //  console.log(post)
        return  post(url, formData,config)
}*/

    render(){
        const {values, handleChange} = this.props;
        const {firstName, lastName, email, mobile,diseseDesc} = this.state;
        return (
             <MuiThemeProvider>
                <React.Fragment>
                    {/* <AppBar title="Enter User Details" /> */}
                    <Header />
                    <Card style={{width:"300px",margin:"50px auto"}}>
                    <TextField 
                        hintText="Enter First Name"
                        floatingLabelText="First Name"
                        onChange={this.handleChange('firstName')}
                        defaultValue={firstName}
                        value={this.state.firstName} 
                        />
                        <br/>
                     <TextField 
                        hintText="Enter Last Name"
                        floatingLabelText="Last Name"
                        onChange={this.handleChange('lastName')}
                        defaultValue={lastName}
                        value={this.state.lastName} 
                        />
                        <br/>
                <TextField 
                        hintText="Enter Mobile"
                        floatingLabelText="Mobile"
                        onChange={this.handleChange('mobile')}
                        value={this.state.mobile} 
                       // defaultValue={values.mobile}
                        />
                        <br/>
                  <TextField 
                        hintText="Enter Email"
                        floatingLabelText="Email"
                        onChange={this.handleChange('email')}
                        defaultValue={email}
                        value={this.state.email} 
                        
                        />
                        <br/>
                    <TextField 
                        hintText="Enter Disease"
                        floatingLabelText="Disease"
                        onChange={this.handleChange('diseseDesc')}
                        defaultValue={diseseDesc}
                        value={this.state.diseaseDesc} 
                        />
                        <br/>
                <RaisedButton
                        label ="Book"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                        disabled = {this.state.disable}
                        />
                        </Card>
                    {this.state.disable === '' ? 
                       <label for="test" id="test"style={{fontWeight: 'bold'}}>Your appointment registered successfully and booking id is: {this.state.booking_ID}</label>
                       : ""
                    }
                    <br/>
                </React.Fragment>

            </MuiThemeProvider>
        )
    }

}
const mapStateToProps = state => ({
    patients : state.patient.patients,
    doctor : state.patient.doctor,
    selectedTime : state.patient.selectedTime,
    bookingID : state.patient.bookingID,
    slotID : state.patient.slotID,
    sessions : state.patient.sessions,
    appointment_date : state.patient.appointment_date
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    savePatientDetail,updateAppointment,onLoadStepper
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default connect(mapStateToProps, mapDispatchToProps)(Register)
const styles = {
    button: {
        margin: 15
    }
};