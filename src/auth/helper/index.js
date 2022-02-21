import {API} from '../../backend.'

export const signUp = (user) =>{
    return fetch(`${API}/signup` , {
        method : "POST",
        body : JSON.stringify(user),
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json"
        }
    }).then(res =>{
        console.log("signup response is"  , res)
        return res.json()
    }).catch(err =>{
        console.log("err while signup" , err);
    }) 
}

export const signIn = user =>{
    return fetch(`${API}/signin` , {
        method : "POST",
        header : {
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        body : JSON.stringfy(user),
    })
    .then(response  =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const authenticate = (data , next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem("jwt" , JSON.stringify(data))
        next()
    }
}
export const signOut = next =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem("jwt")
        next()
    }   
    return fetch(`${API}/signout` , {
        method : "GET"
    })
    .then(response => console.log("signout successfull"  , response))
    .catch(err=>{
        console.log(err);
    })
}

export const isAutheticated = () =>{
    if(typeof window !== 'undefined'){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else {
        return false
    }
}
