
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
          <h4>암호를 입력해 주세요</h4>
          {/* <p className="text-muted">
            정말로 이 기록을 삭제하시겠습니까? {recordId ? `#${recordId}` : ""}?
          </p> */}
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하여 주십시요."
            className="mt-4"
          />
          <div className="d-flex gap-2 justify-content-center mt-4">
            <Button className="py-2 px-5" color="secondary" onClick={onCloseClick} disabled={isSubmitting}>
              취소
            </Button>
            <Button className="py-2 px-5" color="danger" onClick={handleConfirmClick} disabled={isSubmitting || !password}>
              삭제
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
