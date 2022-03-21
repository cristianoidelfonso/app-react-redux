function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{text}</label>
      <input
        className="form-control"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}

export default Input;