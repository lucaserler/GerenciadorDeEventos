import "./Button.css";

function Button({
    children,
    type = "button",
    className = "",
    onClick
}) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;