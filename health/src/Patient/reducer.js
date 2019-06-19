import {Doctor_Detail, Patient_Detail, Patient_Selected_Time,
     Save_Location,Cancel_Doctor_Appointment, Get_Doctor, Is_Login, On_Load, UpdateLocation, UpdateSpecialist} from './action'

const initialState = {
    isfilterred : false
    ,doctor : {}
    ,patients : []
    ,selectedTime : ''
    ,bookingID : ''
    ,drlocation : ''
    ,specialist : ''
    ,appointment_date : ''
    ,title : "Health OTG"
    ,stepper : 0
    ,doctors : []
    ,sessions : ''
    ,slotID : 0
    ,doctorID : 0
    ,loggin : "Login (Dr.)"
    ,islogin : false
}
//anonymus function mess
export default function(state=initialState, action){
    const {type,data} = action
    
  
    console.log(data)
    switch(type){
      
        case Doctor_Detail :
                return {
                   ...state, doctor : data ,
                    //arr: state.arr.concat(action.newItem)
                    isfilterred : true,
                    title : "Doctor Availability",
                    stepper : 2
                };

        case Patient_Detail :
                return {
                    ...state,
                  // doctors : state.doctors.concat(data) ,
                   patients : state.patients.concat(data) ,
                   stepper : 4
                    //state.doctors.concat(data)
                };
        case Patient_Selected_Time :
            let selectedTime = data.selectedTime
            let bookingID = data.bookingID
            let appointment_date = data.appointment_date
            let sessions = data.sessions
            let slotID = data.slotID
            console.log(data,selectedTime,bookingID)
                    return {
                    ...state,
                    // doctors : state.doctors.concat(data) ,
                    selectedTime : selectedTime ,
                    bookingID : bookingID,
                    appointment_date : appointment_date,
                    title : "Request For Appointment",
                    stepper : 3,
                    sessions : sessions,
                    slotID : slotID
                    //state.doctors.concat(data)
                    };
        case Save_Location :
            let location = data.location
            let specialist = data.specialist
            console.log(data,location,specialist)
                    return {
                    ...state,
                    // doctors : state.doctors.concat(data) ,
                    drlocation : location ,
                    specialist : specialist,
                    title : "List Doctor near me",
                    stepper : 1
                    //state.doctors.concat(data)
                    };
                
        case Cancel_Doctor_Appointment :
        console.log(data)
        return {
            ...state, patients : state.patients.filter(list => list.bookingID != data) ,
            //arr: state.arr.concat(action.newItem)
            isfilterred : true
        };

        case Get_Doctor :
        return {
            ...state,
            doctors : data ,
            stepper : 1
            //arr: state.arr.concat(action.newItem)
            //isloaded : true
        };

        case Is_Login :
            console.log(data)
            let loggin  = data.loggin, islogin = data.islogin, doctorID = data.doctorID
            return {
                ...state,
                loggin : loggin ,
                islogin : islogin,
                doctorID : doctorID
                //arr: state.arr.concat(action.newItem)
            //    / isloaded : true
            };

        case On_Load :
            console.log(data)
        return {
            ...state,
            stepper : data ,
            //arr: state.arr.concat(action.newItem)
            //isloaded : true
        };
        case UpdateLocation :
            console.log(data)
        return {
            ...state,
            drlocation : data ,
            //arr: state.arr.concat(action.newItem)
            //isloaded : true
        };
        case UpdateSpecialist :
            console.log(data)
        return {
            ...state,
            specialist : data ,
            //arr: state.arr.concat(action.newItem)
            //isloaded : true
        };

        
        default :
        return state;
    }
}