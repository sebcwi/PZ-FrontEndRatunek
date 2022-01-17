import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Lodziarnia = (props) => {
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
        </Row>
    </>)
}

export default Lodziarnia