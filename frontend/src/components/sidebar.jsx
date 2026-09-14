function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Gerenciador</h2>

            <nav>
                <a href="/dashboard">Dashboard</a>
                <a href="/eventos">Eventos</a>
                <a href="/participantes">Participantes</a>
                <a href="/configuracoes">Configurações</a>
            </nav>

            <button>Sair</button>
        </aside>
    );
}

export default Sidebar;