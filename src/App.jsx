import React, { useEffect, useState, useMemo } from "react";
import Card from "./Card";

export default function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All positions");

  // Chiamata API
  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error("Errore nel recupero dei dati:", error));
  }, []);

  // Estraggo le posizioni uniche
  const uniquePositions = useMemo(() => {
    const positions = politicians.map(p => p.position);
    return ["All positions", ...new Set(positions)];
  }, [politicians]);

  // Filtro i politici
  const filteredPoliticians = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return politicians.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(lowerSearch) ||
        p.biography.toLowerCase().includes(lowerSearch);

      const matchesPosition =
        selectedPosition === "All positions" || p.position === selectedPosition;

      return matchesSearch && matchesPosition;
    });
  }, [searchTerm, selectedPosition, politicians]);
  return (
    <div className="container">
      <h1>Politicians List</h1>

      <input
        type="text"
        placeholder="Search by name or biography..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        className="select-position"
      >
        {uniquePositions.map((position, idx) => (
          <option key={idx} value={position}>
            {position}
          </option>
        ))}
      </select>

      <div className="card-grid">
        {filteredPoliticians.map((politician) => (
          <Card key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
}