//action type constants
export const Doctor_Detail = 'Doctor_Detail'
//action creators
export function filterDoctorDetail(obj){
    
    
        return {
            type : 'Doctor_Detail',
            data : obj
        }
}

//action type constants
export const Patient_Detail = 'Patient_Detail'
//action creators
export function savePatientDetail(obj){
    
        return {
            type : 'Patient_Detail',
            data : obj
        }
}

//action type constants
export const Patient_Selected_Time = 'Patient_Selected_Time'
//action creators
export function patientSelectedTime(obj){
    
        return {
            type : 'Patient_Selected_Time',
            data : obj
        }
}

//action type constants
export const Save_Location = 'Save_Location'
//action creators
export function saveLocation(obj){
    
        return {
            type : 'Save_Location',
            data : obj
        }
}

//action type constants
export const Cancel_Doctor_Appointment = 'Cancel_Doctor_Appointment'
//action creators
export function cancelDoctorAppointment(obj){
    
        return {
            type : 'Cancel_Doctor_Appointment',
            data : obj
        }
}

//action type constants
export const Get_Doctor = 'Get_Doctor'
//action creators
export function get_Doctor(obj){
    
        return {
            type : 'Get_Doctor',
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

//action type constants
export const On_Load = 'On_Load'
//action creators
export function onLoadStepper(stepper){
    
        return {
            type : 'On_Load',
            data : stepper
        }
}

//action type constants
export const UpdateLocation = 'UpdateLocation'
//action creators
export function updateLocation(location){
    
        return {
            type : 'UpdateLocation',
            data : location
        }
}

//action type constants
export const UpdateSpecialist = 'UpdateSpecialist'
//action creators
export function updateSpecialist(specialist){
    
        return {
            type : 'UpdateSpecialist',
            data : specialist
        }
}