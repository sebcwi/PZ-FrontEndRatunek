import { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {getApiWithHead, getCurrentUser, isLogin } from '../apiTools/apiTools'
import { Link } from 'react-router-dom';

const ProfilePage = () => {

    const [currentUser,setCurrentUser] = useState({})
    const [error,setError] = useState('')
    let history = useHistory()

    useEffect(()=>{
        // if(isLogin()){
        //     history.push('/login')
        // }
        const localUser = JSON.parse(localStorage.getItem('user'))
        getApiWithHead('/user/profile', localUser.data.token,setCurrentUser,setError)
    },[])

    const logOut = () => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    return (<>
    
        <Row>
            <Col className='p-2 mx-4'>
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
        </Row>
    
    </>)

}

export default ProfilePage