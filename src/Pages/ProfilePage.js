import { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {getApiWithHead, getApi, postApiWithHead } from '../apiTools/apiTools'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const ProfilePage = () => {

    const [currentUser,setCurrentUser] = useState({})
    const [place,setPlace] = useState({})
    const [done,setDone] = useState(false)
    const [lodziarnie,setLodziarnie] = useState('')
    const [error,setError] = useState('')
    const { register,handleSubmit } = useForm();
    let history = useHistory()
    const localUser = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        getApiWithHead('/user/profile', localUser.data.token,setCurrentUser,setError)
        getApi('/lodziarnia/all',setLodziarnie,setError)
    },[])

    const onSubmit = (data) => {
        postApiWithHead('/lodziarnia/register',data,localUser.data.token,setPlace,setError)
        setDone(true)
        
    }

    const logOut = () => {
        localStorage.removeItem('user')
        history.push('/login')
    }


    return (<>
    
        <Row>
            <Col className='p-2 mx-4 my-5'>
                <button className="btn btn-danger" onClick={logOut}>Wyloguj</button>
                <p>Name:{currentUser.data && currentUser.data.name}</p>
                <p>Email:{currentUser.data && currentUser.data.name}</p>
                 <p>Favourite:</p>
                <ul>
                    {currentUser.data && currentUser.data.favourite.map((taste,key)=>{
                        return <li key={key}>
                            <Link
                                to={{
                                    pathname: "/lodziarnia",
                                    search: "?address=" + taste.adress,
                                }}>
                                    {taste.nazwa} 
                            </Link>
                    </li>
                    })}
                </ul>
            </Col>
            <Col className='my-5'>
                <p>Nowa Placowka</p>
                {(done)?<p>Dodano</p>:null}
                <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control mb-3" placeholder="city" {...register("city")}/>
                        <input type="text" className="form-control mb-3" placeholder="adress" {...register("address")}/>
                        <input type="number" className="form-control mb-3" placeholder="lat"  step="0.0000001" {...register("lat")}/>
                        <input type="number" className="form-control mb-3" placeholder="lon"  step="0.0000001" {...register("lon")}/>
                        <button type="submit" className="btn btn-primary">Rejestruj</button>
                </form>
            </Col>
        </Row>
        <Row className='p-2 mx-4 my-5'>
            <p>Twoje placowki</p>
            {console.log(lodziarnie)}
            {
                lodziarnie.data && lodziarnie.data.map((item,key)=>{
                    
                    if(item.name == localUser.data.name){
                        return <Link
                                to={{
                                    pathname: "/editTastePage",
                                    search: "?address=" + item.adress,
                                }}>
                                    Adress: {item.city} {item.adress} {'<= kliknij aby edytowac asortyment'}
                            </Link>
                    }
                    else
                    {
                        return;
                    }
                })
            }
        </Row>
    
    </>)

}

export default ProfilePage