import { useNavigate, Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/logo-no-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faUserTie, faMoneyBillTransfer, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header';
import { useContext, useEffect } from 'react';
import { UserContext } from '../providers/userContext';
import { getApiData } from '../providers/bankApiProvider';
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

function AppContainer() {

    const { userData, setUserContext } = useContext(UserContext);
    const bankApiToken = sessionStorage.getItem('bankApiToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!bankApiToken) {
            navigate("/enter/login");
        }
        return () => {
        };
    }, []);

    useEffect(() => {
        getApiData({
            type: 'getUser',
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                const updatedUser = { ...userData, display_name: data.data.first_name + " " + data.data.last_name };
                setUserContext(updatedUser);
            })

        return () => {
        };
    }, []);

    function logout() {
        sessionStorage.removeItem('bankApiToken');
        navigate("/enter/login");
    }

    return (
        <Container fluid className=''>
            <Row className='position-relative'>
                <Col className='p-0' xs="2">
                    <div className='app-navbar'>
                        <Row className='app-logo'>
                            <img src={logo} alt="Banco Universitario" />
                        </Row>
                        <Row className='py-2 ps-4 flex-fill'>
                            <Nav vertical pills className='app-navitems'>
                                <NavItem>
                                    <NavLink className={'nav-link'} active to="/">
                                        <FontAwesomeIcon icon={faHouse} /> Inicio
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={'nav-link'} to="movements">
                                        <FontAwesomeIcon icon={faMoneyBillTransfer} /> Transferencias
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={'nav-link'} to="contacts">
                                        <FontAwesomeIcon icon={faUserTie} /> Contactos
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={'nav-link'} to="profile">
                                        <FontAwesomeIcon icon={faUser} />    Perfil
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Row>
                        <Row className='text-white'>
                            <Button className='app-logout' onClick={logout}><FontAwesomeIcon icon={faArrowLeftLong} /> Salir</Button>
                            <p className='app-copyright'>@2024 Banco Universitario</p>
                        </Row>
                    </div>
                </Col>
                <Col>
                    <Header pageName={userData.page_name} user={{ name: userData.display_name }} />
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}

export default AppContainer
