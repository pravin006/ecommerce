import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { getUserDetails,updateUser } from '../actions/userActions'

import { USER_UPDATE_RESET } from '../constants/UserConstants'

function EditUserScreen() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, success:successUpdate, error:errorUpdate} = userUpdate
    
    useEffect(() => {
        if (successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(id)){
            dispatch(getUserDetails(id))
            } else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

        
    }, [user,id,dispatch,successUpdate,navigate])
    

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }

    return (
        <div>
            

            <LinkContainer to= '/admin/userlist'>
                <Button variant='light' className='btn-sm'>
                    Go Back
                </Button>
            </LinkContainer>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> 
                : error ? <Message variant='danger'>{error}</Message>
                :(
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder='Enter Name'
                            value = {name}
                            onChange={(e) => setName(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email'
                            placeholder='Enter Email'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}>
                            
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check 
                            type='checkbox'
                            label='Is Admin'
                            checked = {isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}>
                            
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='dark' style={{ margin:'0.5%', width: '99%', borderRadius: '0' }} >Update</Button>
                </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default EditUserScreen