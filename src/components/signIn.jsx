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
import InfoModal from './infoModal';

function SignIn() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { userData, setUserContext } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        body: '',
        color: '',
        isActive: false
    });
    const navigate = useNavigate();

    function login() {

        getApiData({
            type: 'signIn',
            method: 'POST',
            args: user
        }).then(response => response.json())
        .then( data => {
            if(data.data === null){
                // setErrorMsg({ title: "Error en los campos", body: data.message, color: '#dc3545', isActive: true });

            } else {
                sessionStorage.setItem('bankApiToken', data.data.jwt);

                const updatedUser = { ...userData, display_name: data.data.first_name + " " + data.data.last_name };
                setUserContext(updatedUser);
    
                navigate("/");
            }
            
        }).catch(error => {
            console.error(error);
        });
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
                                invalid={ (user.email == '') ? true : false }
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
                                invalid={ (user.password == '') ? true : false }
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
            {/* <InfoModal title={errorMsg.title} body={errorMsg.body} color={errorMsg.color} isActive={errorMsg.isActive} /> */}
        </Card>
    )
}

export default SignIn
