import { getApiData } from '../providers/bankApiProvider';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

function NewMovement() {

    const [balance, setBalance] = useState(0);
    const [movement, setMovement] = useState({
        amount: 0,
        description: '',
        account_number: ''
    });

    const [contacts, setContacts] = useState({
        account_number: '',
        cedula: '',
    });

    const [contact, setContact] = useState({
        account_number: '',
        cedula: '',
    });

    useEffect(() => {
        getApiData({
            type: 'getBalance',
            method: 'GET',
        }).then(response => response.json())
        .then(data => {
            setBalance(data.data.balance)
        })

        getApiData({
            type: 'getClients',
            method: 'GET',
            args: {
                page: 1,
                page_size: 20
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.data)
            setContacts(data.data);
        })
    }, []);

    function createMovement() {
        getApiData({
            type: 'getBalance',
            method: 'POST',
            args: movement
        }).then(response => response.json())
        .then(data => {

        })
    }

    return (
        <Row className='p-4'>
            <Card className='mb-5 p-0 rounded-4'>
                <CardHeader className='sign-card-header rounded-4 rounded-bottom-0'>
                    Nueva Transferencia
                </CardHeader>
                <CardBody className='px-5'>
                    <Form>
                        <Row className='mb-5'>
                            <Col>
                                <h3 style={{ color: "#085F63" }}>Saldo Actual</h3>
                                <h3 className='my-2'>Bs {balance}</h3>
                                <FormGroup>
                                    <Label for="amount">
                                        Monto *
                                    </Label>
                                    <Input
                                        id="amount"
                                        name="mov_amount"
                                        placeholder="0.00"
                                        type="number"
                                        onChange={(e) => setMovement({ ...movement, amount: e.target.value })}
                                        value={movement.amount}
                                        invalid={(movement.amount == '') ? true : false}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">
                                        Descripción *
                                    </Label>
                                    <Input
                                        id="description"
                                        name="mov_description"
                                        placeholder="Descripcion"
                                        type="text"
                                        onChange={(e) => setMovement({ ...movement, description: e.target.value })}
                                        value={movement.description}
                                        invalid={(movement.description == '') ? true : false}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="contact">
                                        Contacto *
                                    </Label>
                                    <Input
                                        id="contact"
                                        name="mov_contact"
                                        placeholder="Buscar contacto"
                                        type="select"
                                        onChange={(e) => setMovement({ ...movement, account_number: e.target.value })}
                                        value={movement.account_number}
                                        invalid={(movement.account_number == '') ? true : false}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contact-cedula">
                                        Cedula de Identidad
                                    </Label>
                                    <Input
                                        id="contact-cedula"
                                        name="contact_cedula"
                                        placeholder=""
                                        type="text"
                                        onChange={(e) => setContact({ ...contact, cedula: e.target.value })}
                                        value={contact.cedula}
                                        disabled readonly
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="contact-account">
                                        N° de Cuenta
                                    </Label>
                                    <Input
                                        id="contact-account"
                                        name="contact_account"
                                        placeholder=""
                                        type="text"
                                        onChange={(e) => setContact({ ...contact, account_number: e.target.value })}
                                        value={contact.account_number}
                                        invalid={(contact.account_number == '') ? true : false}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='sign-register-btn justify-content-end '>
                            <Link className='btn app-btn-outline mx-2' to='/movements'>
                                Cancelar
                            </Link>
                            <Button onClick={createMovement}>Pagar</Button>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Row>
    )
}

export default NewMovement
