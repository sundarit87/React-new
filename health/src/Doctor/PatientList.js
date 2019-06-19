import React, {Component} from 'react'
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { createMuiTheme, MuiThemeProvider, withStyles, Card } from '@material-ui/core/styles';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../Header';
import {connect} from 'react-redux'
import axios, { post } from 'axios';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

//import { Paper } from "@material-ui/core/es/index";
//import DateFnsUtils from '@date-io/date-fns';
//import { MuiPickersUtilsProvider } from 'material-ui-pickers';
//import Grid from '@material-ui/core/Grid';
import { MDBDataTable } from 'mdbreact';


const moment = require('moment');

class PatientList extends Component {

    state = { 
      date : new Date()
      ,bookingID : ''
      ,getdate : '' 
      ,error: null
      ,data: []     
    }; 

   dateChanged = selectedDate => {
     //console.log(selectedDate)
     this.setState({selectedDate})
   }
   
handleChange=date=> {
    const formattedDate =moment(date).format('MMM DD YYYY')
  
    console.log( "formattedDate"+ formattedDate)
    this.setState({date})
    this.fetchApiInfo(formattedDate)
    
}
   
removeData(){
    this.setState({filterData : []})
}

fetchApiInfo(formattedDate) {
  console.log("calling fetch method")
    const docID = '123'
    fetch(`http://localhost:8088/appointments/getAppointmentList/?appointmentDate=${formattedDate}&doctorID=${docID}`)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        this.setState({data:response})
       //console.log(this.state.data)
    })    
}

render(){
  
var date = this.state.getdate


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
  // ,
  // {
  //   name: "appointmentDate",
  //   label: "Appointment Date"
  // }
];
                    
   /* const data = [
    { Name: "Joe James", Hospital: "NMR Clinic", City: "Yonkers", State: "NewYork", AppointmentDate: "Mon Apr 01 2019"},
    { Name: "John Walsh", Hospital: "Meenakshi Clinic", City: "Hartford", State: "NewJersy", AppointmentDate: "Mon Apr 01 2019" },
    { Name: "Bob Herm", Hospital: "FS Clinic", City: "Guindy", State: "Corelado", AppointmentDate: "Tue Apr 02 2019" },
    { Name: "James Houston", Hospital: "Mafia Clinic", City: "Dallas", State: "Carolina", AppointmentDate: "Mon Apr 01 2019"},
    { Name: "Rana", Hospital: "Califa Clinic", City: "Meenambakam", State: "Florida", AppointmentDate: "Wed Apr 03 2019"},
    { Name: "Samuael", Hospital: "Zombie Clinic", City: "Saidapet", State: "Texas", AppointmentDate: "Wed Apr 03 2019"},
    { Name: "Mark Henry", Hospital: "Mummy Clinic", City: "Porur", State: "NinjaxX", AppointmentDate: "Mon Apr 01 2019"},
    { Name: "John Cena", Hospital: "Doshi Clinic", City: "Kanchipuram", State: "Missouri", AppointmentDate: "Mon Apr 01 2019"},
    { Name: "Rabbada", Hospital: "Fernandous Clinic", City: "Ramapuram", State: "Illionois", AppointmentDate: "Tue Apr 02 2019"},
    { Name: "Warner", Hospital: "Tata Clinic", City: "Royapuram", State: "California", AppointmentDate: "Tue Apr 02 2019"},
    ];*/

    const options = {
        filterType: 'checkbox',
      };

    //const filterData = data.filter(list=>list.AppointmentDate === this.state.selectedDate.toDateString())

      
return(
  <React.Fragment>
      <div>
  <MuiThemeProvider theme={theme}>
  Select Date
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
  <MUIDataTable
  title={"Patient List"}
  data={this.state.data}
  columns={columns}
  options={options}
  />
  </React.Fragment>
);
}

}
//export default PatientList;

const mapStateToProps = state => ({
  patients : state.patient.patients,
  loggin  :state.adm.loggin
})

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        color: '#000000',
        backgroundColor: '#ffffff',
        '&:hover': {
          backgroundColor: 'rgba(108, 130, 168, 0.11764705882352941)',
          color: '#000000',
        }
      }
    }
  }
});
//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default connect(mapStateToProps, )(PatientList)