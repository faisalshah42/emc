import React,{Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {GetData} from '../services/GetData';

class AutoCompleteText extends Component{
    constructor(props){
        super(props);

        this.items = [];

        this.state = {
            suggestions:[],
            text:'',
            userList:{},
            userID:''
        }

    }

    componentDidMount(){
        this.GetUserList()
    }

    GetUserList(){
        GetData(`party_user_list_det.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100`)
        .then((result)=>{
            if(result.error_code!==0){
                this.setState({
                    userList:result
                });
                console.log(result);
            }
        });
    }


    render(){
        const {userList} = this.state;
        let dataSourceConfig = {
            text: 'BL_USER_FULL_NAME',
            value: 'GET_APP_USER_ID',
        };
        console.log(this.state.userID);

        return(
            <Autocomplete
                id="combo-box-demo"
                onChange={(event, value) => (value) ? this.setState({userID:value.GET_APP_USER_ID}) : ""}
                options={userList.USER_LIST}
                getOptionLabel={option => option.BL_USER_FULL_NAME}
                datasourceconfig={dataSourceConfig}
                renderInput={params => (
                <TextField {...params} label="Combo box" variant="outlined" fullWidth />
               )
            }
            />
        )
       
    }
}

const mapStateToProps = ({ rootReducer }) => {
    return {
      user: rootReducer.userRow
    }
}
  
export default connect(mapStateToProps, null)(AutoCompleteText);