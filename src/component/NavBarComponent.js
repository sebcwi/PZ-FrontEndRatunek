import {Navbar,Container,Nav} from 'react-bootstrap'

function setProfile() {
    return (JSON.parse(localStorage.getItem('user')))?<Nav.Link href="/profile">Profile</Nav.Link>:null
}

const NavBarComponent = () => {

    
    return(<>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/mapa">Mapa</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    {setProfile()}
                </Nav>
            </Container>
        </Navbar>
    </>)
}

export default NavBarComponent