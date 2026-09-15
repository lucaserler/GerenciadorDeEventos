import "./Forms.css";

function Input({
    label,
    type = "text",
    id,
    name,
    placeholder,
    value,
    onChange,
    required = false
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>

            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default Input;