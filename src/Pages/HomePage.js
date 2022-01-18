import react,{useState,useEffect} from "react";
import { getApi } from "../apiTools/apiTools";
import { Row,Col } from 'react-bootstrap';
import Lodziarnia from "../component/Lodziarnia";



const HomePage = () => {

    const [health,setHealth] = useState('')
    const [lodziarnie,setLodziarnie] = useState('')
    const [error,setError] = useState('')

    useEffect(()=>{
        getApi('/health/ping',setHealth,setError)
        getApi('/lodziarnia/all',setLodziarnie,setError)
    },[setLodziarnie,setHealth])

    return (<>
        <h1 className="text-center">Lodziarnie</h1>
        <Row>
            {lodziarnie && lodziarnie.data.map((lodziania,key)=>{
                return(
                <Col md={3} key={key}>
                    <Lodziarnia data={lodziania}/>
                </Col>
                )
            })}
        </Row>
    </>)

}

export default HomePage