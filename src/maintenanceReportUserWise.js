import React,{Component} from 'react';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {GetData} from './services/GetData';
import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';


const columns = [
    {
        name: 'Sale Invoice#',
        selector: 'DOC_NO',
    },
    {
      name: 'Vehicle Reg#',
      selector: 'REG_NO',
      sortable: true,
      right: true,
    },
    {
        name: 'Invoice Date',
        selector: 'DOC_DATE',
        sortable: true,
        right: true,
    },
    {
      name: 'Gross Amount',
      selector: 'TOTAL_GAMNT',
      sortable: true,
      right: true,
    },
    {
      name: 'Tax Amount',
      selector: 'TOTAL_TAX_AMNT',
      sortable: true,
      right: true,
    },
    {
      name: 'Total Amount',
      selector: 'TOTAL_AMNT',
      sortable: true,
      right: true,
    }
    
  ];


class MaintenanceReportUserWise extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            data_list:[],
            suggestions:[],
            text:'',
            userList:{},
            userDetailsID:'',
            partyID:''
        }

        this.onChangeUserList= this.onChangeUserList.bind(this);

    }

    componentDidMount(){
        this.GetUserList();
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

    onChangeUserList(event, value){
        if(value){
            GetData(`emc_vmm_maintenance_rpt.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100&crit_id=${value.GET_APP_USER_ID}&rpt_type=11`)
            .then((result)=>{
                if(result.error_code!==0){
                    this.setState({
                        data_list:result.MAINTENANCE_RPT
                    });
                }
                else {
                    this.setState({
                    data_list:''
                    })
                }
            });
        }
       
    }

    GetsaleInvoiceDetails(){
        GetData(`sale_invoice_dt.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100`)
        .then((result)=>{
            if(result.error_code!==0){
                this.setState({
                    data_list:result.SALE_INV_DET
                });
                console.log(result);
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

        let {userList} = this.state;
        let dataSourceConfig = {
            text: 'BL_USER_FULL_NAME',
            value: 'GET_APP_USER_ID',
        };

        return(
            <div id="wrapper" style={{background:' #293846'}}>
                <SideNavbar  />

                <div id="page-wrapper" className="gray-bg dashbard-1">
                    <div className="row border-bottom">
                        <TopNavbar />
                    </div>
                    <div className="row wrapper border-bottom white-bg page-heading">
                        <div className="col-lg-12">
                            <h2>Maintenance Report</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">Dashboard</a>
                                </li>
                                <li className="active">
                                    <strong>Maintenance Report</strong>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="wrapper wrapper-content  animated fadeInRight">
                        <div className="ibox">
                            {/* <div className="ibox-title">Vehicles List</div> */}
                            <div className="mail-box-header">
                                <div className="col-md-8 pull-right" style={{position:'relative'}}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    onChange={this.onChangeUserList}
                                    options={userList.USER_LIST}
                                    getOptionLabel={option => option.BL_USER_FULL_NAME}
                                    datasourceconfig={dataSourceConfig}
                                    renderInput={params => (
                                    <TextField {...params} label="Select User / Type Name" variant="outlined" fullWidth />
                                        )
                                }
                                />
                               </div>
                            <h2>
                                User Wise Report
                            </h2>
                            <div className="bb sep_30"></div>
                                <div className="mail-tools tooltip-demo m-t-md">
    
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p><b>Username:</b></p>
                                            <p>Syed Faisal Hussain</p>
                                        </div>
                                        <div className="col-md-3">
                                            <p><b>Email:</b></p>
                                            <p>faisal.shah@sgc.com.pk</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        
                                    </div>

                                </div>
                            </div>
                            <div className="ibox-content">
                                <DataTable
                                    title=""
                                    columns={columns}
                                    data={this.state.data_list} />
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
  
  export default connect(mapStateToProps, null)(MaintenanceReportUserWise);