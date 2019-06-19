import React, { Component } from "react";
import {MuiThemeProvider,AppBar, TextField, RaisedButton } from 'material-ui'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Header from "../Header";

import { Redirect, withRouter } from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {filterDoctorDetail} from './action'
import styled from 'styled-components';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
      maxWidth: 1200,
      margin: 20,
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
    }
  });

class ListDoctor extends Component{

    state = { 
        drlocation: "",
        specialist : "",
        data : []
     };

    //const {location, specailist} = this.props.patient
       // const data = this.props.doctors.filter((list,index)=>(list.location === location && list.specailist === specailist))

    componentDidMount(){
        console.log(this.props.drlocation)
        console.log(this.props.specialist)
        const {drlocation, specialist,doctors} = this.props
        //console.log(this.props.patient)
        //const {location,specailist} = this.props.patient
        //const doctors = this.props.doctors.filter((list,index)=>(list.location === location && list.specailist === specailist))
        this.setState({
            drlocation:  drlocation
            ,specialist : specialist
            ,data : doctors.filter((list,index)=>(list.location === drlocation && list.specailist === specialist))
        })

    }

    continue = hospName =>{
       // e.preventDefault();
        //this.props.nextStep();
        console.log(hospName)
        console.log(this.props.doctors)
        var filterData = this.props.doctors.filter(list=> list.hospitalName === hospName)
        console.log(filterData)
        filterData.map(list=>console.log(list))
        this.props.filterDoctorDetail(filterData)
       this.props.history.push('/selectAppointment')
    };


    render(){
        //const {values, handleChange} = this.props;
        
        const { classes } = this.props;
        const pathImag = "./images/9.jfif" ;
               return (
            <MuiThemeProvider>
                <React.Fragment>
                    {/* <AppBar title="Home" /> */}
                    <Header />
                    <br />
                    {/* {this.props.doctors.map((list,index)=> */}
                     {/* {this.state.data.map((list,index)=> */}
                     {/* <CustomGrid> */}
                      {this.props.doctors.map((list,index)=>
                      
                        <Paper className={classes.paper} >
                            <Grid className={classes.grid} container spacing={16} 
                            onClick={()=>this.continue(list.hospitalName)}
                           >
                            <Grid item >
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

                      {/* </CustomGrid> */}
                {/* <RaisedButton
                        label ="Continue"
                        primary={true}
                      //  style={styles.button}
                        onClick={this.continue}
                        />*/}
                </React.Fragment> 

            </MuiThemeProvider>
        )
    }

}
const mapStateToProps = state => ({
    doctors : state.adm.doctors,
    isloaded : state.adm.isloaded,
    specialist : state.patient.specialist,
    drlocation : state.patient.drlocation,
    doctors : state.patient.doctors,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
    filterDoctorDetail
},dispatch)

//export default ListDoctor
//export default withRouter(withStyles(styles)connect(mapStateToProps,mapDispatchToProps)(ListDoctor));
export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(ListDoctor))
)
//export default connect(mapStateToProps,)(withRouter(withStyles(styles)(ListDoctor))
//export default connect(mapStateToProps,mapDispatchToProps)(Admin)

const CustomGrid = styled.div`
display: grid;
padding: 1rem;
grid-template-columns: repeat(6, 1fr);
grid-row-gap: 1rem;
`;