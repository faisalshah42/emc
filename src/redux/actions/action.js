export function userData (){
    return dispatch => {
        dispatch({
            type:'receivedUserData',
            payload:{
              USER_NAME:"muhammad.adnan",
              PARM_USER_PROFILE:"101",
              PARM_PARTY_ID:"6000000000527",
              PARM_CARD_TYPE:"P",
              PARM_CUSTOMER_CAT:"EMCI",
              USER_ID:"6000000000020"
            }
        });
    }
}

export function saveUserData (payload){
    return dispatch => {
        dispatch({
            type:'receivedUserData',
            payload
        });
    }
  }
