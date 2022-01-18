import react,{useState,useEffect} from "react";
import { getApi } from "../apiTools/apiTools";
import { Row,Col } from 'react-bootstrap';
import {useQuery} from '../tools/tools'
import App from '../App.css'

const LodziarniaPage = (props) => {

    const [lodziarnia,setLodziarnia] = useState('')
    const [taste,setTaste] = useState([])
    const [error,setError] = useState('')
    const address = useQuery().get('address');

    useEffect(()=>{
        getApi('/lodziarnia?address='+address,setLodziarnia,setError)
        getApi('/lodziarnia/taste?address='+address,setTaste,setError)
    },[setLodziarnia,setTaste])
    return(
    <>
        <Row className='p-2 mx-4'>
            <Col className="title">
            <div className="card-container">
                <h3>Name: {lodziarnia.data && lodziarnia.data.name}</h3>
                <h2>City: {lodziarnia.data && lodziarnia.data.city}</h2>
                <h2>Adress: {lodziarnia.data && lodziarnia.data.adress}</h2>
            </div>
            <div className="card-container">
                <h2>Favour</h2>
                <ul className="li2">
                    {taste.data && taste.data.map((favor,key)=>{
                        return(<li key={key}>{(favor.dostepnosc)?
                        <a className="text-success text-decoration-none">{favor.nazwaSmaku}</a>
                        :<a className="text-danger text-decoration-none">{favor.nazwaSmaku}</a>}</li>)
                    })}
                </ul>
            </div>
            <div className="card-container">
                <h2>Legenda:</h2>
                <ul className="li2">
                    <li className="text-success">
                        Dostepny
                    </li>
                    <li className="text-danger ">
                        Nie Dostepny
                    </li>
                    
                </ul>
            </div>
            </Col>
        </Row>
    </>)
}

export default LodziarniaPage