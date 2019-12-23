import React,{Component} from 'react';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';

import {GetData} from './services/GetData';
import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';



const columns = [
    {
        name: 'User Name',
        selector: 'CUSTOMER_NAME',
        sortable: true
    },
    {
      name: 'Total Invoice',
      selector: 'TOTAL_INV',
      sortable: true,
      right: true,
    },
    {
        name: 'First Invoice Date',
        selector: 'FRIST_INV_DATE',
        sortable: true,
        right: true,
    },
    {
        name: 'Last Invoice Date',
        selector: 'LAST_INV_DATE',
        sortable: true,
        right: true,
    },
    {
      name: 'First Milage',
      selector: 'FIRST_MILEAGE',
      sortable: true,
      right: true,
    },
    {
        name: 'Last Milage',
        selector: 'LAST_MILEAGE',
        sortable: true,
        right: true,
    },
    {
      name: 'Gross Amount',
      selector: 'TOTAL_GRASS_AMOUNT',
      sortable: true,
      right: true,
    },
    {
      name: 'Tax Amount',
      selector: 'TOTAL_TAX_AMOUNT',
      sortable: true,
      right: true,
    },
    {
      name: 'Total Amount',
      selector: 'TOTAL_AMOUNT',
      sortable: true,
      right: true,
    }
    
  ];


class SummaryReportUserWise extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            data_list:[],
            userList:{},
            userDetailsID:'',
            partyID:''
        }

    }

    componentDidMount(){
        this.getSummaryReportUserWise();
    }

    getSummaryReportUserWise(){
        
        GetData(`emc_vmm_summary_rpt.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100&rpt_type=11`)
        .then((result)=>{
            if(result.error_code!==0){
                this.setState({
                    data_list:result.SUMMARY_RPT
                });
                console.log(result);
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
                            <h2>Summary Report</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <span>Dashboard</span>
                                </li>
                                <li>
                                    <span>Summary Report</span>
                                </li>
                                <li className="active">
                                    <strong>User Wise</strong>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="wrapper wrapper-content  animated fadeInRight">
                        <div className="ibox">
                        
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
  
  export default connect(mapStateToProps, null)(SummaryReportUserWise);