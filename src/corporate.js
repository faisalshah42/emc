import React,{Component} from 'react';
import DataTable from 'react-data-table-component';
import {connect} from 'react-redux';

import {GetData} from './services/GetData';
import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';


const columns = [
    {
        name: 'Sale Invoice #',
        selector: 'DOC_NO',
      },
    {
        name: 'Vehicle Reg #',
        selector: 'REG_NO',
      },
      {
      name: 'User Name',
      selector: 'CUSTOMER_NAME',
      sortable: true,
    },
    {
      name: 'User Contact',
      selector: 'MAIN_CONTACT',
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


class Corporate extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            corporate_billing_list:[]
        }
    }

    componentDidMount(){
        this.GetCorporateBillingData()
    }

    GetCorporateBillingData(){

        GetData(`corp_billing_dt.php?party_id=${this.props.user.PARM_PARTY_ID}`)
        .then((result)=>{
            console.log(result);
            if(result!==""){
                console.log(result);
                this.setState({
                    corporate_billing_list:result.CORPORATE_BILLING_DETAIL
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
                            <h2>Corporate Billing Details</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">Dashboard</a>
                                </li>
                                <li className="active">
                                    <strong>Corporate Billing Details</strong>
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
                                    data={this.state.corporate_billing_list} />
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
  
  export default connect(mapStateToProps, null)(Corporate);