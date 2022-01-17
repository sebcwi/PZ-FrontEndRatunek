import axios from "axios";

export const MY_API = 'http://localhost:3000'

const api = axios.create();

export async function getApi(part,setFunc,setErrFunc)
{
    api.get(MY_API+part)
    .then((response) => {
        setFunc(response)
    }).catch(err=>setErrFunc(err))
          
}

export async function getApiWithHead(part,token,setFunc,setErrFunc)
{
    api.get(MY_API+part,
        {
            headers: {'authorization': token}
        })
    .then((response) => {
        setFunc(response)
    }).catch(err=>setErrFunc(err))
          
}

export async function postApiWithHead(part,data,token,setFunc,setErrFunc)
{
    api.post(MY_API+part,data,
        {
            headers: {'authorization': token}
        })
    .then((response) => {
        setFunc(response)
    }).catch(err=>setErrFunc(err))
          
}

export async function login(data)
{
    await api.post(MY_API+"/user/login",data).then(function(response){
        localStorage.setItem('user',JSON.stringify(response))
        return true
    }).catch(function(error){
        localStorage.setItem('error',JSON.stringify(error))
        return false
    })
}

export async function registerUser(data)
{
    await api.post(MY_API+"/user/register",data).then(function(response){
        localStorage.setItem('user',JSON.stringify(response))
        return true
    }).catch(function(error){
        localStorage.setItem('error',JSON.stringify(error))
        return false
    })
}

export async function isLogin(){
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
        return true;
    }
    else
    {
        return false;
    }
}

