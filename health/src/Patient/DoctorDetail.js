import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Header from '../Header';

import { Redirect, withRouter } from 'react-router';
import {connect} from 'react-redux'
import { typography } from 'material-ui/styles';
import {bindActionCreators} from 'redux'
import {patientSelectedTime} from './action'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');

//import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 1200,
      },
      grid : {
        height: "100%",
        paddingTop: 5,
        backgroundColor: "#fff"
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
  });

  
  
class DoctorDetail extends Component {
    state={
        selectedTime : ''
        ,date : new Date()
        ,bookingID : ''
        ,getdate : ''
        ,slot : []
    }

    continue = e =>{
       // e.preventDefault();
        //this.props.nextStep();
        let obj = {
          selectedTime : this.state.selectedTime,
          bookingID : this.state.bookingID,
          appointment_date : this.state.getdate
        }
       // this.props.patientSelectedTime(this.state.selectedTime)
       this.props.patientSelectedTime(obj)
        this.props.history.push('/book')
    };

    clickbutton = (selectedTime,doctorID, sessions, slotID) =>{
        console.log(selectedTime,doctorID, sessions, slotID)
        
        this.setState({
            selectedTime : selectedTime,
            bookingID : doctorID,
            
        })

        let obj = {
          selectedTime : selectedTime,
          bookingID : doctorID,
          appointment_date : this.state.getdate,
          sessions : sessions,
          slotID : slotID
        }
       // this.props.patientSelectedTime(this.state.selectedTime)
       this.props.patientSelectedTime(obj)
        this.props.history.push('/bookAppointment')
    }
    //login = e =>{
    /*dataChange = () =>{
      console.log('test')
      //console.log(date)
      this.setState({
        date : this.state.date
      })
      console.log(this.state.date)
  }*/

  /*dateChanged = selectedDate => {
    console.log(selectedDate)
    this.setState({selectedDate})
  }*/

  handleChange=date=> {
    const formattedDate =moment(date).format('DD MMM YYYY')
  
    console.log(  formattedDate)
    console.log(this.props.doctor)
      var doctorID = this.props.doctor.map((list,index)=>list.id);
      console.log(doctorID[0])
        var responseJsonLocal =null;
          fetch(`http://localhost:8088/slots/${doctorID[0]}/${formattedDate}`)
          .then((response) => response.json())
          .then((responseJson) => this.setState({
            date: date,
            getdate:formattedDate,
            slot : responseJson
            
          })
              //
            //  this.setState({data:responseJson})
             )
             console.log(this.state.slot);
       
    }
    
