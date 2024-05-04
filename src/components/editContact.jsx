import React from 'react';
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
    CardHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const EditContact = () => {
    return (
        <Container style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
            <Row>
                <Col sm="12">
                    <Card className='rounded-4'>
                        <CardHeader className='rounded-top-4' style={{ backgroundColor: '#085F63', color: '#ffffff' }}>Crear Contacto</CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm="12" md="6">
                                    <Form>
                                        <FormGroup>
                                            <Label for="alias">Alias</Label>
                                            <Input type="text" name="alias" id="alias" placeholder="Alias" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Descripción</Label>
                                            <Input type="text" name="description" id="description" placeholder="Descripción" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="searchContact">Numero de Cuenta</Label>
                                            <Input type="text" name="search" id="searchContact" placeholder="Cuenta" />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col sm="12" md="6" className="text-center p-2">
                                    <div style={{ display: 'inline-block' }}>
                                        <FontAwesomeIcon icon={faCircleUser} size='4x' color='#49BEB7' className="text-center pb-3" />
                                        <h4>Nombre del Contacto</h4>
                                        <FormGroup>
                                            <Input type="text" name="phone" id="phoneNumber" placeholder="Teléfono" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="email" name="email" id="email" placeholder="Correo Electrónico" />
                                        </FormGroup>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="pt-3">
                <Col sm="12" style={{ textAlign: 'right', paddingRight: '15px' }}>
                    <Button color="secondary" style={{ marginRight: '10px' }}>Cancelar</Button>
                    <Button color="primary">Crear</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default EditContact;