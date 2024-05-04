import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function InfoModal({title, body, options, color, toggle, modal}) {    

    return (

        <Modal isOpen={modal} toggle={toggle} style={{backgroundColor: color}}>
            <ModalHeader>{title}</ModalHeader>
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