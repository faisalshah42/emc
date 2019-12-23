import React,{Component} from 'react';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';

import {GetData} from './services/GetData';
import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';


const columns = [
    {
        name: 'User Name',
        selector: 'BL_USER_FULL_NAME',
      },
      {
      name: 'Email',
      selector: 'EMAIL',
      sortable: true,
    },
    {
      name: 'Contact',
      selector: 'CELL_NO',
      sortable: true,
    },
    {
      name: 'Coordinates',
      selector: 'COORDINATES',
      sortable: true,
      right: true,
    }
  ];


class UserList extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            users_list:[]
        }
    }

    componentDidMount(){
        this.GetUserListData()
    }

    GetUserListData(){
        let user_ID ='';
        let type_id = this.props.user.PARM_USER_PROFILE;

        if(type_id==='100'){

            user_ID = this.props.user.PARM_PARTY_ID;

        } else if (type_id==='101'){

           user_ID = this.props.user.USER_ID;
           
        }
        debugger;

        GetData(`party_user_list.php?user_id=${user_ID}&type_id=${type_id}`)
        .then((result)=>{
            console.log(result);
            if(result!==""){
                this.setState({
                    users_list:result.USER_LIST
                });
            }
        });
    }

    render(){
        return(
            <div id="wrapper" style={{background:' #293846'}}>
                <SideNavbar  />

                <div id="page-wrapper" className="gray-bg dashbard-1">
                    <div className="row border-bottom">
                        <TopNavbar />
                    </div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-12">
                            <h2>Users</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">Dashboard</a>
                                </li>
                                <li className="active">
                                    <strong>Users </strong>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="wrapper wrapper-content  animated fadeInRight">
                        <div className="ibox">
                            {/* <div className="ibox-title">Vehicles List</div> */}
                            <div className="ibox-content">
                                <DataTable
                                    title=""
                                    columns={columns}
                                    data={this.state.users_list} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ rootReducer }) => {
    return {
      user: rootReducer.userRow
    }
  }
  
  export default connect(mapStateToProps, null)(UserList);