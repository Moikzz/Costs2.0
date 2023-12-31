import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_Control}>
      <label htmlFor={name}>{text}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
      >
        <option> Selecione uma Opção</option>
        {options ? options.filter((option) => option.id > 0).map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        )) : 'Error'}
      </select>
    </div>
  );
}

export default Select;
