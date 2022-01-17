import {Navbar,Container,Nav} from 'react-bootstrap'

function setLink(to,what) {
    return (JSON.parse(localStorage.getItem('user')))?<Nav.Link href={to}>{what}</Nav.Link>:null
}

const NavBarComponent = () => {

    
    return(<>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    {setLink('/home','Home')}
                    <Nav.Link href="/mapa">Mapa</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    {setLink('/profile','Profile')}
                </Nav>
            </Container>
        </Navbar>
    </>)
}

export default NavBarComponent