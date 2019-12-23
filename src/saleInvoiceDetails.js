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
        name: 'Item Name',
        selector: 'ITEM_NAME',
    },
    {
      name: 'QTY',
      selector: 'QTY',
      sortable: true,
      right: true,
    },
    {
        name: 'Rate',
        selector: 'RATE',
        sortable: true,
        right: true,
    },
    {
        name: 'Gross Amount',
        selector: 'GAMNT',
        sortable: true,
        right: true,
    },
    {
      name: 'Discount Amount',
      selector: 'DISC_AMOUNT',
      sortable: true,
      right: true,
    },
    {
      name: 'Tax Amount',
      selector: 'TAX_AMNT',
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


class SaleInvoiceDetail extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid:'',
            typeId:'',
            data_list:[],
            invoiceList:[],
            masterData:[{
                DOC_NO:'-',
                DOC_DATE:'-',
                TOTAL_AMNT:'-',
                CUSTOMER_NAME:'-',
                REG_NO:'-',
                BL_PABX:'-'
            }]
        }

        this.onChangeDocList= this.onChangeDocList.bind(this);

    }

    componentDidMount(){
        this.GetDocList();
    }

    GetDocList(){
        GetData(`party_doc_list.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100`)
        .then((result)=>{
            if(result.error_code!==0){
                this.setState({
                    invoiceList:result
                });
                
            }
        });
    }

    onChangeDocList(event, value){
        if(value){
            GetData(`sale_invoice_mt.php?user_id=${this.props.user.PARM_PARTY_ID}&type_id=100&doc_no=${value.DOC_NO}`)
            .then((result)=>{
                if(result.error_code!==0){
                    this.setState({
                        data_list:result.SALE_INV_DET,
                        masterData:result.SALE_INV_MT
                    });
                }
                else {
                    this.setState({
                    data_list:'',
                    masterData:''
                    })
                }
            });
        }
       
    }

    

    render(){

        let {invoiceList, masterData} = this.state;
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
                            <h2>Sale Invoice Details</h2>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="index.html">Dashbard</a>
                                </li>
                                <li className="active">
                                    <strong>Sale Invoice Details</strong>
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
                                    onChange={this.onChangeDocList}
                                    options={invoiceList.DOC_LIST}
                                    getOptionLabel={option => option.DOC_NO}
                                    datasourceconfig={dataSourceConfig}
                                    renderInput={params => (
                                    <TextField {...params} label="Select / Type Invoice Number" variant="outlined" fullWidth />
                                        )
                                }
                                />
                               </div>
                            <h2>
                            Sale Invoice Details
                            </h2>
                            <div className="bb sep_30"></div>
                                <div className="mail-tools tooltip-demo m-t-md">
    
                                    <div className="row">
                                        <div className="col-md-3">
                                            <p><b>Invoice#:</b></p>
                                            <p>{masterData[0]['DOC_NO']}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <p><b>Invoice Date:</b></p>
                                            <p>{masterData[0]['DOC_DATE']}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <p><b>Registration#:</b></p>
                                            <p>{masterData[0]['REG_NO']}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <p><b>User Name:</b></p>
                                            <p>{masterData[0]['CUSTOMER_NAME']}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-md-3">
                                            <p><b>User Contact#:</b></p>
                                            <p>{masterData[0]['BL_PABX']}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <p><b>Total Amount:</b></p>
                                            <p>{masterData[0]['TOTAL_AMNT']}</p>
                                        </div>
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
  
  export default connect(mapStateToProps, null)(SaleInvoiceDetail);