import React,{Component} from 'react';
import {connect} from 'react-redux';

import SideNavbar from './components/side_navbar';
import TopNavbar from './components/top_navbar';
import {GetData} from './services/GetData';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        TOTAL_ASSETS:'0',
        TOTAL_INVOICES:'0',
        TOTAL_USERS:'0'
    }
  }
  componentDidMount(){
    console.log(this.props.user.PARM_PARTY_ID);

    // if(this.props.location.state){
    //   // this.setState({})
    //   obj = this.props.location.state.data;

    // }
    // console.log(obj)
    // //   obj = {};
  
    // this.props.changeStateToReducer();
    this.getDashboardStats();
  }

  getDashboardStats(){
    GetData(`dashboard_dt.php?party_id=${this.props.user.PARM_PARTY_ID}`)
    .then((result)=>{
        console.log(result);
        if(result.error_code!==0){
            
            this.setState({
                TOTAL_ASSETS:result.DASHBOARD_DETAIL[0]['TOTAL_ASSETS'],
                TOTAL_INVOICES:result.DASHBOARD_DETAIL[0]['TOTAL_INVOICES'],
                TOTAL_USERS:result.DASHBOARD_DETAIL[0]['TOTAL_USERS'],
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

 

    return (
      <div id="wrapper" style={{background:' #293846'}}>
        
            <SideNavbar  />

        <div id="page-wrapper" className="gray-bg dashbard-1">

        <div className="row border-bottom">
            <TopNavbar />
        </div>
              
              <div className="row">
                  <div className="wrapper wrapper-content">      
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-success pull-right">Monthly</span>
                                <h5>Vehicle</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.TOTAL_ASSETS}</h1>
                                
                                <h3>Total Vehicles</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-info pull-right">Annual</span>
                                <h5>Users</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.TOTAL_USERS}</h1>
                                
                                <h3>Total Users</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-primary pull-right">Today</span>
                                <h5>Invoices</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.state.TOTAL_INVOICES}</h1>
                               
                                <h3>Total Invoices</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
            

        <div className="row">
            <div className="col-lg-12">
                <div className="wrapper wrapper-content">
                        <div className="row">

                        </div>
                </div>
                {/* <div className="footer">
                    <div className="pull-right">
                        10GB of <strong>250GB</strong> Free.
                    </div>
                    <div>
                        <strong>Copyright</strong> Example Company &copy; 2014-2015
                    </div>
                </div> */}
            </div>
        </div>

        </div>
    </div>  
    );
  }

}

const mapStateToProps = ({ rootReducer }) => {
  return {
    user: rootReducer.userRow
  }
}

export default connect(mapStateToProps, null)(App);
