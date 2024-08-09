import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePost, setCurrentPage } from '../features/posts/postSlice';
import { Pagination, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import "./custom.css"


const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
};



function PostsList() {
    const dispatch = useDispatch();
    const { posts, currentPage, itemsPerPage } = useSelector(state => state.posts);

    // State to keep track of the current page block
    const [currentBlock, setCurrentBlock] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        email: '',
        phoneNumber: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const pagesPerBlock = 5;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfFirstPost + itemsPerPage);

    const totalBlocks = Math.ceil(totalPages / pagesPerBlock);
    const startPage = (currentBlock - 1) * pagesPerBlock + 1;
    const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
    const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

    if (currentPosts.length === 0) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
    </div>;

    const handleRemovePost = (id) => {
        dispatch(removePost(id));
    };

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const handleNextBlock = () => {
        if (currentBlock < totalBlocks) {
            setCurrentBlock(currentBlock + 1);
        }
    };

    const handlePreviousBlock = () => {
        if (currentBlock > 1) {
            setCurrentBlock(currentBlock - 1);
        }
    };

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, address, country, email, phoneNumber } = formData;
        if (firstName && lastName && address && country && email && phoneNumber) {
            setSubmitted(true);
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                country: '',
                email: '',
                phoneNumber: ''
            });
        }
    };


    return (
        <Container fluid>
            <Row    >
                <Col md={3} className="sidebar pt-4">
                    <div className='post-card2 mb-3'>
                        <div className='photo-container'>
                            <img src='https://www.codespeedy.com/wp-content/uploads/2020/01/test-1.jpg' alt='Profile' className='profile-photo' />
                        </div>
                        <div className='content'>
                            <h5>Hi Reader,</h5>
                            <p>Here's your News!</p>
                        </div>
                    </div>


                    <div className='post-card2 mb-3 centerData'>
                        <h3>
                            Have a Feedback?
                        </h3>
                        <Button className='' onClick={handleModalShow}>We're Listening!</Button>
                    </div>
                </Col>
                <Col md={9} className='mt-4 mb-5'>
                    <Row>
                        <Col className='posts-grid'>
                            {currentPosts.map((post) => (
                                <div key={post.id} className='flexData mb-5'>
                                    <div className='post-card'>
                                        <h2>{truncateText(post.title, 7)}</h2>
                                        <p>{truncateText(post.body, 7)}</p>
                                    </div>
                                    <div className='post-card1'>
                                        <Button className='colorData' onClick={() => handleRemovePost(post.id)}>X</Button>
                                    </div>
                                </div>
                            ))}
                        </Col>
                    </Row>
                    <Row className="custom-pagination-row">
                        <Pagination className='data'>
                            {currentBlock > 1 && (
                                <Pagination.Prev onClick={handlePreviousBlock}>Previous</Pagination.Prev>
                            )}
                            {pageNumbers.map(number => (
                                <Pagination.Item
                                    key={number}
                                    active={number === currentPage}
                                    onClick={() => handlePageChange(number)}
                                >
                                    {number}
                                </Pagination.Item>
                            ))}
                            {currentBlock < totalBlocks && (
                                <Pagination.Next onClick={handleNextBlock}>Next</Pagination.Next>
                            )}
                        </Pagination>
                    </Row>
                </Col>
            </Row>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFirstName" className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName" className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formAddress" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formCountry" className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email ID"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhoneNumber" className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        {submitted && <p className='mt-5'>Thank you for your feedback</p>}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default PostsList;
