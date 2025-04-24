import React from "react";

const Card = React.memo(function Card({ politician }) {
    console.log(`Rendering card: ${politician.name}`);

    return (
        <div className="card">
            <img
                src={politician.image}
                alt={politician.name}
                className="card-img"
            />
            <h2>{politician.name}</h2>
            <p className="position">{politician.position}</p>
            <p className="bio">{politician.biography}</p>
        </div>
    );
});

export default Card;
