import React from 'react';
import Layout from '../main/layout';
// import { API } from '../config';
import {signup} from '../auth';
const Signup = ()=>{

const [values , setUserValues] = React.useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
  });

const handleStateChange = name => event =>{
  setUserValues({...values, error: false, [name]: event.target.value })
}

//Destructureing the values
const {name , email , password , error , success} = values

const submitUserValues = (event)=>{
  event.preventDefault()
  signup({name , email, password})
  .then(data=>{
    if(data.error){
      setUserValues ({...values, error:data.error, success: false})
    }
    else{
      setUserValues({...values, name:'', email:'', password:'', error:'', success: true})
    }
  });
}

const showError = ()=>{
  return <div className="alert alert-danger" style={{display: error ? '': 'none'}}>{error}</div>
}

const showSuccess = ()=>{
  return <div className="alert alert-info" style={{display: success ? '': 'none'}}>Account created Please Singin <link to="/signin"></link></div>
}


const singUpForm = ()=>{
    return (<form>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleStateChange('name')} type="text" className="form-control" value={name}/>
              </div>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleStateChange('email')} type="email" className="form-control" value={email}/>
              </div>
              <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleStateChange('password')} type="Password" className="form-control" value={password}/>
              </div>
              <button onClick={submitUserValues} className="btn btn-primary">Submit</button>
            </form>);
  };



  return (
    <Layout 
    title="Signup" 
    description="new users can sign up to My react ecommernce application"
    className="container">
    {showError()}
    {showSuccess()}
    {singUpForm()}
    </Layout>
    
    );
}

export default Signup;
