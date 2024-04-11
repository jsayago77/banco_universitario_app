import logo from '../assets/logo-no-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faUserTie, faMoneyBillTransfer, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Header from './header';
import { Outlet } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

function AppSection({ children }) {
    
    return (
        <Container fluid className=''>
            <Row>
                <Col className='app-navbar' xs="2">
                    <Row className='app-logo'>
                        <img src={logo} alt="Banco Universitario" />
                    </Row>
                    <Row className='py-2 ps-4 flex-fill'>
                        <Nav vertical pills className='app-navitems'>
                            <NavItem>
                                <NavLink active href="#">
                                <FontAwesomeIcon icon={faHouse} /> Inicio
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} /> Transferencias
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">
                                <FontAwesomeIcon icon={faUserTie} /> Contactos
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">
                                <FontAwesomeIcon icon={faUser} />    Perfil
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                    <Row className='text-white'>
                        <Button className='app-logout'><FontAwesomeIcon icon={faArrowLeftLong} /> Salir</Button>
                        <p className='app-copyright'>@2024 Banco Universitario</p>
                    </Row>
                </Col>
                <Col>
                    <Header pageName='Inicio' user={{lastConnection:'01-04-2024', name:'pepa pelona'}} />
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}

export default AppSection
