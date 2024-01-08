import "./AuthButton.css";

const AuthButton = ({ label, type }) => {
  return (
    <div className="authButtonContainer">
      <button className="authButton" type={type}>
        {label}
      </button>
    </div>
  );
};

export default AuthButton;
