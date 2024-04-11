import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { getApiData } from '../providers/bankApiProvider';
import { UserContext } from '../providers/userContext';
import { useState, useContext } from 'react';

function SignUp() {

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        document_number: '',
        birth_date: '',
        phone_number: '',
        email: '',
        password: ''
    });

    const { userData, setUserContext } = useContext(UserContext);
    const navigate = useNavigate();

    function register(){
        user.birth_date = new Date(user.birth_date)
        getApiData({
            type: 'signUp',
            method: 'POST',
            args: user
        }).then( data => {
            sessionStorage.setItem('bankApiToken', data.data.jwt);

            const updatedUser = { ...userData, display_name: data.data.first_name + " " + data.data.last_name };
            setUserContext(updatedUser);

            navigate("/");

        } )

    }

    return (
        <Card className='mb-5 p-0 rounded-4 card-custom signup'>
            <CardHeader className='sign-card-header rounded-4 rounded-bottom-0'>
                Registrarse
            </CardHeader>
            <CardBody className='px-4'>
                <Form>
                    <Row>
                        <Col className='mx-3'>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="first_name">
                                            Nombre
                                        </Label>

                                        <Input
                                            id="first_name"
                                            name="user_first_name"
                                            placeholder="Nombre"
                                            type="text"
                                            onChange={ (e) => setUser({ ...user, first_name: e.target.value }) }
                                            value={user.first_name}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="last_name">
                                            Apellido
                                        </Label>

                                        <Input
                                            id="last_name"
                                            name="user_last_name"
                                            placeholder="Apellido"
                                            type="text"
                                            onChange={ (e) => setUser({ ...user, last_name: e.target.value }) }
                                            value={user.last_name}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="identity_card">
                                        Cédula de Identidad
                                    </Label>

                                    <Input
                                        id="identity_card"
                                        name="user_identity_card"
                                        placeholder="00.000.000"
                                        type="text"
                                        onChange={ (e) => setUser({ ...user, document_number: e.target.value }) }
                                        value={user.document_number}
                                    />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="birth_date">
                                        Fecha de Nacimiento
                                    </Label>

                                    <Input
                                        id="birth_date"
                                        name="user_birth_date"
                                        placeholder="mm/dd/yyyy"
                                        type="date"
                                        onChange={ (e) => setUser({ ...user, birth_date: e.target.value }) }
                                        value={user.birth_date}
                                    />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="phone_number">
                                        Teléfono
                                    </Label>

                                    <Input
                                        id="phone_number"
                                        name="user_phone_number"
                                        placeholder="0000-000-0000"
                                        type="number"
                                        onChange={ (e) => setUser({ ...user, phone_number: e.target.value }) }
                                        value={user.phone_number}
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                        <Col className='mx-3'>
                            <Row>
                                <FormGroup>
                                    <Label for="email">
                                        Correo Electrónico
                                    </Label>

                                    <Input
                                        id="email"
                                        name="user_email"
                                        placeholder="example@mail.com"
                                        type="email"
                                        onChange={ (e) => setUser({ ...user, email: e.target.value }) }
                                        value={user.email}
                                    />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="password">
                                        Contraseña
                                    </Label>

                                    <Input
                                        id="password"
                                        name="user_password"
                                        placeholder=""
                                        type="password"
                                        onChange={ (e) => setUser({ ...user, password: e.target.value }) }
                                        value={user.password}
                                    />
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="password_retype">
                                        Introduzca nuevamente su Contraseña
                                    </Label>

                                    <Input
                                        id="password_retype"
                                        name="user_password_retype"
                                        placeholder=""
                                        type="password"
                                    />
                                </FormGroup>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='sign-register-btn'>
                        <Button onClick={ register }>Entrar</Button>
                    </Row>
                    <Row className='sign-has-account'>
                        <p>
                            ¿Ya tienes cuenta? <Link to='/enter/login'>Iniciar Sesión</Link>
                        </p>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default SignUp
