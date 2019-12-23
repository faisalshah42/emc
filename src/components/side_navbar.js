import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const SideNavbar = (props) =>{
console.log(props);
    return (
        <nav className="navbar-default navbar-static-side" style={{position:'fixed'}} role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element"> <span>
                            {/* <img alt="image" className="img-circle img-responsive" src="img/zender_logo.png" /> */}
                             </span>
                            <span className="clear"> 
                                <span className="block m-t-xs"> 
                                <b style={{marginBottom:'-10px',display:'block',color:'white'}}><small>Welcome</small> </b>
                                <br/>
                                    <strong className="font-bold" style={{color:'white'}}>{props.userRow.PARM_CURR_USER_NAME}</strong>
                                 </span> 
                                <span className="text-muted text-xs block">{props.userRow.PARM_CUSTOMER_CAT}</span> 
                             </span> 
                        </div>
                        <div className="logo-element">
                            IN+
                        </div>
                    </li>
                    <li>
                        <Link to="/"><i className="fa fa-home"></i> <span className="nav-label">Dashboard</span></Link>
                    </li>
                    
                    <li className="">
                        <Link to="/vehicles"><i className="fa fa-car"></i> <span className="nav-label">Vehicles</span></Link>
                    </li>

                    <li className="">
                        <Link to="/users"><i className="fa fa-user"></i> <span className="nav-label">Users</span></Link>
                    </li>
                    
                    <li className="">
                        <Link to="/saleInvoiceDetails"><i className="fa fa-file-text-o"></i> <span className="nav-label">Sale Invoice Details</span></Link>
                    </li>
                    
                    <li className="">
                        <Link to="/corporate"><i className="fa fa-credit-card"></i> <span className="nav-label">Corporate Billing Detail</span></Link>
                    </li>
                    <li>
                    <a>
                        <i className="fa fa-file-archive-o"></i> <span className="nav-label">Maintenance Report</span><span className="fa arrow"></span>
                    </a>
  
                        <ul className="nav nav-second-level">
                            <li>
                                <Link to="/maintenanceUser">User Wise </Link>
                                </li>
                            <li><Link to="/maintenanceVehilce">Vehicle Wise </Link></li>
                        </ul>
                    </li>
                    
                    <li>
                    <a>
                        <i className="fa fa-file-archive-o"></i> <span className="nav-label">Summary Report</span><span className="fa arrow"></span>
                    </a>
                        <ul className="nav nav-second-level">
                            <li><Link to="/summaryUser"> User Wise</Link></li>
                            <li><Link to="/summaryVehicle"> Vehicle Wise</Link></li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav>
     
    )
}


function mapStateToProps(state){
    return ({
        userRow: state.rootReducer.userRow
    });  
  
}

export default connect(mapStateToProps,null)(SideNavbar);