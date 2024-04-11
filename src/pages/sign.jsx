import logo from '../assets/logo-no-background.png';
import {
    Container,
    Row,
} from 'reactstrap';
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function Sign() {
    useEffect(() => {
        // Aplicar estilos al body
        document.body.style.background = 'linear-gradient(to bottom, #ffffff 7%, #085F63 50%)';
        document.body.style.margin = '0';
        document.body.style.height = '100vh';
      
        // Limpieza al desmontar el componente
        return () => {
            // Restaurar estilos originales del body
            document.body.style.background = '';
            document.body.style.height = '0';
        };
    }, []);

    return (
        <Container fluid className='p-0 sign-background'>
            <Row className='sign-logo my-5'>
                <img src={logo} alt="Banco Universitario" />
            </Row>
            <Row className='justify-content-center m-0 mt-3'>
                <Outlet />
            </Row>
        </Container>
    )
}

export default Sign
