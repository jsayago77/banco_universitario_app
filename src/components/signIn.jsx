import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
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
import { useState, useContext } from 'react';
import { UserContext } from '../providers/userContext';

function SignIn() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { userData, setUserContext } = useContext(UserContext);
    const navigate = useNavigate();

    function login() {

        getApiData({
            type: 'signIn',
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
        <Card className='mb-5 p-0 rounded-4 card-custom signin'>
            <CardHeader className='sign-card-header rounded-4 rounded-bottom-0'>
                Iniciar Sesión
            </CardHeader>
            <CardBody className='px-5'>
                <Form>
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
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Contraseña
                            </Label>

                            <Input
                                id="password"
                                name="user_password"
                                placeholder=""
                                type="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                            />
                        </FormGroup>
                    </Row>
                    <Row className='sign-register-btn'>
                        <Button onClick={login}>Entrar</Button>
                    </Row>
                    <Row className='sign-has-account'>
                        <p>
                            ¿No tienes cuenta? <Link to='/enter/register'>Regístrate ahora</Link>
                        </p>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default SignIn
