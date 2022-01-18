import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {login,registerUser} from '../apiTools/apiTools'

const RegisterPage = () => {

    const { register,handleSubmit } = useForm();
    const [error,setError] = useState('')
    let history = useHistory()

    const onSubmit = (data) => {
        
        if(registerUser(data))
        {
            history.push('/login')
        }
        else{
            setError('Nie ma takiego uzytkownika')
        }
        
    }

    return (<>
        <p className="text-center">Register</p>

        <Row className="justify-content-center">
            {(error)?<p className='text-danger'>{error}</p>:null}
            <Col md={4} className="my-5">
                <form className="justify-content-center" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className="form-control mb-3" placeholder="Name" {...register("name")}/>
                    <input type="email" className="form-control mb-3" placeholder="Email" {...register("email")}/>
                    <input type="password" className="form-control mb-3" placeholder="Password" {...register("password")}/>
                    
                    
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </Col>
        </Row>
        
    </>)

}

export default RegisterPage