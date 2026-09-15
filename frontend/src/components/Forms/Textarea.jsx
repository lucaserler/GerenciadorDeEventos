function Textarea({
    label,
    id,
    name,
    placeholder,
    value,
    onChange,
    rows = 4,
    required = false
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>

            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
            />
        </div>
    );
}

export default Textarea;