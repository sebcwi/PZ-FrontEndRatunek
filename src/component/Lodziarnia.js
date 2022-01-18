import { Row,Col } from 'react-bootstrap';
import react,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import { postApiWithHead,getApiWithHead} from '../apiTools/apiTools';


const Lodziarnia = (props) => {

    const [favo, setFavo] = useState({})
    const [currentFavo,setCurrentFavo] = useState([])
    const [error,setError] = useState('')
    const [localUser,setLocalUser] = useState({})

    const handleAddFavo = () =>{
        const localUser = JSON.parse(localStorage.getItem('user'))
        const data = {nazwa: props.data.name,adress:props.data.adress}
        postApiWithHead('/user/addFavourite',data,localUser.data.token,setFavo,setError)
    }

    useEffect(()=>{
        const localUser = JSON.parse(localStorage.getItem('user'))
        getApiWithHead('/user/profile', localUser.data.token,setCurrentFavo,setError)
    },[setCurrentFavo])

    return(
    <>
        <Row className='border border-dark p-1 mx-2'>
            <p>Name: {props.data.name}</p>
            <p>Adress: {props.data.adress}</p>
            <p>City: {props.data.city}</p>
            <Link
                to={{
                    pathname: "/lodziarnia",
                    search: "?address=" + props.data.adress,
                }}>
                    Zobacz Wiecej
            </Link>
            <button className='btn btn-primary my-2' onClick={handleAddFavo}>Dodaj do ulubionych</button>
        </Row>
    </>)
}

export default Lodziarnia