import { useState, useMemo } from "react";

const jugadoresIniciales = ["Chely", "Torero", "Fluo", "Ema", "Porteño", "Pablito", "Marce", "Jhonson"];

function mostrarPuntos(a, b) {
  const map = ["0", "15", "30", "40"];
  return [map[Math.min(a, 3)], map[Math.min(b, 3)]];
}

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

  const [historial, setHistorial] = useState([]);
  const [histGames, setHistGames] = useState([]);
  const [servidor, setServidor] = useState("A");

  const jugadoresSeleccionados = [teamA1, teamA2, teamB1, teamB2];
  const valido = jugadoresSeleccionados.every(Boolean) && new Set(jugadoresSeleccionados).size === 4;

  const reset = () => {
    setPointsA(0);
    setPointsB(0);
    setGamesA(0);
    setGamesB(0);
    setHistorial([]);
    setHistGames([]);
    setServidor("A");
  };

  const finalizarPartido = (winner) => {
    const partido = {
      teamA: [teamA1, teamA2],
      teamB: [teamB1, teamB2],
      resultado: `${gamesA} - ${gamesB}`,
      winner,
    };
    setHistorial([partido, ...historial]);
    reset();
    setTeamA1(""); setTeamA2(""); setTeamB1(""); setTeamB2("");
  };

  const ganarGame = (team) => {
    const newA = team === "A" ? gamesA + 1 : gamesA;
    const newB = team === "B" ? gamesB + 1 : gamesB;

    setHistGames([...histGames, team]);

    if (newA >= 4 || newB >= 4) {
      finalizarPartido(team);
      return;
    }

    setGamesA(newA);
    setGamesB(newB);
    setPointsA(0);
    setPointsB(0);
    setServidor(servidor === "A" ? "B" : "A");
  };

  const punto = (team) => {
    if (!valido) return;

    const nextA = team === "A" ? pointsA + 1 : pointsA;
    const nextB = team === "B" ? pointsB + 1 : pointsB;

    // Punto de oro
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

  const puntosTexto = mostrarPuntos(pointsA, pointsB);

  const puntoDeOro = pointsA === 3 && pointsB === 3;
  const gamePointA = (pointsA === 3 && pointsB < 3) || puntoDeOro;
  const gamePointB = (pointsB === 3 && pointsA < 3) || puntoDeOro;

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto", fontFamily: "Arial" }}>
      <h2>Pádel con amigos</h2>

      <h3>Parejas</h3>
      <select onChange={(e) => setTeamA1(e.target.value)} value={teamA1}>
        <option value="">Jugador A1</option>
        {jugadores.map(j => <option key={j}>{j}</option>)}
      </select>

      <select onChange={(e) => setTeamA2(e.target.value)} value={teamA2}>
        <option value="">Jugador A2</option>
        {jugadores.map(j => <option key={j}>{j}</option>)}
      </select>

      <select onChange={(e) => setTeamB1(e.target.value)} value={teamB1}>
        <option value="">Jugador B1</option>
        {jugadores.map(j => <option key={j}>{j}</option>)}
      </select>

      <select onChange={(e) => setTeamB2(e.target.value)} value={teamB2}>
        <option value="">Jugador B2</option>
        {jugadores.map(j => <option key={j}>{j}</option>)}
      </select>

      <h3>Saca: {servidor}</h3>

      <h2>{gamesA} - {gamesB}</h2>
      <h2>{puntosTexto[0]} - {puntosTexto[1]}</h2>

      {puntoDeOro && <p style={{color:"orange"}}>PUNTO DE ORO</p>}

      <div>
        <button onClick={() => punto("A")}>Punto A</button>
        <button onClick={() => punto("B")}>Punto B</button>
      </div>

      <p>{gamePointA && "Game point A"} {gamePointB && "Game point B"}</p>

      <h4>Games: {histGames.join(" - ")}</h4>

      <button onClick={reset}>Reiniciar</button>

      <h3>Historial</h3>
      {historial.map((p, i) => (
        <div key={i}>
          {p.teamA.join("/")} vs {p.teamB.join("/")} → {p.resultado}
        </div>
      ))}
    </div>
  );
}