import React from 'react'
import './NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    return (
        <div>

            <Navbar expand="lg" fixed="top" className="navbar justify-content-around">
                <Container>
                    <div>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src="./img/travel_logo.png"
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                            />
                            <span className='navbar-span badge text' style={{ color: 'white' }}>TrekXplorer</span>
                        </Navbar.Brand>
                    </div>
                    <div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="me-auto d-flex align-items-center" >
                                <Nav.Link href="#home" style={{ color: 'black' }}>Home</Nav.Link>
                                <Nav.Link href="#link" style={{ color: 'black' }}>About</Nav.Link>
                                <Nav.Link href="#link" style={{ color: 'black' }}>Agency</Nav.Link>
                                <Nav.Link href="#link" style={{ color: 'black' }}>Desitnation</Nav.Link>
                                <Nav.Link href="#link" style={{ color: 'black' }}>Profile</Nav.Link>
                                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>

                        </Navbar.Collapse>
                    </div>

                    <div>
                        
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="me-auto d-flex align-items-center" >
                                <Nav.Link href="#home" style={{ color: 'black' }}><button className='navloginbutton'>Login</button></Nav.Link>
                                <Nav.Link href="#link" style={{ color: 'black' }}></Nav.Link>
                                
                            </Nav>

                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>



        </div>
    )
}
