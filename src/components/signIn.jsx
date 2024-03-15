import { useState } from 'react';
import { Link } from 'react-router-dom';
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

function SignIn() {
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
                            />
                        </FormGroup>
                    </Row>
                    <Row className='sign-register-btn'>
                        <Button>Entrar</Button>
                    </Row>
                    <Row className='sign-has-account'>
                        <p>
                            ¿No tienes cuenta? <Link to='/register'>Regístrate ahora</Link>
                        </p>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default SignIn
