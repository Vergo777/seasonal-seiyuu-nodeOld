import React from 'react';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import FontAwesome from 'react-fontawesome';

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
                <a href = "https://github.com/Vergo777/seasonal-seiyuu" target="#">
                    <FontAwesome name="github" size="2x" />
                </a>
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