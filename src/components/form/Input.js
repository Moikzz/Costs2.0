
import styles from "./Input.module.css";

function Input({ type, text, name, placeholder, handleOnChange, value, ref}) {

  return (
    <div className={styles.form_Control}>
      <label htmlFor={name}>{text}</label>
      <input
        ref={ref}
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