    render() { 
        const { classes } = this.props;
        
       // const temp =[]
         
    // const timing =   ListDoctoData.map((time) => Object.values(time.timingMintues))
    //   temp.push(timing)
    //const data = temp.map((test)=> test)

   // const tempData = data[0].map((list)=> list)

  /*  const doctor_timing_morning =   this.props.doctor.map((time) => Object.values(time.timing_morning_Mintues))
   
    //   console.log(doctor_timing_morning[0].map((list,index)=>list["time"][index]))
   const morning_time= []
    doctor_timing_morning[0].map((list,index)=> morning_time.push(Object.values(list) ))
    //   console.log(temp1[0][0])
    morning_time.map((list,index)=> console.log(list[0]) )
    morning_time.map((list,index)=> console.log(list[1]) )

    
     // if(!doctor_timing_morning[0]) return null;

      const doctor_timing_noon =   this.props.doctor.map((time) => Object.values(time.timing_noon_Mintues))

    //   console.log(doctor_timing_noon)
      //if(!doctor_timing_noon[0]) return null;

      const doctor_timing_night =   this.props.doctor.map((time) => Object.values(time.timing_night_Mintues))

    //   console.log(doctor_timing_night)
    //  if(!doctor_timing_night[0]) return null;*/

    
    
   
   // var date = this.state.getdate//'2019-04-05T09:57:59.331Z'
   // var drName = this.props.doctor.map(list => list.drName)
  //  console.log(drName)
  //  const doctorAvailability = this.props.doctorsAvail.filter(list => (list.drName == drName && list.appointment_dateStr === date))
  
  // this.props.doctorsAvail.map(list => console.log(new Date(list.appointment_date)))
   //console.log('date'+new Date(this.state.date))
    //const doctorAvailability = this.props.doctorsAvail.filter(list => (list.appointment_date === date))
   //const doctorAvailability = this.props.doctorsAvail.filter(list => 
   // (new Date(list.appointment_date).getTime() === new Date(this.state.selectedDate).getTime()))
//console.log(doctorAvailability)
//var currentDate = new Date()
//currentDate.setDate(currentDate.getDate() + 1);
//var appointmentDate = new Date(date)
//console.log(currentDate)
//console.log(appointmentDate)
//var same = currentDate.getTime() === appointmentDate.getTime();
// var notSame = currentDate.getTime() !== appointmentDate.getTime()
// console.log(same,notSame)
//console.log(doctorAvailability)
/*var buttonCount = [], i = 0, gap = doctorAvailability.map(list=>list.morning_gap)
console.log(gap)
for(i; i< gap; i++){
    buttonCount.push(i)
}*/
//buttonCount.map(list=>console.log(list))
// /console.log(doctorAvailability.map(time0)
//2019-04-04T10:31:02.906Z
const {slot} = this.state;
console.log(slot)
if(!slot) return null;
const pathImag = "./images/9.jfif" ;
        return (  
              <MuiThemeProvider>
                <React.Fragment>
                    {/* <AppBar title="Home" /> */}
                    <Header />
                         <br />
                         {this.props.doctor.map((list,index)=>
                        
                        <Paper className={classes.paper}>
                            <Grid className={classes.grid} container spacing={16}
                            //onClick={()=>this.continue(list.hospitalName)}
                            >
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" 
                                //src="/static/images/grid/complex.jpg" />
                                src={list.imageURL} 
                                
                                />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" variant="h5" style={{color:'blue'}}>
                                    {`Hopsital Name: ${list.hospitalName}`}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" variant="h6">
                                    {`Doctor Name: ${list.dName}`}
                                    </Typography>
                                    <Typography gutterBottom>{`Specialist : ${list.specialist}`}</Typography>
                                    <Typography color="textSecondary">{`Address : ${list.address}`}</Typography>
                                   
                                </Grid>
                                <Grid item>
                                    {/* <Typography style={{ cursor: 'pointer' }}>10-12 Am</Typography> */}
                                </Grid>
                                </Grid>
                                <Grid item>
                                {/* <Typography variant="subtitle1">Rating : 0</Typography> */}
                                <br></br>
                                <Typography color="textSecondary" align='left'>{`Email : ${list.email}`}</Typography>
                                    <Typography color="textSecondary" align='left'>{`ContactNo : ${list.contactNo}`}</Typography>
                                  
                                    <Typography color="textSecondary" align='left'>{`Education : ${list.education}`}</Typography>
                                    <Typography color="textSecondary" align='left'>{`Experience : ${list.experience}`}</Typography>

                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                 
                 )}
                        <br />
                        <typography>Select Date  </typography>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                      />
                      {/* <DiscreteColorLegend
                        style={{position: 'absolute', left: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[
                        {
                        title: 'Booked',
                        color: '#39D1B4',
                     //   strokeWidth:50
                        },
                        {
                        title: 'Not Booked',
                        color: '#79C7E3'
                        }
                        ]}
                        /> */}
                      {/* <DiscreteColorLegend items={this.legendItems} orientation="horizontal" /> */}
                                            <br />
                        <typography>Slots</typography>
                    <br />
                    <br />
                     {/* {buttonCount.map((list,index)=> */}
                     <Card style={{width:"1000px",margin:"50px auto"}}>
                       { this.state.slot.map((slot)=>
                            <Button variant="outlined" color="primary" className={classes.button} 
                            onClick={()=>this.clickbutton(slot.slotTime,slot.id.doctorID, slot.id.sessions, slot.id.slotID)}
                       disabled={slot.blocked}  style={{backgroundColor: slot.blocked ?'#39D1B4' : ''}} >{slot.slotTime}</Button>
                       //doctorAvail[`time${i}`]
                        )}
                      </Card>
                
                         {/* )}      */}
                    <br />
                    
                 {/* <RaisedButton label ="Book" primary={true} onClick={this.continue} /> */}
                </React.Fragment> 

            </MuiThemeProvider>
            
        );
    }
}
 
//export default withRouter(withStyles(styles)(DoctorDetail));

const mapStateToProps = state => ({
    doctor : state.patient.doctor,
    isfilterred : state.patient.isfilterred,
    selectedTime : state.patient.selectedTime,
    doctorsAvail : state.adm.doctorsAvail,
    appointment_date : state.patient.appointment_date,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    patientSelectedTime
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorDetail))
)