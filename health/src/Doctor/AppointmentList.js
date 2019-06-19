import React, {Component} from 'react'
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { createMuiTheme, MuiThemeProvider, withStyles, Card , makeStyles} from '@material-ui/core/styles';
import "react-datepicker/dist/react-datepicker.css";
import DoctorHeader from '../DoctorHeader';
import {connect} from 'react-redux'
import axios, { post } from 'axios';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
//import { Text } from 'react-native';
//import { Paper } from "@material-ui/core/es/index";
//import DateFnsUtils from '@date-io/date-fns';
//import { MuiPickersUtilsProvider } from 'material-ui-pickers';
//import Grid from '@material-ui/core/Grid';
import { MDBDataTable } from 'mdbreact';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';



const moment = require('moment');

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,fontSize: 16,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
  
class PatientList extends Component {

  /*componentDidMount(){
    var pwd = 'ss';
    const {date} = this.state;
    var responseJsonLocal =null;
      fetch(`http://localhost:8088/login/${this.props.loggin}/${pwd}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ doctorID : responseJson.id});
        const formattedDate =moment(date).format('MMM DD YYYY')
        this.fetchApiInfo(formattedDate)
   })
  };*/

    
    state = { 
      date : new Date()
      ,bookingID : ''
      ,getdate : '' 
      ,error: null
      ,data: []     
      ,doctorID: null
    }; 


   dateChanged = selectedDate => {
     this.setState({selectedDate})
   }
   
handleChange=date=> {
    const formattedDate =moment(date).format('MMM DD YYYY')
    this.setState({date})
    this.fetchApiInfo(formattedDate)
}
   
removeData(){
    this.setState({filterData : []})
}

fetchApiInfo(formattedDate) {
  const {doctorID} = this.props;
  console.log("calling fetch method")

    fetch(`http://localhost:8081/getPatientBookingList/?appointmentDate=${formattedDate}&doctorID=${doctorID}`)
    .then((response) => response.json())
    .then((response) => {
        this.setState({data:response})
    })    
}

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#FF000"
          },
          paper: {
            boxShadow: "none"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FF0000"
          }
        }
      }
      
    });



render(){
  
var date = this.state.getdate
//const { classes } = this.props;

 const columns = [
  {
    name: "appointmentTime",
    label: "Appointment Time"
  },
  {
    name: "patientFirstName",
    label: "Patient FirstName"
  },
  {
    name: "patientLastName",
    label: "PatientLastName"
  },
  {
    name: "bookingID",
    label: "Booking ID"
  },
  // {
  //   name: "consultationAmount",
  //   label: "ConsultationAmount"
  // },
  // {
  //   name: "diseaseDesc",
  //   label: "Disease Desc"
  // },
  {
    name: "doctorID",
    label: "Doctor ID"
  },
  {
    name: "email",
    label: "Email"
  },
  {
    name: "mobileNo",
    label: "MobileNo"
  }

];
        
    return(
      
        <React.Fragment>
           <DoctorHeader />
        <div>
        <h1>
            Appointments
        </h1>
        <MuiThemeProvider>
      Select Date
             {"  "}
            <DatePicker
            selected={this.state.date}
            onChange={this.handleChange}
            popoverAttachment='bottom right'
            popoverTargetAttachment='top right'
            style={{width: 200}}
            />
        </MuiThemeProvider>
        </div>
        <br/>
        <div>
        <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell align="left">Appointment Time</CustomTableCell>
              <CustomTableCell align="left">Patient FirstName</CustomTableCell>
              <CustomTableCell align="left">Patient LastName</CustomTableCell>
              <CustomTableCell align="left">Disease</CustomTableCell>
              <CustomTableCell align="left">Email</CustomTableCell>
              <CustomTableCell align="left">Mobile No</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(data => (
              <TableRow >
                <CustomTableCell align="left">{data.appointmentTime}</CustomTableCell>
                <CustomTableCell align="left">{data.patientFirstName}</CustomTableCell>
                <CustomTableCell align="left">{data.patientLastName}</CustomTableCell>
                <CustomTableCell align="left">{data.diseaseDesc}</CustomTableCell>
                <CustomTableCell align="left">{data.email}</CustomTableCell>
                <CustomTableCell align="left">{data.mobileNo}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>
        </div>
  </React.Fragment>
    );
}
}

const mapStateToProps = state => ({
  patients : state.patient.patients,
  doctorID  :state.patient.doctorID
})

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        color: '#1d5ec6',
        backgroundColor: '#1d5ec6',
        '&:hover': {
          backgroundColor: '#1d5ec6',
          color: '#1d5ec6',
        }
      }
    }
  }
});

export default connect(mapStateToProps)(PatientList)