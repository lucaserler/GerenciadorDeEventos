import Sidebar from "./sidebar";

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard-content">
                <h1>Dashboard</h1>

                <p>Bem-vindo ao Gerenciador de Eventos!</p>

                <div className="cards">
                    <div className="card">
                        <h3>Eventos</h3>
                        <strong>0</strong>
                    </div>

                    <div className="card">
                        <h3>Participantes</h3>
                        <strong>0</strong>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;