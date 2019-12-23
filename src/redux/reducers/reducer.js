const INITIAL_STATE = {    
    userRow:JSON.parse(localStorage.getItem('dataOfUser'))
};

export default (states = INITIAL_STATE, action)=>{
    console.log('action', action)
    switch(action.type){
        case 'receivedUserData':
            return({
                ...states,
                userRow: action.payload
            })
        break;
        
        default:
            return states;
    }
}

