// SearchModal.jsx

import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const SearchModal = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
    // Funksiya turi () => void deb belgilangan
  
  
  
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Search Modal Title</ModalHeader>
      <ModalBody>
        {/* Modal body content goes here */}
      </ModalBody>
      <ModalFooter>
        {/* Modal footer content goes here */}
      </ModalFooter>
    </Modal>
  );
};

export default SearchModal;
