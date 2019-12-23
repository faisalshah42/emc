import React,{Component} from 'react';
import {GetData} from './services/GetData';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { saveUserData } from './redux/actions/action'


class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
            recievedData:'',
            error:''
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(event){
        
        event.preventDefault();
        GetData(`user_login.php?user_name=${this.state.username}&user_password=${this.state.password}`)
        .then((result)=>{
            if(result!==""){
                localStorage.setItem('dataOfUser', JSON.stringify(result));
                this.props.setUserData(result);
                this.setState({
                    recievedData:result,
                    redirect:true
                });   
            }
            else{
                this.setState({
                    redirect:false,
                    error:'Username or password is incorrect'
                })
            }
        });
    }
   
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){

        if(this.state.redirect){
            return (
            <Redirect  to={{
                pathname:'/',
                state: {data:this.state.recievedData}
            }} />
            )
        }

        return(
        <div className="middle-box text-center loginscreen  animated fadeInDown">
            <div>
                <div>
                    <h1 className="logo-name">EMC</h1>
                </div>
            <h3>Vehicle Management System</h3>

            <p>Login in To your Account</p>
                <form className="m-t">
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.onChange} required="" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange} required=""/>
                    </div>
                    <label className="text-danger">{this.state.error}</label>
                    <button type="button" onClick={this.login} className="btn btn-primary block full-width m-b">Login</button>

                </form>
                <p className="m-t"> <small>obemc.com.pk &copy; 2019</small> </p>
            </div>
        </div>  
        )
    }
}


  

function mapStateToProps(state){
    return ({
  
    });
  }
  const mapDispatchToProps = (dispatch) => ({
    setUserData: obj => dispatch(saveUserData(obj))
  })


export default connect(mapStateToProps,mapDispatchToProps)(Login);