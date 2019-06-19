import {ADMIN_Doctor, Update_appointment,ADMIN_Avail_Doctor,Cancel_appointment,Page_Navigate,Is_Login} from './action'

const initialState = {
     doctors : []
    ,isloaded : false
    ,doctorsAvail : []
    ,page : 0
    ,loggin : "Login (Dr.)"
    ,islogin : false
   // ,doctor : {}
}
//anonymus function mess
export default function(state=initialState, action){
    const {type,data} = action
    console.log(data,type)
    switch(type){
      
        case ADMIN_Doctor :
        return {
            ...state,
            doctors : state.doctors.concat(data) ,
            //arr: state.arr.concat(action.newItem)
            isloaded : true
        };

        case ADMIN_Avail_Doctor :
        return {
            ...state,
            doctorsAvail : state.doctorsAvail.concat(data) ,
            //arr: state.arr.concat(action.newItem)
        //    / isloaded : true
        };

        case Update_appointment :
        let inputTemp = data.book
        let drName = data.drName
        let appointment_date = data.appointment_date
        console.log(input,drName)
        return {
            ...state,
            doctorsAvail:  state.doctorsAvail.map((post) => {
                console.log(post.drName,post.appointment_dateStr,inputTemp,drName.appointment_date)
            if (post.drName === drName && post.appointment_dateStr === appointment_date) {
            return {
              
            ...post,
                //isBooked1 : true
                //isBooked[data] : true
                [inputTemp]  : true
            }
            } else return post;
            })
        }
        case Cancel_appointment :
        let input = data.book
        let drNameValue = data.drName
        let appointmentdate = data.appointment_date
        console.log(input,drNameValue)
        return {
            ...state,
            doctorsAvail:  state.doctorsAvail.map((list) => {
                console.log('test',list.drName,drNameValue,list.appointment_dateStr)
            if(list.drName == drNameValue && list.appointment_dateStr == appointmentdate) {
                console.log('if')
            return {
              
            ...list,
                //isBooked1 : true
                //isBooked[data] : true
                [input]  : false
               //isBooked23 : false
            }
            } else return list;
            })
        }
        case Page_Navigate :
        console.log(data)
        return {
            ...state,
            page : data ,
            //arr: state.arr.concat(action.newItem)
        //    / isloaded : true
        };
        
        default :
        return state;
    }
}