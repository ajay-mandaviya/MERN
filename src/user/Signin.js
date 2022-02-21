import React , {useState} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import {signIn , authenticate ,isAutheticated} from '../auth/helper'
const SignIn = () =>{


    const [values , setValues] = useState({
        email : "",
        password : "",
        error  :"",
        isLoading : false,
        didRedirect : false,
    })

const {email , password ,error ,  isLoading  , didRedirect} = values
const {user} = isAutheticated()
    const handleChange = (e) =>{
        const {name ,value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit =(e) =>{
            e.preventDefault()
            
            setValues({...values , error: false , loading : true})
            signIn({email , password})
            .then(data =>{
                if(data.error){
                    setValues({...values  , error : data.error , loading : false})
                }else{
                    authenticate(data , () =>{
                        setValues({...values , didRedirect  : true})
                    })
                }
            })
            .catch(err =>{
                console.log("err on click signin" , err);
            })
    }


    const successMessage = () =>{
        return (
            <div className='row'>
            <div className='col-md-6 offset-sm-3 text-left'>
            <div className='alert alert-success' style={{display : success ?  "block" : "none" , }}>New Account Created SuccessFully</div>
            </div>
            </div>
        )
      }

    const errorMessage = () =>{ 
    return(
        <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
        <div className='alert alert-success' style={{display : error ?  "block" : "none" , }}>{error}</div>
        </div>
        </div>
    )
    }


    const peformRedirect = () =>{
        if(didRedirect){
            if(user && user.role === 1){
                return <p>redirect to admin</p>
            }else{
                return <p>reducre to users</p>
            }
        }
        if(isAutheticated()){
            return <p>sdssfffffd</p>
        }
    }

    const  signInForm = () =>{
        return (
            <div className='row'>
               <div className='col-md-6 offset-sm-3 text-left'>
                   <form>
                     <div className='form-group'>
                         <label htmlFor='' className='text-light'>Email</label>
                         <input type='email'  className='form-control' name='email' value={values.email} onChange = {handleChange}/>
                     </div>  
                     <div className='form-group'>
                         <label htmlFor='' className='text-light'>Password</label>
                         <input type='password'  className='form-control' name='password' value={values.password} onChange = {handleChange}/>
                     </div>  
                     <button className= "btn btn-success btn-block mt-2" onClick={handleSubmit}>Submit</button>
                   </form>
               </div> 
            </div>
        )
    }

    return (
        <Base title='Sign In Page' description='Do Sign In !'>
            {signInForm()}
            {peformRedirect()}
            {errorMessage()}
            {successMessage()}
        </Base>
    )
}
export default SignIn