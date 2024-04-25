import React, { useState } from "react";

interface PasswordModalProps {
  onCancel: () => void;
  onConfirm: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onCancel, onConfirm }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmClick = () => {
    onConfirm(password);
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title justify-content-center">비밀번호</h5>
        </div>
        <div className="card-body">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주십시오"
          />
          <div className="d-grid gap-2 d-md-flex justify-content-center p-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>취소</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmClick}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;



