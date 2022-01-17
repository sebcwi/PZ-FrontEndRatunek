import { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import { getApi, postApiWithHead } from '../apiTools/apiTools'
import {useQuery} from '../tools/tools'
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom'




const EditTastePage = () => {

    const [error,setError] = useState('')
    const address = useQuery().get('address');
    const [taste,setTaste] = useState('')
    const [newTaste,setNewTaste] = useState('')
    const { register,handleSubmit } = useForm();
    const localUser = JSON.parse(localStorage.getItem('user'))
    let history = useHistory()
    

    useEffect(()=>{
        getApi('/lodziarnia/taste?address='+address,setTaste,setError)
    },[setTaste])

    const onEditTaste = (data) => {
        console.log(data)
        postApiWithHead('/lodziarnia/taste/edit?address='+address,data,localUser.data.token,setNewTaste,setError)
        history.push('/profile')
    }

    const onAddTaste = (data) => {
        console.log(data)
        // postApiWithHead('/lodziarnia/taste/add?address='+address,data,localUser.data.token,setNewTaste,setError)
        // history.push('/profile')
    }

    return (<>
        <Row className="justify-content-center">
            {(error)?<p className='text-danger'>{error}</p>:null}
            <Col md={5}>
                <p>Edytuj smak</p>
                <form className="justify-content-center my-5" onSubmit={handleSubmit(onEditTaste)}>
                    <select class="form-select" {...register("taste")}>
                        {taste.data && taste.data.map((item)=>{
                            return <option>{item.nazwaSmaku}</option>
                        })}
                    </select>
                    <input type="text" class="form-control my-2" placeholder='nazwa' {...register("newTaste")}/>
                    <label>
                        Dostepnosc
                        <input type="checkbox" class="form-check-input mx-4" {...register("dostepnosc")}/>
                    </label>
                    <br/>
                    <button type="submit" className="btn btn-primary my-5">Edytuj</button>
                </form>
                <Link
                    className="justify-content-center my-5"
                    to={{
                        pathname: "/addTastePage",
                        search: "?address=" + address,
                    }}>
                        Dodaj nowy Smak
                </Link>
            </Col>
            
        </Row>
        
    </>)
}

export default EditTastePage