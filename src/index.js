import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';


import Login from './Login';
import App from './App';
import Vehicles from './vehicles';
import Users from './userList';
import Corporate from './corporate';
import saleInvoiceDetails from './saleInvoiceDetails';
import maintenanceReportUserWise from './maintenanceReportUserWise';
import maintenanceReportVehicleWise from './maintenanceReportVehicleWise';
import summaryReportUserWise from './summaryReportUserWise';
import summaryReportVehicleWise from './summaryReportVehicleWise';





ReactDOM.render(

<Provider store={store}>
    <BrowserRouter >
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route path="/saleInvoiceDetails" component={saleInvoiceDetails} />
        <Route path="/maintenanceUser" component={maintenanceReportUserWise} />
        <Route path="/maintenanceVehilce" component={maintenanceReportVehicleWise}/>
        <Route path="/corporate" component={Corporate} />
        <Route path="/vehicles" component={Vehicles} />
        <Route path="/summaryUser" component={summaryReportUserWise} />
        <Route path="/summaryVehicle" component={summaryReportVehicleWise}/>
    </BrowserRouter>
</Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

