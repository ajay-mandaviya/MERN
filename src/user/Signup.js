import React , {useState} from 'react'
import Base from '../core/Base'
import {signUp} from '../auth/helper'


const SignUp = () =>{
    // 
    const [values, setValues] = useState({
        firstname : "",
        email : "",
        password  : "",
        error : "",
        success: false
    });

    const {firstname , email , password , error , success} = values

    const handleChange = e =>{
        const {name , value } = e.target;
        setValues({
            ...values ,
            [name] : value,
            error  : false,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(values); 
        signUp({firstname , email , password})
        .then(data =>{
            
            console.log("handle sbbmit data response"  , data);
            if(data.error){
                setValues({...values , error : data.error , success : false})
            }else{
                setValues({...values , firstname : "", email : "" , password : "" , success: true})
            }
        })
        .catch(err =>{
            console.log( "handle submit err",err);
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
    
    const signUpForm = () =>{
        return (
            <div className='row'>
               <div className='col-md-6 offset-sm-3 text-left'>
                   <form onSubmit  =  {handleSubmit}>
                     <div className='form-group'>
                         <label htmlFor='' className='text-light'>Name</label>
                         <input type='text' name='firstname' value={firstname} className='form-control'  onChange={handleChange}/>
                     </div>  
                     <div className='form-group'>
                         <label htmlFor='' className='text-light'>Email</label>
                         <input type='email' name='email' value={email}  className='form-control' onChange={handleChange}/>
                     </div>  
                     <div className='form-group'>
                         <label htmlFor='' className='text-light'>Password</label>
                         <input type='password' name='password' value={password} className='form-control' onChange={handleChange}/>
                     </div>  
                     <button className= "btn btn-success btn-block mt-2">Submit</button>
                   </form>
               </div> 
            </div>
        )
    }

    return (
        <Base title='Sign up Page' description='A Page for signup!'>

            {signUpForm()}
            {successMessage()}
            {errorMessage()}
        </Base>
    )
}
export default SignUp