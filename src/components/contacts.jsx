import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { getApiData } from '../providers/bankApiProvider';
import { InputGroup, Input } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    ButtonGroup,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    Card, CardBody, CardTitle, CardText, CardHeader
} from 'reactstrap';

function Contacts() {
    const [contacts, setContacts] = useState([]);

    const { userData, setUserContext } = useContext(UserContext);

    useEffect(() => {
        setUserContext({ ...userData, page_name: "Contactos" });

        getApiData({
            type: 'getClients',
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                setContacts(data.data);
            })
    }, []);


    return (
        <Row className='p-4'>
            <Row className="justify-content-start">
                {/* <Col xs="auto">
                    <InputGroup className="rounded-pill border" style={{ borderColor: '#49BEB7' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-transparent border-0" style={{ color: '#49BEB7' }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                        <Input placeholder="Buscar" className="rounded-pill border-0 bg-transparent" style={{ color: '#49BEB7', borderLeft: 'none' }} />
                    </InputGroup>
                </Col> */}
            </Row>
            <Row className="flex-row justify-content-end my-3">
                {/* <UncontrolledDropdown className='mx-5' style={{ display: 'contents' }}>
                    <DropdownToggle caret className='app-btn-outline mx-3' style={{ backgroundColor: 'inherit' }}>
                        Ultimos
                    </DropdownToggle>
                    <DropdownMenu className='rounded-4'>
                        <DropdownItem onClick={() => getDataMultiplier(null)}>
                            Todos
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => getDataMultiplier(1)}>
                            Tipo de Cuenta
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => getDataMultiplier(-1)}>
                            Banco
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown> */}
                <Link className='btn app-btn' to='/new-contact'>
                    <FontAwesomeIcon icon={faPlus} size='lg' /> Nuevo
                </Link>
            </Row>
            {contacts.map(contact => (
                <Col className='d-flex' xl='3' md='4' sm='6' xs='12' key={contact.account_number}>
                    <Card className='mb-3 p-2 rounded-4' style={{ width: '18rem' }}>
                        <Row className='justify-content-end px-2'>
                            <UncontrolledDropdown className='mx-5' style={{ display: 'contents' }}>
                                <DropdownToggle className='' style={{ backgroundColor: 'inherit', color: '#000000', border: '0' }}>
                                    <FontAwesomeIcon icon={faEllipsis} size="lg" />
                                </DropdownToggle>
                                <DropdownMenu className='rounded-4'>
                                    <Link to={"/edit-contact/" + contact.id}>
                                        <DropdownItem>
                                            Ver
                                        </DropdownItem>
                                    </Link>
                                    <DropdownItem divider />
                                    <Link to={"/new-contact/" + contact.id}>
                                        <DropdownItem>
                                            Actualizar
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Row>
                        <FontAwesomeIcon icon={faCircleUser} size='4x' color='#49BEB7' className="text-center pt-3" />
                        <CardBody className="text-center">
                            <CardTitle>{contact.alias}</CardTitle>
                            <CardText>{contact.description}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Contacts