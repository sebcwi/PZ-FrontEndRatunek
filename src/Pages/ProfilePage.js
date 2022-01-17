import { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import {getApiWithHead, getCurrentUser } from '../apiTools/apiTools'

const ProfilePage = () => {

    const [currentUser,setCurrentUser] = useState({})
    const [error,setError] = useState('')
    let history = useHistory()

    useEffect(()=>{
        const localUser = JSON.parse(localStorage.getItem('user'))
        getApiWithHead('/user/profile', localUser.data.token,setCurrentUser,setError)
        
    },[])

    return (<>
    
        <Row>
            <Col className='p-2 mx-4'>
                <p>Name:{currentUser.data && currentUser.data.name}</p>
                <p>Email:{currentUser.data && currentUser.data.name}</p>
                 <p>Favor:</p>
                <ul>
                    {currentUser.data && currentUser.data.favourite.map((taste,key)=>{
                        return <li key={key}>{taste}</li>
                    })}
                </ul>
            </Col>
        </Row>
    
    </>)

}

export default ProfilePage