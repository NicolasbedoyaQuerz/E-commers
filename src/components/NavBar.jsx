import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FavoriteSideBar from './FavoriteSideBar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [ show, setShow] = useState(false)
    const navigate = useNavigate()
    
    const handleClose = () => {
        setShow(false)
    }

    const sideBarAction = () => {
        const token = localStorage.getItem('token')

        if(token){
            setShow(true)
        }else{
            navigate('/login')
        }
    }

    return (
        <>
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/'>E-commers</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        <Nav.Link as={Link} to='/Favoritos'>Compras</Nav.Link>
                        <Nav.Link onClick={() => sideBarAction()}> Cart (sidebar)</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
        <FavoriteSideBar
        show={show}
        handleClose={handleClose}     
        />
        </>
    );
};

export default NavBar;