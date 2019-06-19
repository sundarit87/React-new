import React, { Component } from "react";
import Search from "./Patient/Search";
import ListDoctor from "./Patient/ListDoctor";
import DoctorDetail from "./Patient/DoctorDetail";
import Register from "./Patient/Register";
import AppointmentList from "./Doctor/AppointmentList"
import SlotGenration from "./Doctor/SlotGenration"
import DoctorHome from "./Doctor/DoctorHome"
import Login from "./Common/Login";
import Cancel from "./Patient/Cancel";

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { Redirect, withRouter } from 'react-router';
import Admin from "./Admin/Admin";

import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux'
import { save, load } from "redux-localstorage-simple"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'


const middleware = [logger, thunk]
const store = createStore(rootReducer
  ,load()
  ,composeWithDevTools(applyMiddleware(...middleware,save()))
  )

class Home extends Component{
 state={
     step: 1,
     firstName: '',
     lastName: '',
     email: '',
     occupation: '',
     city: '',
     bio: ''
 };

 //proceed to next step
nextStep = ()=>{
     const {step} = this.state;
     this.setState({
         step: step + 1
     });
 };
/*
 nextStep = input =>  {
    console.log(input)
    this.props.history.push(input)
 };*/

 //go back to prev step
 prevStep = ()=>{
    const {step} = this.state;
    this.setState({
        step: step - 1
    });
};

handleChange = input => e => {
    this.setState({[input]: e.target.value});
};




render(){

    const routes = [
        {
            path : "/",
            exact : true,
            main: () => <Search nextStep = {this.nextStep} />
        },
        {
            path : "/chooseDoctor",
            main: () => <ListDoctor nextStep = {this.nextStep} />
        },
        {
            path : "/selectAppointment",
            main: () => <DoctorDetail />
        },
        {
            path : "/bookAppointment",
            exact : true,
            main: () => <Register />
        },
        {
            path : "/admin",
            exact : true,
            main: () => <Admin />
        },
        {
            path : "/doctor",
            exact : true,
            main: () => <DoctorHome />
        },
        {
            path : "/patientList",
            exact : true,
            main: () => <AppointmentList />
        },
        {
            path : "/slotGenration",
            exact : true,
            main: () => <SlotGenration />
        },
        {
            path : "/login",
            main: () => <Login />
        },
        {
            path : "/cancel",
            main: () => <Cancel />
        },
    ];
    


    const {step,firstName,lastName,email,occupation,city,bio} = this.state;
    const values = {firstName,lastName,email,occupation,city,bio};

    return(
        <Provider store={store} >
        <Router>
            <div style={{display: "flex"}}>
               
                <div style={{flex: 1,padding: "10px"}}>
                <Switch>
                {routes.map((test,index)=>(
               
                <Route
                    key={index}
                    path={test.path}
                    component={test.main}
                    exact={test.exact}
                   /> 
                 
                   
                ))}
                    <Route  render={()=> <div>404 Not found page</div>} />  
               </Switch>
                </div>
            </div>
        </Router>
        </Provider>
    )

    /*switch(step) {
        case 1:
        return(
            <Search
                nextStep = {this.nextStep}
                handleChange={this.handleChange}
                values={values} />
        );
       case 2:
        return(
           <ListDoctor
                nextStep = {this.nextStep}
                handleChange={this.handleChange}
                values={values}
                 />
        );
         case 3:
        return( 
            <DoctorDetail
                nextStep = {this.nextStep}
                //prevStep = {this.prevStep}
                values={values} />
        );
        case 4:
        return <Register  nextStep = {this.nextStep}
        //prevStep = {this.prevStep}
        values={values} />

        case 5:
            return <Admin nextStep = {this.nextStep}
            //prevStep = {this.prevStep}
            values={values} />
            
        default :
            return ''
    }*/
}
}
export default Home