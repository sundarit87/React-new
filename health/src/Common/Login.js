import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton,Card } from 'material-ui'
import Header from "../Header";
import IntegrationNotistack from "./MyAlert";
import { Redirect, withRouter } from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//import {loginPage} from '../Admin/action'
import {loginPage} from '../Patient/action'
import Popup from 'react-popup';

var bg=require('./NoWaiting.jfif')

class Login extends Component{

    state ={
        UserName : "",
        Password : "",
        error : "",
        username_error_text : "",
        password_error_text : "",
        logindetails_error_text : "",
        result : []        
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };
 

    continue = e =>{
        //e.preventDefault();
        const {UserName,Password} = this.state

        if((UserName === undefined || UserName === null || UserName.length == 0) 
        || (Password === undefined && Password === null || Password.length == 0)){
            if(UserName === undefined || UserName === null || UserName.length == 0){
                this.setState({
                    username_error_text : "UserName should not be empty"
                })
            }else{  
                this.setState({
                    username_error_text : null
                })
            }

            if(Password === undefined && Password === null || Password.length == 0){
                this.setState({
                    password_error_text : "Password should not be empty"
                })
            }else{  
                this.setState({
                    password_error_text : null
                })
            }
        }else{
            
            //  if(UserName!='admin' && Password!='admin'){
            //     alert("Invalid UserName & Password")
            //  }
             //else{
                console.log(this.props.page)
                //console.log(Password)
                //this.validateDoctor(UserName,Password);
                
                   /* if(this.props.page == 1){
                        let obj = {
                            loggin : 'Login (Dr.)',
                            islogin : false
                        }
                        this.props.loginPage(obj)
                        this.props.history.push('/admin') //Karthick - Navigated to Admin Page
                    
        }*/
                    
                   // if(this.props.page == 2){
                       let doctorID = 0
                       console.log(UserName,Password)
                        fetch(`http://localhost:8088/login/?userName=${UserName}&password=${Password}`)
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            console.log(response.length);
                           // console.log(response[0].id);
                            doctorID = response[0].id;
                            this.setState({result:response})
                            if(this.state.result.length == 0){
                                alert("Invalid UserName or PassWord");
                            }else{
                                console.log("UserName",UserName)
                                console.log(doctorID)
                                let obj = {
                                    loggin : UserName,
                                    islogin : true,
                                    doctorID : doctorID
                                }
                                this.props.loginPage(obj)
                                this.props.history.push('/patientList')
                            }
                        })    
                        // console.log("starts validating");
                        // console.log(this.state.result.length)
                        // if(this.state.result.length == 0){
                        //     alert("Invalid UserName or PassWord");
                        // }else{
                        //     console.log(UserName)
                        //     let obj = {
                        //         loggin : UserName,
                        //         islogin : true
                        //     }
                        //     this.props.loginPage(obj)
                        //     this.props.history.push('/doctor')
                        // }
                    
                    }
                // }
                // else{
                //     alert("Invalid UserName or Password")
                // }
            //}
       // }
    };

    render(){
        const {values, handleChange} = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                   {/* //AppBar title="Home" /> */}
                   <Header />
                   <IntegrationNotistack />
                    <div className='background-image' style ={ {position: "absolute", backgroundImage: "url("+bg+")" ,height:'90vh', width:'100%', backgroundSize: "cover"} }>
                    <Card style={{width:"300px",margin:"50px auto"}}>
                    <TextField 
                        hintText="UserName"
                        floatingLabelText="User Name"
                        onChange={this.handleChange('UserName')}
                        errorText={this.state.username_error_text}
                       // defaultValue={values.firstName}
                        />
                        <br/>
                     <TextField 
                        hintText="Password"
                        floatingLabelText="Password"
                       onChange={this.handleChange('Password')}
                       errorText={this.state.password_error_text}
                       type="password"
                       // defaultValue={values.lastName}
                        />
                        <br/>
                 
                <RaisedButton
                        label ="Login"
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
//export default withRouter(Login)
const mapStateToProps = state => ({
    page : state.adm.page,
  })
  


const mapDispatchToProps = dispatch => bindActionCreators ({
    loginPage
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
const styles = {
    button: {
        margin: 15
    }
};