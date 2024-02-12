import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


function ProductScreen() {
    const {id} = useParams()
  
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    useEffect(() =>{
        dispatch(listProductDetails(id))
        
    },[dispatch,id])

    

    return (
        <div>
            <Link to= '/' className='btn btn-light my-3'>Go back</Link>
            {loading ? <Loader/>
            : error? <Message variant='danger'>{error}</Message>
            :
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>

                <Col md={3} sm = {6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                {product.name}
                            </h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>


                        <ListGroup.Item>
                                Description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md = {3} sm = {6}>
                    <ListGroup >
                        <ListGroup.Item>
                                Price: ${product.price}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col> Status: </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" type='button'style={{ borderRadius: '0' }} disabled={product.countInStock === 0}>Add to Cart</Button>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

            </Row>}

            
        </div>
    )
}

export default ProductScreen