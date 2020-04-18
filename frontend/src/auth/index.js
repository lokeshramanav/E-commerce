export const signup = user=>{
    return fetch("/api/user/adduser", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"        
      },
      body: JSON.stringify(user)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in SignUp: " + err);
      });
  } ;

  export const signin = user=>{
    return fetch("/api/user/signin", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"        
      },
      body: JSON.stringify(user)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log( "there is an error in SignUp: " + err);
      });
  } ;
  
//setting item in locat storage
export const authenticate = (data, next)=>{
    if(typeof window != 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next()
    }
}

export const signout = (next)=>{
    if(typeof window != 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch('/api/user/signout', {
            method:'GET',
        })
        .then(response=>{
            console.log("signout" , response);
        })
        .catch(err=>{
            console.log("error while signing out")
            console.log(err);
        })
    }
}

export const isAuthenticated = ()=>{
    if(typeof window == 'undefined'){
        return false
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}