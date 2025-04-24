import React, { useEffect, useState, useMemo } from "react";
import Card from "./Card";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error("Errore nel recupero dei dati:", error));
  }, []);

  const filteredPoliticians = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.biography.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, politicians]);

  return (
    <div className="container">
      <h1>Lista di Politici</h1>
      <input
        type="text"
        placeholder="Cerca per nome o biografia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="card-grid">
        {filteredPoliticians.map((politician) => (
          <Card key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
}

export default App;

