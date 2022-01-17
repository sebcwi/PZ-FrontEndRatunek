import react,{useState,useEffect} from "react";
import { getApi } from "../apiTools/apiTools";
import { Row,Col } from 'react-bootstrap';
import {useQuery} from '../tools/tools'

const LodziarniaPage = (props) => {

    const [lodziarnia,setLodziarnia] = useState('')
    const [taste,setTaste] = useState([])
    const [error,setError] = useState('')
    const address = useQuery().get('address');

    useEffect(()=>{
        getApi('/lodziarnia?address='+address,setLodziarnia,setError)
        getApi('/lodziarnia/taste?address='+address,setTaste,setError)
    },[setLodziarnia,setTaste])
    return(<>
    {taste && console.log(taste)}
        <Row className='p-2 mx-4'>
            <Col>
                <p>Name: {lodziarnia.data && lodziarnia.data.name}</p>
                <p>City: {lodziarnia.data && lodziarnia.data.city}</p>
                <p>Adress: {lodziarnia.data && lodziarnia.data.adress}</p>
                <p>Favour</p>
                <ul>
                    {taste.data && taste.data.map((favor,key)=>{
                        return(<li key={key}>{(favor.dostepnosc)?
                        <a className="text-success text-decoration-none">{favor.nazwaSmaku}</a>
                        :<a className="text-danger text-decoration-none">{favor.nazwaSmaku}</a>}</li>)
                    })}
                </ul>

            </Col>
        </Row>
    </>)
}

export default LodziarniaPage