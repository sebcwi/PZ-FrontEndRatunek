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
            <Col className='p-2 mx-4'>
                <div className='card-container2'>
                <h2>Name:{currentUser.data && currentUser.data.name}</h2>
                <h2>Email:{currentUser.data && currentUser.data.name}</h2>
                 <h4>Favourite:</h4>
                <ul className='li2'>
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
                <button className="btn btn-danger" onClick={logOut}>Wyloguj</button>
                </div>
            </Col>
            <Col className='float-left'>
                <div className='card-container2'>
                <h2>Nowa Placowka</h2>
                {(done)?<p>Dodano</p>:null}
                <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="form-control mb-3" placeholder="city" {...register("city")}/>
                        <input type="text" className="form-control mb-3" placeholder="adress" {...register("address")}/>
                        <input type="number" className="form-control mb-3" placeholder="lat"  step="0.0000001" {...register("lat")}/>
                        <input type="number" className="form-control mb-3" placeholder="lon"  step="0.0000001" {...register("lon")}/>
                        <button type="submit" className="btn btn-primary">Rejestruj</button>
                </form>
                </div>
            </Col>
        </Row>
        <Row className='p-2 mx-4'>
            <div className='card-container2'>
            <h2>Twoje placowki</h2>
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
            </div>
        </Row>
    
    </>)

}

export default ProfilePage