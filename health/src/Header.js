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
   this.props.onLoadStepper(6);
    this.props.pageNavigate(2)
    this.props.history.push('/login');
    //this.props.history.push('/doctor');
};

admin = e =>{
    e.preventDefault();
    //this.props.nextStep();
    let obj = {
      loggin : 'Login (Dr.)',
      islogin : false
  }
  this.props.onLoadStepper(6);
   this.props.loginPage(obj)
    this.props.pageNavigate(1)
    this.props.history.push('/login');
};

home = e =>{
    e.preventDefault();
    //this.props.nextStep();
    this.props.onLoadStepper(0);
    this.props.history.push('/');
};
cancel = e =>{
  e.preventDefault();
  //this.props.nextStep();
  this.props.onLoadStepper(6);
  this.props.history.push('/cancel'); 
};
render(){
  const { classes } = this.props;
  const steppers = ['Provide location & specialist', 'Choose Doctor', 
  'Select slot for Appointment', 'Book Appointment', 'Finish']
  return (
    <div className={classes.root}>
      <AppBar position="static">  
        <Toolbar>
        {/* <img src="/HealthTitleIcon.png" alt="Kitten" height="25" width="25" /> */}
          <Typography variant="h6" color="inherit" >
            HEALTH OTG
          </Typography>

        <span className={classes.toolbarButtons}>
        <Button color="inherit" onClick={this.home} >Home</Button>
        <IconButton color="inherit" aria-label="Home">
            <HomeIcon onClick={this.home} />
          </IconButton>
        <Button color="inherit" onClick={this.cancel} >Cancel Appointment</Button>
        <IconButton color="inherit" aria-label="Cancel">
            <CancelIcon onClick={this.cancel} />
          </IconButton>
          <Button color="inherit" onClick={this.doctor}>Login (Dr.)</Button>
          <IconButton color="inherit" aria-label="Login">
            <AccountIcon onClick={this.doctor} />
          </IconButton>
         
        </span>

        </Toolbar>
      </AppBar>
      {/* <div display="none"> */}
      {this.props.stepper != 6 ? 
        <Stepper activeStep={this.props.stepper} >
            {steppers.map((label, index) => {
              const props = {};
              const labelProps = {};

              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          : "" }
        {/* </div> */}
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