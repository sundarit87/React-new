import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'
import Header from "../Header";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {cancelAppointment} from '../Admin/action'
import {cancelDoctorAppointment} from './action'
import axios, { post } from 'axios';
import { Redirect, withRouter } from 'react-router';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import MenuItem from 'material-ui/MenuItem';

var bg=require('./CancelAppointment.jfif')

class Cancel extends Component{

    state ={
        cancelID : '',
        mobileNo : null,
        value: 1,
        active: false,
    }
    
    handleChange = (event, index, value) => this.setState({value});

    updateByBookingID(bookingID){
        fetch(`http://localhost:8081/cancelAppointment/?bookingID=${bookingID}`, {
            method: 'PUT',
            mode: 'CORS',
            //body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    continue = e =>{
        //e.preventDefault();
        
        let {cancelID,mobileNo} = this.state

        //this.props.nextStep('/listDoctor');
        //this.props.nextStep();
       // alert(cancelID)
        // console.log(cancelID)
       // let cancel = []

       // cancel.push(this.props.patients)
        //cancel[0].map(list=>console.log(list))

        // console.log((cancel[0]))
       //const data=cancel[0].filter(list=> list.bookingID ==cancelID)
       const dataTemp=this.props.patients.filter(list=> list.bookingID ==cancelID)
          console.log(dataTemp)
          console.log(dataTemp.map(list=>list.selectedTime))
         // let drName = dataTemp.map(list=>list.drName);
         // let selectedTime = dataTemp.map(list=>list.selectedTime);
       let obj = {
           book : dataTemp.map(list=>list.selectedTime)
           ,drName : dataTemp.map(list=>list.drName)
           ,appointment_date : dataTemp.map(list=>list.appointment_date)
       }
      // this.props.updateAppointment(this.props.selectedTime)
     //  this.props.cancelAppointment(obj)

     //  this.props.cancelDoctorAppointment(cancelID)
       
       console.log("starts cancel appointment")

       console.log(cancelID)
    /*
       fetch(`http://localhost:8080/appointments/updateAppointment/?bookingID=${cancelID}`, {
        method: 'PUT',  
        //mode : 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',      
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',      
        },  
     });
     alert("Your booking is updated")
    };
    */

   
   fetch(`http://localhost:8081/cancelAppointment/?bookingID=${cancelID}`, {
        method: 'DELETE',  
        //mode : 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',      
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',      
        },  
     });
    // alert("Your booking is cancelled")
      this.setState({
         cancelID : '',
         mobileNo : null,
         active: "",
      })
    }; 

     handleChange = input => e => {
         this.setState({[input]: e.target.value});
     };

    render(){
        const {values} = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                   {/* //AppBar title="Home" /> */}
                   <Header />
                    <div className='background-image' style ={ {position: "absolute", backgroundImage: "url("+bg+")" ,height:'90vh', width:'100%', backgroundSize: "cover"} }>
                    <Card style={{width:"350px",margin:"50px auto"}}>
                    <div>
                    <TextField 
                        hintText="Booking Id"
                        floatingLabelText="Booking Id"
                        onChange={this.handleChange('cancelID')}
                   //     value={this.state.cancelID}
                       // defaultValue={values.firstName}
                        />
                      </div>  
                      {/* <div>
                    <DropDownMenu value={this.state.value} 
                        onChange={this.handleChange} style={ styles }>
                        <MenuItem value={1} style={ {fontSize: "20px" } } primaryText="Select Cancel Reason" />
                        <MenuItem value={2} style={ {fontSize: "20px" } } primaryText="Not convenient time" />
                        <MenuItem value={3} style={ {fontSize: "20px" } } primaryText="Forgot the appointment time" />
                        <MenuItem value={4} style={ {fontSize: "20px" } } primaryText="Prefer to consult later" />
                    </DropDownMenu> 
                    </div>*/}
                    <TextField 
                        hintText="Mobile No"
                        floatingLabelText="Mobile No"
                        onChange={this.handleChange('value')}
                    //    value={this.state.mobileNo}
                       // defaultValue={values.firstName}
                        />
                <RaisedButton
                        label ="Cancel"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                        />
                    <br/>
                {this.state.active === '' ? 
                       <label for="test"  id="test" style={{fontWeight: 'bold'}}>Your appointment is successfully cancelled</label>
                       : ""
                        }
                    <br/>
                    <br/>
                        </Card>
                        
                        </div>
                </React.Fragment>

            </MuiThemeProvider>
        )
    }

}
//export default withRouter(Cancel)
const mapStateToProps = state => ({
    patients : state.patient.patients,
    doctor : state.patient.doctor,
  //  doctor : state.patient.doctor,
    selectedTime : state.patient.selectedTime,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    cancelAppointment,cancelDoctorAppointment
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default connect(mapStateToProps, mapDispatchToProps)(Cancel)
const styles = {
    button: {
        margin: 15
    }
};