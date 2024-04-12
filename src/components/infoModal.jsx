import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function InfoModal({title, body, options, color, isActive}) {
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if( isActive == true ) setModal(true);
        else {
            setModal(false);
            isActive = false;
        };
        return () => {
        };
    }, [isActive]);
    

    return (

        <Modal isOpen={modal} toggle={toggle} style={{backgroundColor: color}}>
            <ModalHeader toggle={toggle}>Error</ModalHeader>
            <ModalBody>
                { body }
            </ModalBody>
            <ModalFooter>
                { options }
                <Button color="secondary" onClick={toggle}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>

    );
}

export default InfoModal;