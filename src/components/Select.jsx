

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{text}</label>
      <select className="form-control" name={name} id={name} onChange={handleOnChange} value={value || ''} >
        <option disabled>Selecione uma opção</option>
        {
          options.map((option) => (
            <option key={option._id} value={option._id}>{option.name}</option>
          )
          )
        }
      </select>
    </div>
  );
}

export default Select;