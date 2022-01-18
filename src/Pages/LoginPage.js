import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {login} from '../apiTools/apiTools'

const LoginPage = () => {

    const { register,handleSubmit } = useForm();
    const [error,setError] = useState('')
    let history = useHistory()

    const onSubmit = (data) => {
        
        if(login(data))
        {
            history.push('/profile')
        }
        else{
            setError('Nie ma takiego uzytkownika')
        }
        
    }

    return (<>
        <p className="text-center">Login</p>

        <Row className="justify-content-center my-5">
            {(error)?<p className='text-danger'>{error}</p>:null}
            <Col md={4}>
                <form className="justify-content-center" onSubmit={handleSubmit(onSubmit)}>
                    <input type="email" className="form-control mb-3" placeholder="Email" {...register("email")}/>
                    <input type="password" className="form-control mb-3" placeholder="Password" {...register("password")}/>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </Col>
        </Row>
        
    </>)

}

export default LoginPage