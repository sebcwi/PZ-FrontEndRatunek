import { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import { getApi, postApiWithHead } from '../apiTools/apiTools'
import {useQuery} from '../tools/tools'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom'




const AddTastePage = () => {

    const [error,setError] = useState('')
    const address = useQuery().get('address');
    const [newTaste,setNewTaste] = useState('')
    const { register,handleSubmit } = useForm();
    const localUser = JSON.parse(localStorage.getItem('user'))
    let history = useHistory()
    


    const onAddTaste = (data) => {
        console.log(data)
        postApiWithHead('/lodziarnia/taste/add?address='+address,data,localUser.data.token,setNewTaste,setError)
        history.push('/profile')
    }

    return (<>
        <Row className="justify-content-center">
            {(error)?<p className='text-danger'>{error}</p>:null}
            <Col md={6}>
                <div className='card-container2'>
                <h2 className='title'>Dodaj smak</h2>
                <form className="justify-content-center my-5" onSubmit={handleSubmit(onAddTaste)}>
                    <input type="text" class="form-control my-2" placeholder='Nowa nazwa' {...register("nazwaSmaku")}/>
                    <label>
                        Dostepnosc
                        <input type="checkbox" class="form-check-input mx-4" {...register("dostepnosc")}/>
                    </label>
                    <br/>
                    <div className='title'>
                    <button type="submit" className="btn btn-primary my-5">Dodaj</button>
                    </div>
                </form>
                </div>
            </Col>
        </Row>
        
    </>)
}

export default AddTastePage