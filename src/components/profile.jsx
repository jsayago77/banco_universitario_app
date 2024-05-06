import React, { useContext, useEffect, useState } from 'react';
import InfoModal from './infoModal';
import moment from 'moment';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { getApiData } from '../providers/bankApiProvider';
import userCover from '../assets/user-cover.png';
import { UserContext } from '../providers/userContext';

const Profile = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        body: '',
        color: '',
        isActive: false
    });

    const { userData, setUserContext } = useContext(UserContext);
    const [changePwd, setChangePwd] = useState(false);
    const [pwd, setPwd] = useState({});
    const [user, setUser] = useState({
        account_number: '',
        cedula: '',
    });

    useEffect(() => {
        setUserContext({ ...userData, page_name: "Perfil" });
        getApiData({
            type: 'getUser',
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "No se encontro el usuario", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setUser({
                        fullname: data.data.first_name + " " + data.data.last_name,
                        telefono: data.data.phone_number,
                        email: data.data.email,
                        account_number: data.data.account_number,
                        cedula: data.data.document_number,
                        birthdate: data.data.birth_date
                    })
                }
            })
    }, []);

    function changePassword() {
        getApiData({
            type: 'changePassword',
            method: 'PATCH',
            args: pwd
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "Error al cambiar contraseña", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setErrorMsg({ title: "Contraseña cambiada", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                    setChangePwd(false);
                    setPwd({});
                }
            })
    }

    return (
        <Row className='p-4'>
            <Row className='app-section p-0'>
                <Row className='mx-0 p-0'>
                    <img src={userCover} alt="user-cover" style={{ padding: '0', margin: '0' }} />
                    <div className='header-user' style={{ border: 'solid .3em', padding: '0', position: 'relative', top: '-4em', marginLeft: '4em', marginBottom: '-3em', width: '6.5em', height: '6.5em' }}></div>
                </Row>
                <Row className='p-5 pt-0'>
                    <Col>
                        <h4>{user.fullname ? user.fullname : 'Nombre'}</h4>
                        <small className='ms-3'>C.I. {user.cedula ? user.cedula : ''}</small>
                    </Col>
                    <Col>
                        <small>Teléfono</small>
                        <p>
                        <div className='header-user' style={{margin: '.3em', padding: '.3em .5em', width: '2em', height: '2em', backgroundColor: '#FB7D5B'}}>
                        <FontAwesomeIcon icon={faPhone} />
                        </div>
                            {user.telefono ? user.telefono : ''}
                        </p>
                    </Col>
                    <Col>
                        <small>Correo Electrónico</small>
                        <p>
                        <div className='header-user' style={{margin: '.3em', padding: '.3em .5em', width: '2em', height: '2em', backgroundColor: '#FB7D5B'}}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        {user.email ? user.email : ''}
                        </p>
                    </Col>
                </Row>
            </Row>
            <Row className='app-section'>
                <Row className='px-3'>
                    <h4>Otros Datos</h4>
                </Row>
                <Row className='py-3 px-5'>
                    <Col>
                        <p className='mb-1'>Fecha de Nacimiento</p>
                        <small>{user.birthdate ? moment(user.birthdate).format('YYYY-MM-DD') : ''}</small>
                    </Col>
                    <Col>
                        <p className='mb-1'>Número de Cuenta</p>
                        <small>{user.account_number ? user.account_number : ''}</small>
                    </Col>
                    <hr className='my-3' />
                </Row>
                {!changePwd ?
                    <Row className='sign-register-btn justify-content-between px-5'>
                        <Button onClick={() => setChangePwd(true)}>Cambiar contraseña</Button>
                    </Row>
                    :
                    <Row>
                        <Form className='d-flex justify-content-evenly mb-5'>
                            <Col sm="5">
                                <FormGroup>
                                    <Label for="password">Contraseña actual</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder=""
                                        onChange={(e) => setPwd({ ...pwd, password: e.target.value })}
                                        value={pwd.password}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="5">
                                <FormGroup>
                                    <Label for="new-password">Nueva Contraseña</Label>
                                    <Input
                                        type="password"
                                        name="new_password"
                                        id="new-password"
                                        placeholder=""
                                        onChange={(e) => setPwd({ ...pwd, new_password: e.target.value })}
                                        value={pwd.new_password}
                                    />
                                </FormGroup>
                            </Col>
                        </Form>
                        <Row className='sign-register-btn justify-content-between'>
                            <Col className='text-end'>
                                <Button className='app-btn-outline mx-2' onClick={() => {setChangePwd(false); setPwd({})}}>Cancelar</Button>
                                <Button onClick={changePassword}>Cambiar contraseña</Button>
                            </Col>
                        </Row>
                    </Row>
                }
            </Row>
            <InfoModal modal={modal} title={errorMsg.title} body={errorMsg.body} color={errorMsg.color} toggle={toggle} />
        </Row>
    );
}

export default Profile;