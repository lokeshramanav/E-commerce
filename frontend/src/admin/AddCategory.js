import React , {useState} from "react";
import Layout from "../main/layout";
import {isAuthenticated} from "../auth";
import {Link } from "react-router-dom";
import {createCategory} from './ApiAdmin';


const AddCategory = ()=>{
    const [name, setName] = useState('')
    const [error, setError] = useState(false);
    const [success, setSuccess]= useState(false)

    const {user, token} = isAuthenticated();

    const handleChange = e=>{
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategory(user._id , token , {name} )
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setError('')
                setSuccess(true);
            }
        });

    }

    const showSuccess = ()=>{
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError= ()=>{
        if(error){
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    }

    const newCategoryForm = ()=>{
        return(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name}
                    autofocus/>
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Create Category</button>
        </form>);
    }

    const goBack = ()=>{
        return(
            <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
        )
    }

    return(
        <Layout title="Add a new category" description={`${name} Add a new category`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}</div>
            </div>
        </Layout>
    );
}

export default AddCategory;