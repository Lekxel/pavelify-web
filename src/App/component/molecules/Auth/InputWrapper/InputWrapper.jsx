import { Input } from "../../../Atoms/Auth/Input/Input";
import styles from "./InputWrapper.module.css";
export const InputWrapper = ({
  id,
  labelText,
  inputType,
  inputPlaceholder,
  InputWidth,
  style,
  inputStyle = null,
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className={styles.InputWrapper} style={style}>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <Input
        value={value}
        id={id}
        type={inputType}
        placeholder={inputPlaceholder}
        width={InputWidth}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
