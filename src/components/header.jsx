import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
    Row,
    Col
} from 'reactstrap';

function Header({ pageName, user }) {
    return (
        <Row className='p-4'>
            <Col>
                <h2>{pageName}</h2>
            </Col>
            <Col xs='2'>
                <Row>
                    <Col>
                        <span className='align-top text-start'>{user.name}</span>
                        <div className='header-user'><FontAwesomeIcon icon={faUser} /></div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Header
