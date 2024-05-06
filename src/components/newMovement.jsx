import { getApiData } from '../providers/bankApiProvider';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InfoModal from './infoModal';
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
    InputGroup
} from 'reactstrap';

function NewMovement() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        body: '',
        color: '',
        isActive: false
    });

    const navigate = useNavigate();
    const [checked, setChecked] = useState('user');
    const [balance, setBalance] = useState(0);
    const [userAccount, setUserAccount] = useState('');
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
        if(userAccount != '') searchUser();
    }, [userAccount])

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
        movement.account_number = contact.account_number;
        getApiData({
            type: 'movements',
            method: 'POST',
            args: movement
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.data === null) {
                    setErrorMsg({ title: "Error en los campos", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                } else {
                    setErrorMsg({ title: "Transferencia realizada", body: data.message, color: '#dc3545', isActive: true });
                    toggle();
                    setTimeout(function () {
                        navigate("/movements");
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
                        account_number: data.data.account_number,
                        cedula: data.data.document_number
                    })
                }
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
                                <h4 className='my-3'>Bs. {balance.toLocaleString()}</h4>
                                <FormGroup>
                                    <Label for="amount">
                                        Monto *
                                    </Label>
                                    <Input
                                        id="amount"
                                        name="mov_amount"
                                        placeholder="0.00"
                                        type="number"
                                        onChange={(e) => setMovement({ ...movement, amount: parseFloat(e.target.value) })}
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
                                    <legend>Pagar a</legend>
                                    <Row className='px-5'>
                                        <FormGroup className='w-50'>
                                            <Input
                                                name="select_user"
                                                type="radio"
                                                value="contact"
                                                id="select-user-1"
                                                onChange={(e) => {
                                                    setUserAccount('');
                                                    setContact({ cedula: '', account_number: '' });
                                                    setChecked(e.target.value);
                                                }}
                                                checked={checked == 'contact'}
                                            />
                                            <Label for="select-user-1" className='mx-2'>
                                                Contacto
                                            </Label>
                                        </FormGroup>
                                        <FormGroup className='w-50'>
                                            <Input
                                                name="select_user"
                                                type="radio"
                                                value="user"
                                                id="select-user-2"
                                                onChange={(e) => {
                                                    setUserAccount('');
                                                    setContact({ cedula: '', account_number: '' });
                                                    setChecked(e.target.value);
                                                }}
                                                checked={checked == 'user'}
                                            />
                                            <Label for="select-user-2" className='mx-2'>
                                                Otro usuario
                                            </Label>
                                        </FormGroup>
                                    </Row>
                                </FormGroup>
                                {
                                    checked === "contact" &&
                                    <FormGroup>
                                        <Label for="contact">
                                            Contacto *
                                        </Label>
                                        <Input
                                            id="contact"
                                            name="mov_contact"
                                            placeholder="Buscar contacto"
                                            type="select"
                                            onChange={(e) => {
                                                const account_number = e.target.value;
                                                if (account_number != -1) {
                                                    setUserAccount(account_number);
                                                }
                                            }}
                                        >
                                            <option key={0} value={-1}>
                                                seleccione...
                                            </option>
                                            {contacts.map((option) => (
                                                <option key={option.document_number} value={option.account_number}>
                                                    {option.alias}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                }
                                <FormGroup>
                                    <Label for="contact-account">
                                        N° de Cuenta
                                    </Label>
                                    {
                                        checked === "contact" ?
                                            <Input
                                                id="contact-account"
                                                name="contact_account"
                                                placeholder=""
                                                type="text"
                                                onChange={(e) => setContact({ ...contact, account_number: e.target.value })}
                                                value={contact.account_number}
                                                disabled={checked === "contact" ? true : false}
                                            />
                                            :
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
                                    }

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
                                        disabled
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
                <InfoModal modal={modal} title={errorMsg.title} body={errorMsg.body} color={errorMsg.color} toggle={toggle} />
            </Card>
        </Row>
    )
}

export default NewMovement
