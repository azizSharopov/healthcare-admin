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
    <div className="password-modal">
      <div className="password-modal-content">
        <h2>Parolni Tasdiqlang</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Parol"
        />
        <div className="password-modal-buttons">
          <button onClick={onCancel}>Bekor qilish</button>
          <button onClick={handleConfirmClick}>Tasdiqlash</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
