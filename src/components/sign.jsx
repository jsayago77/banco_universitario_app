import { useState } from 'react';
import logo from '../assets/logo-no-background.png';
import Routers from '../router/index';
import {
    Container,
    Row,
} from 'reactstrap';

function Sign() {
    return (
        <Container fluid className='p-0 sign-background'>
            <Row className='sign-logo my-5'>
                <img src={logo} alt="Banco Universitario" />
            </Row>
            <Row className='justify-content-center m-0 mt-3'>
                <Routers />
            </Row>
        </Container>
    )
}

export default Sign
