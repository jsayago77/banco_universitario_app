import "./PasswordFieldLabels.css";

const PasswordFieldLabels = ({ contraseaActual }) => {
  return (
    <div className="password-field-labels">
      <div className="contrasea-actual">{contraseaActual}</div>
      <div className="form">
        <div className="form1" />
        <input
          className="password-input1"
          placeholder="*********************"
          type="text"
        />
      </div>
    </div>
  );
};

export default PasswordFieldLabels;
