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
        {/* <p className="text-center">Api Status: {health.data}</p> */}
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