import React from 'react';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

export default function Header(props) {
    const searchValue = props.searchValue;
    const searchBoxChangeHandler = props.searchBoxChangeHandler;

    return(
        <Navbar fluid={true}>
            <Navbar.Header>
                <Link to="/">
                    <Navbar.Brand>
                        Seasonal Seiyuu
                    </Navbar.Brand>
                </Link>
            </Navbar.Header>
            <Navbar.Collapse>
                {window.location.pathname === "/" &&
                <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" value={searchValue} onChange={searchBoxChangeHandler} />
                    </FormGroup>
                </Navbar.Form>
                }
            </Navbar.Collapse>
        </Navbar>    
    );
};