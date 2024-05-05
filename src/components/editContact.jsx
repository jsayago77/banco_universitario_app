import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import InfoModal from './infoModal';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { getApiData } from '../providers/bankApiProvider';

const EditContact = () => {

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

    const [contact, setContact] = useState({
        account_number: '',
        cedula: '',
    });

    useEffect(() => {
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
                        descripcion: data.data.description,
                        fullname: data.data.user.first_name + " " + data.data.user.last_name,
                        telefono: data.data.user.phone_number,
                        email: data.data.user.email,
                        account_number: data.data.account_number,
                        cedula: data.data.user.document_number
                    })
                }
            })
    }, []);

    function deleteContact() {
        getApiData({
            type: 'searchClient',
            method: 'DELETE',
            args: [contactId]
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.data === null){
                setErrorMsg({ title: "Error al eliminar", body: "Ocurrio un error en la eliminacion", color: '#dc3545', isActive: true });
                toggle();
            } else {
                setErrorMsg({ title: "Eliminado con exito", body: data.message, color: '#dc3545', isActive: true });
                toggle();
                setTimeout(function(){
                    navigate("/contacts");
                }, 3000)
            }
        })
    }

    return (
        <Row className='p-4'>
            <Row>
                <Col sm="12">
                    <Card className='rounded-4'>
                        <CardHeader className='sign-card-header rounded-4 rounded-bottom-0'>
                            Ver Contacto
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="6">
                                    <Form>
                                        <FormGroup>
                                            <Label for="alias">Alias</Label>
                                            <Input
                                                type="text"
                                                name="alias"
                                                id="alias"
                                                placeholder="Alias"
                                                onChange={(e) => setContact({ ...contact, alias: e.target.value })}
                                                value={contact.alias}
                                                disabled
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Descripción</Label>
                                            <Input
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                placeholder="Descripcion"
                                                onChange={(e) => setContact({ ...contact, descripcion: e.target.value })}
                                                value={contact.descripcion}
                                                disabled
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="searchContact">Número de Cuenta</Label>
                                            <Input 
                                                type="text"
                                                name="account_number"
                                                id="account-number"
                                                placeholder="Numero de cuenta"
                                                onChange={(e) => setContact({ ...contact, account_number: e.target.value })}
                                                value={contact.account_number}
                                                disabled />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col sm="12" md="6" className="text-center p-2">
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
                                                disabled
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Correo Electrónico"
                                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                value={contact.email}
                                                disabled
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='sign-register-btn justify-content-between'>
                <Col>
                    <Button onClick={deleteContact} className='app-btn-red'>Eliminar</Button>
                </Col>
                <Col className='text-end'>
                    <Link className='btn app-btn-outline mx-2' to='/contacts'>
                        Cancelar
                    </Link>
                    <Link to={'/new-contact/' + contactId}>
                        <Button>Actualizar</Button>
                    </Link>
                </Col>
            </Row>
            <InfoModal modal={modal} title={errorMsg.title} body={errorMsg.body} color={errorMsg.color} toggle={toggle} />
        </Row>
    );
}

export default EditContact;