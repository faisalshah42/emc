import React,{Component} from 'react';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';

import {GetData} from './services/GetData';
import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';


const columns = [
    {
        name: 'Reg #',
        selector: 'REG_NO',
      },
      {
      name: 'Brand',
      selector: 'BL_ASSET_DESC',
      sortable: true,
    },
    {
      name: 'Model',
      selector: 'MODEL_NO',
      sortable: true,
      right: true,
    },
    {
      name: 'Chassis #',
      selector: 'CHASSIS_NO',
      sortable: true,
      right: true,
    },
    {
      name: 'Previous Mileage',
      selector: 'PERVIOUS_MILEAGE',
      sortable: true,
      right: true,
    },
    {
      name: 'Current Mileage',
      selector: 'CURRENT_MILEAGE',
      sortable: true,
      right: true,
    },
    {
      name: 'Approx. Mileage for Oil change',
      selector: 'APPROX_MIL_OIL_CHANE',
      sortable: true,
      right: true,
    },
    {
        name: 'Approx. time for Oil change',
        selector: 'APPROX_TIME_OIL_CHANG',
        sortable: true,
        right: true,
      },
      {
        name: 'Assigned User Name',
        selector:'ASSIGNED_USER',
        right: true,
      }
    
  ];


class Vehicles extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            vehicle_list:[]
        }
    }

    componentDidMount(){
        this.GetVehicleData()
    }

    GetVehicleData(){

        GetData(`vehicle_list.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100`)
        .then((result)=>{
            if(result!==""){
                this.setState({
                    vehicle_list:result.VEHICLE_LIST
                });
            }
            else{
                this.setState({
                    redirect:false,
                    error:'Login Failed'
                })
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
                            <h2>Vehicles</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">Dashbard</a>
                                </li>
                                <li className="active">
                                    <strong>Vehicles</strong>
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
                                    data={this.state.vehicle_list} />
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
  
  export default connect(mapStateToProps, null)(Vehicles);