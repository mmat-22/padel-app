
import { useEffect, useRef, useState } from "react";

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

function textoPuntos(valor) {
  if (valor === "0") return "cero";
  if (valor === "15") return "quince";
  if (valor === "30") return "treinta";
  if (valor === "40") return "cuarenta";
  return valor;
}

function textoMarcadorPuntos(a, b) {
  const [valorA, valorB] = mostrarPuntos(a, b);
  const textoA = textoPuntos(valorA);
  const textoB = textoPuntos(valorB);

  if (a === 3 && b === 3) return "cuarenta iguales. punto de oro";
  if (valorA === valorB) {
    if (valorA === "15") return "quince iguales";
    if (valorA === "30") return "treinta iguales";
    if (valorA === "40") return "cuarenta iguales";
    if (valorA === "0") return "cero iguales";
  }

  return `${textoA} ${textoB}`;
}

const estilos = {
  pantalla: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #081224 0%, #0b1730 45%, #111827 100%)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "18px 14px 28px",
    boxSizing: "border-box",
  },
  contenedor: {
    width: "100%",
    maxWidth: "440px",
    margin: "0 auto",
  },
  titulo: {
    margin: "8px 0 4px",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  subtitulo: {
    margin: "0 0 18px",
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "14px",
  },
  tarjeta: {
    background: "linear-gradient(180deg, rgba(9,20,43,0.96) 0%, rgba(10,24,52,0.96) 100%)",
    border: "1px solid rgba(148,163,184,0.16)",
    borderRadius: "22px",
    padding: "16px",
    marginBottom: "14px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
    backdropFilter: "blur(6px)",
  },
  tarjetaTitulo: {
    margin: "0 0 12px",
    fontSize: "24px",
    fontWeight: 800,
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
    borderRadius: "14px",
    border: "1px solid #334155",
    background: "#0b1730",
    color: "#ffffff",
    fontSize: "16px",
    marginBottom: "10px",
    boxSizing: "border-box",
    outline: "none",
  },
  etiquetaSuave: {
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "6px",
  },
  saque: {
    margin: "0 0 14px",
    textAlign: "center",
    fontSize: "21px",
    fontWeight: 800,
    color: "#e2e8f0",
  },
  bloqueScore: {
    position: "relative",
    paddingTop: "4px",
  },
  marcadorGames: {
    fontSize: "72px",
    lineHeight: 1,
    fontWeight: 900,
    textAlign: "center",
    margin: "2px 0 14px",
    color: "#ffffff",
    letterSpacing: "2px",
  },
  filaPuntosPremium: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "88px",
    margin: "0 0 14px",
  },
  marcadorPuntos: {
    fontSize: "72px",
    lineHeight: 1,
    fontWeight: 900,
    textAlign: "center",
    color: "#e2e8f0",
    letterSpacing: "2px",
  },
  botonAtras: {
    position: "absolute",
    right: "0px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "54px",
    height: "54px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: 800,
    boxShadow: "0 10px 18px rgba(220,38,38,0.35)",
  },
  avisoOro: {
    background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)",
    color: "#111827",
    borderRadius: "14px",
    padding: "10px 12px",
    textAlign: "center",
    fontWeight: 800,
    marginBottom: "12px",
    boxShadow: "0 8px 18px rgba(245,158,11,0.25)",
  },
  filaBotones: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "10px",
  },
  botonPrincipal: {
    padding: "20px 12px",
    borderRadius: "18px",
    border: "none",
    background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)",
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: 800,
    boxShadow: "0 16px 26px rgba(37,99,235,0.28)",
  },
  botonSecundario: {
    width: "100%",
    padding: "14px 12px",
    borderRadius: "14px",
    border: "none",
    background: "#475569",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
  },
  botonVoz: {
    width: "100%",
    padding: "14px 12px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(180deg, #10b981 0%, #059669 100%)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 800,
    marginBottom: "10px",
    boxShadow: "0 14px 24px rgba(5,150,105,0.26)",
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
    borderRadius: "14px",
    padding: "10px 8px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 800,
  },
  avisoInactivo: {
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#64748b",
    borderRadius: "14px",
    padding: "10px 8px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: 700,
  },
  historialGames: {
    marginTop: "14px",
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "15px",
  },
  avisoEquipos: {
    border: "1px solid #f59e0b",
    background: "rgba(245,158,11,0.14)",
    color: "#fde68a",
    borderRadius: "14px",
    padding: "10px 12px",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "8px",
  },
  tarjetaHistorial: {
    background: "#17243d",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: "16px",
    padding: "12px",
    marginTop: "10px",
  },
  historialTitulo: {
    fontSize: "15px",
    fontWeight: 800,
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
  textoEstado: {
    textAlign: "center",
    color: "#a7f3d0",
    fontSize: "13px",
    marginTop: "6px",
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

  const [vozActiva, setVozActiva] = useState(false);
  const [estadoVoz, setEstadoVoz] = useState("Voz desactivada");
  const [historialPuntos, setHistorialPuntos] = useState([]);
  const vozRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("padel_historial", JSON.stringify(historial));
  }, [historial]);

  useEffect(() => {
    localStorage.setItem("padel_hist_games", JSON.stringify(histGames));
  }, [histGames]);

  useEffect(() => {
    localStorage.setItem("padel_servidor", servidor);
  }, [servidor]);

  const hablar = (texto) => {
    if (!vozActiva || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "es-AR";
    utterance.rate = 1;
    utterance.pitch = 1;
    const voces = window.speechSynthesis.getVoices();
    const vozEspanol = voces.find((v) => v.lang?.toLowerCase().includes("es"));
    if (vozEspanol) utterance.voice = vozEspanol;
    vozRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const activarVoz = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setEstadoVoz("Este dispositivo no soporta voz en el navegador");
      return;
    }
    setVozActiva(true);
    setEstadoVoz("Voz activada");
    const utterance = new SpeechSynthesisUtterance("Voz activada para marcador de pádel");
    utterance.lang = "es-AR";
    window.speechSynthesis.speak(utterance);
  };

  const desactivarVoz = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setVozActiva(false);
    setEstadoVoz("Voz desactivada");
  };

  const anunciarMarcador = (a, b) => {
    hablar(textoMarcadorPuntos(a, b));
  };

  const jugadoresSeleccionados = [teamA1, teamA2, teamB1, teamB2];
  const valido = jugadoresSeleccionados.every(Boolean) && new Set(jugadoresSeleccionados).size === 4;

  const guardarSnapshot = () => {
    setHistorialPuntos((prev) => [
      ...prev,
      {
        pointsA,
        pointsB,
        gamesA,
        gamesB,
        histGames: [...histGames],
        servidor,
      },
    ]);
  };

  const volverAtras = () => {
    if (historialPuntos.length === 0) return;
    const ultimo = historialPuntos[historialPuntos.length - 1];
    setPointsA(ultimo.pointsA);
    setPointsB(ultimo.pointsB);
    setGamesA(ultimo.gamesA);
    setGamesB(ultimo.gamesB);
    setHistGames(ultimo.histGames);
    setServidor(ultimo.servidor);
    setHistorialPuntos((prev) => prev.slice(0, -1));
    hablar(`Punto corregido. ${textoMarcadorPuntos(ultimo.pointsA, ultimo.pointsB)}`);
  };

  const reset = () => {
    setPointsA(0);
    setPointsB(0);
    setGamesA(0);
    setGamesB(0);
    setHistGames([]);
    setServidor("A");
    setHistorialPuntos([]);
    localStorage.removeItem("padel_hist_games");
    localStorage.removeItem("padel_servidor");
    hablar("Partido reiniciado");
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
    setHistorialPuntos([]);
    setTeamA1("");
    setTeamA2("");
    setTeamB1("");
    setTeamB2("");
    localStorage.removeItem("padel_hist_games");
    localStorage.removeItem("padel_servidor");

    hablar(`Partido para la pareja ${winner} por ${resultadoFinalA} a ${resultadoFinalB}`);
  };

  const ganarGame = (team) => {
    const nuevoA = team === "A" ? gamesA + 1 : gamesA;
    const nuevoB = team === "B" ? gamesB + 1 : gamesB;
    const nuevoHistGames = [...histGames, team];

    hablar(`Juego para la pareja ${team}. Marcador ${nuevoA} a ${nuevoB}`);

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
    guardarSnapshot();

    const nextA = team === "A" ? pointsA + 1 : pointsA;
    const nextB = team === "B" ? pointsB + 1 : pointsB;

    if (pointsA === 3 && pointsB === 3) {
      hablar(`Punto de oro para la pareja ${team}`);
      ganarGame(team);
      return;
    }

    if ((nextA >= 4 || nextB >= 4) && Math.abs(nextA - nextB) >= 2) {
      hablar(`Punto para la pareja ${nextA > nextB ? "A" : "B"}`);
      ganarGame(nextA > nextB ? "A" : "B");
      return;
    }

    setPointsA(nextA);
    setPointsB(nextB);
    anunciarMarcador(nextA, nextB);
  };

  const borrarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem("padel_historial");
    hablar("Historial borrado");
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
          <button style={estilos.botonVoz} onClick={vozActiva ? desactivarVoz : activarVoz}>
            {vozActiva ? "Desactivar anuncios por voz" : "Activar anuncios por voz"}
          </button>
          <div style={estilos.textoEstado}>{estadoVoz}</div>
        </div>

        <div style={estilos.tarjeta}>
          <h2 style={estilos.tarjetaTitulo}>Parejas</h2>

          <div style={estilos.fila2}>
            <div>
              <div style={estilos.etiquetaSuave}>Pareja A</div>
              <select style={estilos.select} onChange={(e) => setTeamA1(e.target.value)} value={teamA1}>
                <option value="">Jugador A1</option>
                {jugadores.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
              <select style={estilos.select} onChange={(e) => setTeamA2(e.target.value)} value={teamA2}>
                <option value="">Jugador A2</option>
                {jugadores.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>

            <div>
              <div style={estilos.etiquetaSuave}>Pareja B</div>
              <select style={estilos.select} onChange={(e) => setTeamB1(e.target.value)} value={teamB1}>
                <option value="">Jugador B1</option>
                {jugadores.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
              <select style={estilos.select} onChange={(e) => setTeamB2(e.target.value)} value={teamB2}>
                <option value="">Jugador B2</option>
                {jugadores.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>

          {!valido && (
            <div style={estilos.avisoEquipos}>
              Elegí 4 jugadores distintos para empezar a contar.
            </div>
          )}
        </div>

        <div style={estilos.tarjeta}>
          <div style={estilos.saque}>Saca: Pareja {servidor}</div>

          <div style={estilos.bloqueScore}>
            <div style={estilos.marcadorGames}>{gamesA} - {gamesB}</div>

            <div style={estilos.filaPuntosPremium}>
              <div style={estilos.marcadorPuntos}>{puntosTexto[0]} - {puntosTexto[1]}</div>
              <button style={estilos.botonAtras} onClick={volverAtras} title="Volver atrás un punto">↶</button>
            </div>
          </div>

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
                <div style={estilos.historialTitulo}>{p.teamA.join(" / ")} vs {p.teamB.join(" / ")}</div>
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