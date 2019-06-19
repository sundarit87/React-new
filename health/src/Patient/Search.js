import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card} from 'material-ui'
import Header from "../Header";

import { Redirect, withRouter } from 'react-router';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {saveLocation,get_Doctor,onLoadStepper,updateLocation,updateSpecialist} from './action'
import Autocomplete from "../Common/Autocomplete";
import IntegrationAutosuggest from "../Common/IntegrationAutosuggest";

var bg=require('./MainScreen.jpg')

class Search extends Component{

    state ={
        location : "",
        specialist : "",
        errorTextLocation : "",
        errorTextSpecialist : "",
        error : ""
        
    }

    componentDidMount(){
        this.props.onLoadStepper(0)
        this.props.updateLocation('');
        this.props.updateSpecialist('');
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    continue = e =>{
        console.log(this.props.drlocation, this.props.specialist)
        var responseJsonLocal =null;
        fetch(`http://localhost:8088/find/${this.props.drlocation}/${this.props.specialist}`)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
          //  this.setState({data:responseJson})
           console.log("respose",responseJson)
           this.props.get_Doctor(responseJson);
           responseJsonLocal = responseJson
     })
    
     //if(responseJsonLocal!=null){
       this.props.history.push('/chooseDoctor')
    //  }
       /*const {location,specialist} = this.state
       if((location === undefined || location === null || location.length == 0) 
       || (specialist === undefined && specialist === null || specialist.length == 0)){
        alert("Please key in input")
       }else{
        let obj = {
            location : location,
            specialist : specialist
          }
         this.props.saveLocation(obj)
          //  this.props.history.push('/listDoctor')
      
    
       const {location,specialist} = this.state
       console.log(this.props.drlocation, this.props.specialist)
        var responseJsonLocal =null;
          fetch(`http://localhost:8088/find/${location}/${specialist}`)
          .then((response) => response.json())
          .then((responseJson) => {
              //console.log(responseJson);
            //  this.setState({data:responseJson})
             console.log("respose",responseJson)
             this.props.get_Doctor(responseJson);
             responseJsonLocal = responseJson
       })
      
       //if(responseJsonLocal!=null){
         this.props.history.push('/chooseDoctor')
      //  }
    }*/
    };


    render(){
        const {values} = this.props;
        const value1 = 1
        const value2 = 2
        return (
            <MuiThemeProvider>
                <React.Fragment>
                   {/* //AppBar title="Home" /> */}
                   <Header />
                   <div className='background-image' style={{position: "absolute", backgroundImage: "url("+bg+")", height:'90vh', width:'100%', backgroundSize:"cover" }} >
                   <Card style={{width:"300px",margin:"50px auto"}}>
                    {/* <TextField 
                        hintText="Get Location"
                        floatingLabelText="Get Location"
                        onChange={this.handleChange('location')}
                       // defaultValue={values.firstName}
                       errorText= {this.state.errorTextLocation}
                        />
                        <br/>
                     <TextField 
                        hintText="Specialist"
                        floatingLabelText="Specialist"
                         onChange={this.handleChange('specialist')}
                       // defaultValue={values.lastName}
                        /> */}
                        <br/>

                        {/* <Autocomplete suggestions={suggestions} flag = {1} /> */}
                        <Autocomplete />
                        <IntegrationAutosuggest />
                        <br />
                        {/* <Autocomplete specialityOrDoctor={specialityOrDoctor} flag = {2}/> */}
                 
                <RaisedButton
                        label ="Search"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                        />
                    </Card>
                    </div>
                </React.Fragment>

            </MuiThemeProvider>
        )
    }

}
const mapStateToProps = state => ({
    specialist : state.patient.specialist,
    drlocation : state.patient.drlocation,
    doctors : state.patient.doctors,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    saveLocation,get_Doctor,onLoadStepper,updateLocation,updateSpecialist
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search))
//export default withRouter(Search)
const styles = {
    button: {
        margin: 15
    }
};

  const specialityOrDoctor = [
    { label: 'Gananam       Doctor' },
    { label: 'General       Specialist' },
    { label: 'Ooje     Doctor' },
    { label: 'Ortho       Specialist' },
    { label: 'Palani      Doctor' },
    { label: 'Pyscho        Doctor' },
    
  ];

 
  
  