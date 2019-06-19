//action type constants
export const ADMIN_Doctor = 'ADMIN_Doctor'
//action creators
export function saveDoctorDetail(arr){
    
        return {
            type : 'ADMIN_Doctor',
            data : arr
        }
}

//action type constants
export const ADMIN_Avail_Doctor = 'ADMIN_Avail_Doctor'
//action creators
export function saveDoctorAvail(arr){
    
        return {
            type : 'ADMIN_Avail_Doctor',
            data : arr
        }
}

//action type constants
export const Update_appointment = 'Update_appointment'
//action creators
export function updateAppointment(obj){
    
        return {
            type : 'Update_appointment',
            data : obj
        }
}

//action type constants
export const Cancel_appointment = 'Cancel_appointment'
//action creators
export function cancelAppointment(obj){
    
        return {
            type : 'Cancel_appointment',
            data : obj
        }
}

//action type constants
export const Page_Navigate = 'Page_Navigate'
//action creators
export function pageNavigate(obj){
    
        return {
            type : 'Page_Navigate',
            data : obj
        }
}
//action type constants
export const Is_Login = 'Is_Login'
//action creators
export function loginPage(obj){
    
        return {
            type : 'Is_Login',
            data : obj
        }
}

