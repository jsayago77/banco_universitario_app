import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    Button,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getApiData } from '../providers/bankApiProvider';
import InfoModal from './infoModal';

const NewContact = () => {

    let { contactId } = useParams();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        body: '',
        color: '',
        isActive: false
    });

    const navigate = useNavigate();

    const [userAccount, setUserAccount] = useState('');
    const [contact, setContact] = useState({
        account_number: '',
        cedula: '',
    });

    useEffect(() => {

        if(contactId == undefined) return;
        getApiData({
            type: 'searchClient',
            method: 'GET',
            args: [contactId]
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "No se encontro el contacto", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setContact({
                        alias: data.data.alias,
                        description: data.data.description,
                        fullname: data.data.user.first_name + " " + data.data.user.last_name,
                        telefono: data.data.user.phone_number,
                        email: data.data.user.email,
                        account_number: data.data.account_number,
                        cedula: data.data.user.document_number
                    })
                }
            })
    }, []);

    function createContact() {
        getApiData({
            type: 'getClients',
            method: 'POST',
            args: {
                account_number: contact.account_number,
                alias: contact.alias,
                description: contact.description
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "Error en los campos", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setErrorMsg({ title: "Creado con exito", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                    setTimeout(function () {
                        navigate("/contacts");
                    }, 3000)
                }
            })
    }

    function updateContact() {
        getApiData({
            type: 'searchClient',
            method: 'PATCH',
            args: [contactId, {
                alias: contact.alias,
                description: contact.description
            }]
        }).then(response => response.json())
            .then(data => {
                //console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "Error en los campos", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setErrorMsg({ title: "Actualizado con exito", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                    setTimeout(function () {
                        navigate("/contacts");
                    }, 3000)
                }
            })
    }

    function searchUser() {
        getApiData({
            type: 'searchUser',
            method: 'GET',
            args: [userAccount]
        }).then(response => response.json())
            .then(data => {
                if (data.data === null) {
                    setErrorMsg({ title: "No se encontro usuario", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setContact({
                        fullname: data.data.first_name + " " + data.data.last_name,
                        telefono: data.data.phone_number,
                        email: data.data.email,
                        account_number: data.data.account_number,
                        cedula: data.data.document_number
                    })
                }
            })
    }

    return (
        <Row className='p-4'>
            <Row>
                <Col sm="12">
                    <Card className='rounded-4'>
                        <CardHeader className='sign-card-header rounded-4 rounded-bottom-0'>
                            Crear Contacto
                        </CardHeader>
                        <CardBody className='px-5'>
                            <Form>
                                <Row className='mb-5'>
                                    <Col>
                                        <FormGroup>
                                            <Label for="searchContact">Numero de Cuenta</Label>
                                            {!contactId ?
                                                <InputGroup>
                                                    <Input
                                                        id="number-account"
                                                        name="number_account"
                                                        type="text"
                                                        onChange={(e) => setUserAccount(e.target.value)}
                                                        value={userAccount}
                                                    />
                                                    <Button
                                                        style={{ backgroundColor: "#085F63" }}
                                                        type='button'
                                                        onClick={searchUser}
                                                    >
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </Button>
                                                </InputGroup>
                                                :
                                                <Input
                                                    type="text"
                                                    name="number_account"
                                                    id="number-account"
                                                    onChange={(e) => setContact({ ...contact, account_number: e.target.value })}
                                                    value={contact.account_number}
                                                    disabled
                                                />
                                            }
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="alias">Alias</Label>
                                            <Input
                                                type="text"
                                                name="alias"
                                                id="alias"
                                                placeholder="Alias"
                                                onChange={(e) => setContact({ ...contact, alias: e.target.value })}
                                                value={contact.alias}
                                                invalid={(contact.alias == '') ? true : false}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Descripción</Label>
                                            <Input
                                                type="text"
                                                name="description"
                                                id="description"
                                                placeholder="Descripción"
                                                onChange={(e) => setContact({ ...contact, description: e.target.value })}
                                                value={contact.description}
                                                invalid={(contact.description == '') ? true : false}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="text-center">
                                        <div style={{ display: 'inline-block' }}>
                                            <FontAwesomeIcon icon={faCircleUser} size='4x' color='#49BEB7' className="text-center pb-3" />
                                            <h4>{contact.fullname ? contact.fullname : 'Nombre del Contacto'}</h4>
                                            <small>{contact.cedula ? contact.cedula : ''}</small>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="Teléfono"
                                                    onChange={(e) => setContact({ ...contact, telefono: e.target.value })}
                                                    value={contact.telefono}
                                                    disabled />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Correo Electrónico"
                                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                    value={contact.email}
                                                    disabled />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='sign-register-btn justify-content-end '>
                <Link className='btn app-btn-outline mx-2' to='/contacts'>
                    Cancelar
                </Link>
                {!contactId ?
                    <Button onClick={createContact}>Crear</Button>
                    :
                    <Button onClick={updateContact}>Actualizar</Button>
                }
            </Row>
            <InfoModal modal={modal} title={errorMsg.title} body={errorMsg.body} color={errorMsg.color} toggle={toggle} />
        </Row>
    );
}

export default NewContact;