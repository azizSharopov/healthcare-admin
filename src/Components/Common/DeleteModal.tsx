// import React, { useState } from "react";
// import { Modal, ModalBody } from "reactstrap";
// import PasswordModal from "../Common/PasswordModal"

// // import { loadAnimation } from "lottie-web";
// // import { defineElement } from "lord-icon-element";

// // // register lottie and define custom element
// // defineElement(loadAnimation);
// // import '@lordicon/lord-icon-element/lord-icon-element.js';

// interface DeleteModalProps {
//   show?: boolean;
//   onDeleteClick?: () => void;
//   onCloseClick?: () => void;
//   recordId?: string;
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({
//   show,
//   onDeleteClick,
//   onCloseClick,
//   recordId,
// }) => {
//   const handleConfirmDelete = () => {
//     onDeleteClick && onDeleteClick();
//   };

//   const [openPasswordModal, setOpenPasswordModal] = useState(false);
//   return (
//     <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
//       <ModalBody className="py-3 px-5">
//         <div className="mt-2 text-center">
//           <i className="ri-delete-bin-line display-5 text-danger"></i>
//           <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
//             <h4>Are you sure ?</h4>
//             <p className="text-muted mx-4 mb-0">
//               Are you sure you want to remove this record {recordId ? recordId : ""} ?
//             </p>
//           </div>
//         </div>
//         <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
//           <button
//             type="button"
//             className="btn w-sm btn-light"
//             data-bs-dismiss="modal"
//             onClick={onCloseClick}
//           >
//             Close
//           </button>
//           <button
//             type="button"
//             className="btn w-sm btn-danger "
//             id="delete-record"
//             onClick={() => {
//               // Parolni talab qiluvchi modal oynani ochish
//               // onDeleteClick bosilganda ishga tushirish
//               setOpenPasswordModal(true);
//             }}
          
//           >
//             Yes, Delete It!
//           </button>
//         </div>
//       </ModalBody>
//       {/* Parolni talab qiluvchi modal oynani ochish */}
//       {openPasswordModal && (
//         <PasswordModal
//           onCancel={() => setOpenPasswordModal(false)}
//           onConfirm={handleConfirmDelete}
//         />
//       )}
//     </Modal>
//   ) as unknown as JSX.Element;
// };

// export default DeleteModal;

// import React, { useState } from "react";
// import { Modal, ModalBody } from "reactstrap";
// import PasswordModal from "../Common/PasswordModal";

// interface DeleteModalProps {
//   show?: boolean;
//   onDeleteClick?: (password: string) => void;  // Now expecting a password to be passed.
//   onCloseClick?: () => void;
//   recordId?: string;
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({
//   show,
//   onDeleteClick,
//   onCloseClick,
//   recordId,
// }) => {
//   const [openPasswordModal, setOpenPasswordModal] = useState(false);

//   const handleConfirmDelete = (password: string) => {
//     onDeleteClick && onDeleteClick(password);
//     setOpenPasswordModal(false);  // Close the password modal on confirmation
//   };

//   return (
//     <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
//       <ModalBody className="py-3 px-5">
//         <div className="mt-2 text-center">
//           <i className="ri-delete-bin-line display-5 text-danger"></i>
//           <h4>확실합니까?</h4>
//           <p className="text-muted">
//           정말로 이 기록을 삭제하시겠습니까? {recordId ? `#${recordId}` : ""}?
//           </p>
//           <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
//             <button
//               type="button"
//               className="btn w-sm btn-light"
//               onClick={onCloseClick}
//             >
//              취소
//             </button>
//             <button
//               type="button"
//               className="btn w-sm btn-danger"
//               onClick={() => setOpenPasswordModal(true)}
//             >
//               삭제
//             </button>
//           </div>
//         </div>
//       </ModalBody>
//       {openPasswordModal && (
//         <PasswordModal
//           onCancel={() => setOpenPasswordModal(false)}
//           onConfirm={handleConfirmDelete}
//         />
//       )}
//     </Modal>
//   );
// };

// export default DeleteModal;


// import React, { useState } from "react";
// import { Modal, ModalBody, Input, Button } from "reactstrap";

// interface DeleteModalProps {
//   show?: boolean;
//   onDeleteClick?: (password: string) => void;
//   onCloseClick?: () => void;
//   recordId?: string;
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({
//   show,
//   onDeleteClick,
//   onCloseClick,
//   recordId,
// }) => {
//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmClick = async () => {
//     setIsSubmitting(true);
//     if (onDeleteClick) {
//       onDeleteClick(password);
//     }
//     setIsSubmitting(false);
//     onCloseClick(); // Modalni yopish
//   };

//   return (
//     <Modal isOpen={show} toggle={onCloseClick} centered>
//       <ModalBody className="py-3 px-5">
//         <div className="text-center">
//           <i className="ri-delete-bin-line display-5 text-danger"></i>
//           <h4>확실합니까?</h4>
//           <p className="text-muted">
//             정말로 이 기록을 삭제하시겠습니까? {recordId ? `#${recordId}` : ""}?
//           </p>
//           <Input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="비밀번호를 입력해 주십시오"
//             className="mt-4"
//           />
//           <div className="d-flex gap-2 justify-content-center mt-4">
//             <Button color="secondary" onClick={onCloseClick} disabled={isSubmitting}>
//               취소
//             </Button>
//             <Button color="danger" onClick={handleConfirmClick} disabled={isSubmitting || !password}>
//               삭제
//             </Button>
//           </div>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default DeleteModal;


import React, { useState } from "react";
import { Modal, ModalBody, Input, Button } from "reactstrap";

interface DeleteModalProps {
  show?: boolean;
  onDeleteClick?: (password: string) => void;
  onCloseClick?: () => void;
  recordId?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  onDeleteClick,
  onCloseClick,
  recordId,
}) => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmClick = async () => {
    setIsSubmitting(true);
    try {
      // Mavjudligini tekshirish va onDeleteClick funksiyasini chaqirish
      if (onDeleteClick) {
        onDeleteClick(password);
      }
    } finally {
      setIsSubmitting(false);
      // onCloseClick funksiyasini chaqirish
      if (onCloseClick) {
        onCloseClick();
      }
    }
  };

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered>
      <ModalBody className="py-3 px-5">
        <div className="text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <h4>확실합니까?</h4>
          <p className="text-muted">
            정말로 이 기록을 삭제하시겠습니까? {recordId ? `#${recordId}` : ""}?
          </p>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주십시오"
            className="mt-4"
          />
          <div className="d-flex gap-2 justify-content-center mt-4">
            <Button color="secondary" onClick={onCloseClick} disabled={isSubmitting}>
              취소
            </Button>
            <Button color="danger" onClick={handleConfirmClick} disabled={isSubmitting || !password}>
              삭제
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
