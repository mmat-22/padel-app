
import { useEffect, useState } from "react";

const jugadoresIniciales = [
  "Chely",
  "Torero",
  "Fluo",
  "Ema",
  "Porteño",
  "Pablito",
  "Marce",
  "Jhonson",
];

function mostrarPuntos(a, b) {
  const map = ["0", "15", "30", "40"];
  return [map[Math.min(a, 3)], map[Math.min(b, 3)]];
}

const estilos = {
  pantalla: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "18px 14px 28px",
    boxSizing: "border-box",
  },
  contenedor: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
  },
  titulo: {
    margin: "8px 0 4px",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: 700,
  },
  subtitulo: {
    margin: "0 0 18px",
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "14px",
  },
  tarjeta: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: "18px",
    padding: "16px",
    marginBottom: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  tarjetaTitulo: {
    margin: "0 0 12px",
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center",
  },
  fila2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  select: {
    width: "100%",
    padding: "13px 12px",
    borderRadius: "12px",
    border: "1px solid #475569",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "16px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  centrado: {
    textAlign: "center",
  },
  etiquetaSuave: {
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "6px",
  },
  saque: {
    margin: "0 0 12px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: 700,
    color: "#e2e8f0",
  },
  marcadorGames: {
    fontSize: "54px",
    lineHeight: 1,
    fontWeight: 800,
    textAlign: "center",
    margin: "4px 0 8px",
  },
  marcadorPuntos: {
    fontSize: "38px",
    lineHeight: 1,
    textAlign: "center",
    margin: "0 0 14px",
    color: "#e2e8f0",
  },
  avisoOro: {
    background: "#f59e0b",
    color: "#111827",
    borderRadius: "12px",
    padding: "10px 12px",
    textAlign: "center",
    fontWeight: 700,
    marginBottom: "12px",
  },
  filaBotones: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "10px",
  },
  botonPrincipal: {
    padding: "16px 12px",
    borderRadius: "14px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: 700,
  },
  botonSecundario: {
    width: "100%",
    padding: "13px 12px",
    borderRadius: "12px",
    border: "none",
    background: "#475569",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
  },
  filaAvisos: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "8px",
  },
  avisoActivo: {
    border: "1px solid #22c55e",
    background: "#052e16",
    color: "#86efac",
    borderRadius: "12px",
    padding: "10px 8px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 700,
  },
  avisoInactivo: {
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#64748b",
    borderRadius: "12px",
    padding: "10px 8px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 700,
  },
  historialGames: {
    marginTop: "12px",
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "14px",
  },
  avisoEquipos: {
    border: "1px solid #f59e0b",
    background: "rgba(245,158,11,0.15)",
    color: "#fde68a",
    borderRadius: "12px",
    padding: "10px 12px",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "12px",
  },
  tarjetaHistorial: {
    background: "#1e293b",
    borderRadius: "14px",
    padding: "12px",
    marginTop: "10px",
  },
  historialTitulo: {
    fontSize: "15px",
    fontWeight: 700,
    marginBottom: "4px",
  },
  historialTexto: {
    fontSize: "14px",
    color: "#cbd5e1",
  },
  historialVacio: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default function App() {
  const [jugadores] = useState(jugadoresIniciales);

  const [teamA1, setTeamA1] = useState("");
  const [teamA2, setTeamA2] = useState("");
  const [teamB1, setTeamB1] = useState("");
  const [teamB2, setTeamB2] = useState("");

  const [pointsA, setPointsA] = useState(0);
  const [pointsB, setPointsB] = useState(0);
  const [gamesA, setGamesA] = useState(0);
  const [gamesB, setGamesB] = useState(0);

  const [historial, setHistorial] = useState(() => {
    const data = localStorage.getItem("padel_historial");
    return data ? JSON.parse(data) : [];
  });

  const [histGames, setHistGames] = useState(() => {
    const data = localStorage.getItem("padel_hist_games");
    return data ? JSON.parse(data) : [];
  });

  const [servidor, setServidor] = useState(() => {
    const data = localStorage.getItem("padel_servidor");
    return data || "A";
  });

  useEffect(() => {
    localStorage.setItem("padel_historial", JSON.stringify(historial));
  }, [historial]);

  useEffect(() => {
    localStorage.setItem("padel_hist_games", JSON.stringify(histGames));
  }, [histGames]);

  useEffect(() => {
    localStorage.setItem("padel_servidor", servidor);
  }, [servidor]);

  const jugadoresSeleccionados = [teamA1, teamA2, teamB1, teamB2];
  const valido =
    jugadoresSeleccionados.every(Boolean) &&
    new Set(jugadoresSeleccionados).size === 4;

  const reset = () => {
    setPointsA(0);
    setPointsB(0);
    setGamesA(0);
    setGamesB(0);
    setHistGames([]);
    setServidor("A");
    localStorage.removeItem("padel_hist_games");
    localStorage.removeItem("padel_servidor");
  };

  const finalizarPartido = (winner, resultadoFinalA, resultadoFinalB, nuevoHistGames) => {
    const partido = {
      fecha: new Date().toLocaleString("es-AR"),
      teamA: [teamA1, teamA2],
      teamB: [teamB1, teamB2],
      resultado: `${resultadoFinalA} - ${resultadoFinalB}`,
      winner,
      games: nuevoHistGames,
    };

    setHistorial((prev) => [partido, ...prev]);
    setPointsA(0);
    setPointsB(0);
    setGamesA(0);
    setGamesB(0);
    setHistGames([]);
    setServidor("A");
    setTeamA1("");
    setTeamA2("");
    setTeamB1("");
    setTeamB2("");
    localStorage.removeItem("padel_hist_games");
    localStorage.removeItem("padel_servidor");
  };

  const ganarGame = (team) => {
    const nuevoA = team === "A" ? gamesA + 1 : gamesA;
    const nuevoB = team === "B" ? gamesB + 1 : gamesB;
    const nuevoHistGames = [...histGames, team];

    if (nuevoA >= 4 || nuevoB >= 4) {
      finalizarPartido(team, nuevoA, nuevoB, nuevoHistGames);
      return;
    }

    setGamesA(nuevoA);
    setGamesB(nuevoB);
    setHistGames(nuevoHistGames);
    setPointsA(0);
    setPointsB(0);
    setServidor((prev) => (prev === "A" ? "B" : "A"));
  };

  const punto = (team) => {
    if (!valido) return;

    const nextA = team === "A" ? pointsA + 1 : pointsA;
    const nextB = team === "B" ? pointsB + 1 : pointsB;

    if (pointsA === 3 && pointsB === 3) {
      ganarGame(team);
      return;
    }

    if ((nextA >= 4 || nextB >= 4) && Math.abs(nextA - nextB) >= 2) {
      ganarGame(nextA > nextB ? "A" : "B");
      return;
    }

    setPointsA(nextA);
    setPointsB(nextB);
  };

  const borrarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem("padel_historial");
  };

  const puntosTexto = mostrarPuntos(pointsA, pointsB);
  const puntoDeOro = pointsA === 3 && pointsB === 3;
  const gamePointA = (pointsA === 3 && pointsB < 3) || puntoDeOro;
  const gamePointB = (pointsB === 3 && pointsA < 3) || puntoDeOro;

  return (
    <div style={estilos.pantalla}>
      <div style={estilos.contenedor}>
        <h1 style={estilos.titulo}>Pádel con amigos</h1>
        <p style={estilos.subtitulo}>Marcador móvil a 4 games con punto de oro</p>

        <div style={estilos.tarjeta}>
          <h2 style={estilos.tarjetaTitulo}>Parejas</h2>

          <div style={estilos.fila2}>
            <div>
              <div style={estilos.etiquetaSuave}>Pareja A</div>
              <select style={estilos.select} onChange={(e) => setTeamA1(e.target.value)} value={teamA1}>
                <option value="">Jugador A1</option>
                {jugadores.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
              <select style={estilos.select} onChange={(e) => setTeamA2(e.target.value)} value={teamA2}>
                <option value="">Jugador A2</option>
                {jugadores.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={estilos.etiquetaSuave}>Pareja B</div>
              <select style={estilos.select} onChange={(e) => setTeamB1(e.target.value)} value={teamB1}>
                <option value="">Jugador B1</option>
                {jugadores.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
              <select style={estilos.select} onChange={(e) => setTeamB2(e.target.value)} value={teamB2}>
                <option value="">Jugador B2</option>
                {jugadores.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={estilos.tarjeta}>
          <div style={estilos.saque}>Saca: Pareja {servidor}</div>

          <div style={estilos.marcadorGames}>{gamesA} - {gamesB}</div>
          <div style={estilos.marcadorPuntos}>{puntosTexto[0]} - {puntosTexto[1]}</div>

          {!valido && (
            <div style={estilos.avisoEquipos}>
              Elegí 4 jugadores distintos para empezar a contar.
            </div>
          )}

          {puntoDeOro && <div style={estilos.avisoOro}>🔥 Punto de oro</div>}

          <div style={estilos.filaBotones}>
            <button style={estilos.botonPrincipal} onClick={() => punto("A")}>A</button>
            <button style={estilos.botonPrincipal} onClick={() => punto("B")}>B</button>
          </div>

          <div style={estilos.filaAvisos}>
            <div style={gamePointA ? estilos.avisoActivo : estilos.avisoInactivo}>
              {gamePointA ? "Game point A" : "Sin game point A"}
            </div>
            <div style={gamePointB ? estilos.avisoActivo : estilos.avisoInactivo}>
              {gamePointB ? "Game point B" : "Sin game point B"}
            </div>
          </div>

          <div style={estilos.historialGames}>
            <strong>Últimos games:</strong> {histGames.length ? histGames.join(" · ") : "-"}
          </div>

          <div style={{ marginTop: "12px" }}>
            <button style={estilos.botonSecundario} onClick={reset}>Reiniciar partido actual</button>
          </div>
        </div>

        <div style={estilos.tarjeta}>
          <h2 style={estilos.tarjetaTitulo}>Historial</h2>

          {historial.length === 0 ? (
            <div style={estilos.historialVacio}>Todavía no hay partidos guardados.</div>
          ) : (
            historial.map((p, i) => (
              <div key={i} style={estilos.tarjetaHistorial}>
                <div style={estilos.historialTitulo}>
                  {p.teamA.join(" / ")} vs {p.teamB.join(" / ")}
                </div>
                <div style={estilos.historialTexto}>Resultado: {p.resultado}</div>
                <div style={estilos.historialTexto}>Ganó: Pareja {p.winner}</div>
                <div style={estilos.historialTexto}>Games: {p.games.join(" · ")}</div>
                <div style={estilos.historialTexto}>{p.fecha}</div>
              </div>
            ))
          )}

          <div style={{ marginTop: "12px" }}>
            <button style={estilos.botonSecundario} onClick={borrarHistorial}>Borrar historial</button>
          </div>
        </div>
      </div>
    </div>
  );
}