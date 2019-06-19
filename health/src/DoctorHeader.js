import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Redirect, withRouter } from 'react-router';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pageNavigate,loginPage} from './Admin/action'
import {onLoadStepper} from './Patient/action'

import MoreVertIcon from "@material-ui/icons/MoreVert";
import CancelIcon from "@material-ui/icons/CancelRounded";
import AccountIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Avatar } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
    
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -12
  },
  
};

class Header extends Component{

state={
  loggin : "Login (Dr.)",
  stepper : 0
}

async componentDidMount(){
  const {loggin, stepper} = this.props
  console.log(this.props.stepper)
  this.setState({
    loggin : loggin,
    stepper : stepper
  })
}

doctor = e =>{
    e.preventDefault();
    //this.props.nextStep();
    let obj = {
      loggin : 'Login (Dr.)',
      islogin : false
  }
   this.props.loginPage(obj)
   this.props.onLoadStepper(0);
    this.props.pageNavigate(2)
    this.props.history.push('/');
    //this.props.history.push('/doctor');
};

admin = e =>{
    e.preventDefault();
    //this.props.nextStep();
    let obj = {
      loggin : 'Login (Dr.)',
      islogin : false
  }
   this.props.loginPage(obj)
    this.props.pageNavigate(1)
    this.props.history.push('/login');
};

home = e =>{
    e.preventDefault();
    //this.props.nextStep();
    this.props.history.push('/slotGenration');
};
cancel = e =>{
  e.preventDefault();
  //this.props.nextStep();
  this.props.history.push('/patientList'); 
};
render(){
  const { classes } = this.props;
  const steppers = ['Search for the Doctor', 'Choose the Doctor', 
  'Select the available Doctor for Appointment', 'Book the Appointment', 'Finish']
  return (
    <div className={classes.root}>
      <AppBar position="static">  
        <Toolbar>
        {/* <img src="/HealthTitleIcon.png" alt="Kitten" height="25" width="25" /> */}
          <Typography variant="h6" color="inherit" >
            HEALTH OTG
          </Typography>

        <span className={classes.toolbarButtons}>
        
        {/* <IconButton color="inherit" aria-label="Home">
            <HomeIcon onClick={this.home} />
          </IconButton> */}
        <Button color="inherit" onClick={this.cancel} >Appointments</Button>
        <svg xmlns="http://www.w3.org/2000/svg" fill='white' onClick={this.cancel} width="24" height="24" viewBox="0 0 20 20"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
        <Button color="inherit" onClick={this.home} >Slots Genration</Button>
        <svg xmlns="http://www.w3.org/2000/svg" fill='white' onClick={this.home} width="24" height="24" viewBox="0 0 20 20"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
        {/* <IconButton color="inherit" aria-label="Cancel">
            <CancelIcon onClick={this.cancel} />
          </IconButton> */}
          <Button color="inherit" onClick={this.doctor}>LogOut</Button>
          <IconButton color="inherit" aria-label="Login">
            <AccountIcon onClick={this.doctor} />
          </IconButton>
         
        </span>

        </Toolbar>
      </AppBar>
      {/* <Stepper activeStep={this.state.stepper}>
          {steppers.map((label, index) => {
            const props = {};
            const labelProps = {};

            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
    </div>
    
  );
}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default withRouter(withStyles(styles)(Header));

const mapStateToProps = state => ({
  page : state.adm.page,
  loggin : state.adm.loggin,
  islogin : state.adm.islogin,
  stepper : state.patient.stepper,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  pageNavigate,loginPage,onLoadStepper
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
)