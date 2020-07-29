import validator from 'validator';


export function validatePhoneNumber(e){
    const value=e.target.value
    const isValidPhoneNumber = validator.isMobilePhone(value,["en-US"])
    return (isValidPhoneNumber);
   }
export function formatPhoneNumber(e){
    var returnvalue=true
    var returnobject=[]
    const value=e.target.value
    //if(value.length=3)
    var formatNum = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    if(validator.isMobilePhone(value)){
    if(formatNum.length > 12){
        returnvalue=false
    }
    else if(formatNum.length < 12){

        returnvalue=false
    }
}
else{
    returnvalue=false
}
    returnobject.push(returnvalue,formatNum)
    return returnobject

}


export function phonenumberlength(e){
const{id,value}=e.target


if(value.length > 10){
    console.log(id+" should of length 10")
}
else if(value.length < 10){
    console.log(id+" should of length 10")
}

}

export function alphabetvalidation(e){
    var letters = /^[A-Za-z]+$/;
    const{id,value}=e.target
    if(!value.match(letters)){
        console.log(id+" should be alphabets only")
    }
}
export function validateEmail(e){
    const value=e.target.value
    const isValidEmail = validator.isEmail(value);
    return(isValidEmail);
}
export function validateZipcode(e){
    const value=e.target.value
    const isValidZipcode = validator.isPostalCode(value,"US")
    return(isValidZipcode);
}
export function validateTaxID(e){
    const value=e.target.value
    const isValidTaxID = validator.isTaxID(value)
    return(isValidTaxID);
}
/*
export function validateEmail(e){
    const value=e.target
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(value);
    if(result===true){
      console.log("valid email")
    } else{
     console.log("inavlid email")
    }
  }
  */
