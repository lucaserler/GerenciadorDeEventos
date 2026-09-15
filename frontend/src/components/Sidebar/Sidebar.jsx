import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    function sair() {
        localStorage.removeItem("usuarioLogado");

        navigate("/login");
    }

    return (
        <aside className="sidebar">
            <h2>Gerenciador</h2>

            <nav>
                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/events">
                    Eventos
                </Link>

                <Link to="/settings">
                    Configurações
                </Link>
            </nav>

            <button
                onClick={sair}
                className="btn-logout"
            >
                Sair
            </button>
        </aside>
    );
}

export default Sidebar;