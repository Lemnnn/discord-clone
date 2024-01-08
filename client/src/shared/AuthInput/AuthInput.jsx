import "./AuthInput.css";

const AuthInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="inputWrapper">
      <label className="inputLabel">{label}</label>
      <input
        className="loginInput"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AuthInput;
