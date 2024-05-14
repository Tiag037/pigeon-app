import "./App.css";
import dice1 from "/Dice1.png";
import dice2 from "/Dice2.png";
import dice3 from "/Dice3.png";
import dice4 from "/Dice4.png";
import dice5 from "/Dice5.png";
import dice6 from "/Dice6.png";
import { useEffect, useMemo, useState } from "react";
import { nombreDeCoupABoire, gorgeesAuHasard } from "./regle"; // Importez seulement nombreDeCoupABoire

const App = () => {
  const faces = useMemo(() => [dice1, dice2, dice3, dice4, dice5, dice6], []);
  //lancer de dé
  const [face1, setFace1] = useState(faces[2]);
  const [face2, setFace2] = useState(faces[1]);
  const [messageDescription, setMessageDescription] = useState("");

  //pigeon
  const [pigeon, setPigeon] = useState(false);

  const handleClick = () => {
    setMessageDescription("");
    let doubleDice;
    let gorgeeABoire;
    const ramdomNumber1 = Math.floor(Math.random() * faces.length);
    const ramdomNumber2 = Math.floor(Math.random() * faces.length);

    setFace1(faces[ramdomNumber1]);
    setFace2(faces[ramdomNumber2]);
    // Vérification des faces de dé identiques et recherche de correspondance
    if (ramdomNumber1 === ramdomNumber2) {
      if (ramdomNumber1 + 1 === 1) {
        doubleDice = nombreDeCoupABoire.find((item) => item.shot === 7);
        setMessageDescription(doubleDice);
      } else {
        doubleDice = nombreDeCoupABoire.find(
          (item) => item.shot === ramdomNumber1 + 1
        );
        setMessageDescription(doubleDice);
      }
    } else if (ramdomNumber1 + 1 + (ramdomNumber2 + 1) === 9) {
      gorgeeABoire = gorgeesAuHasard.find((item) => item.shot === 9);
      setMessageDescription(gorgeeABoire);
    } else if (ramdomNumber1 + 1 + (ramdomNumber2 + 1) === 10) {
      gorgeeABoire = gorgeesAuHasard.find((item) => item.shot === 10);
      setMessageDescription(gorgeeABoire);
    } else if (ramdomNumber1 + 1 + (ramdomNumber2 + 1) === 11) {
      gorgeeABoire = gorgeesAuHasard.find((item) => item.shot === 11);
      setMessageDescription(gorgeeABoire);
    }

    if (pigeon) {
      setPigeon(false);
    }
  };
  useEffect(() => {
    if (
      (face1 === faces[0] && face2 === faces[1]) ||
      (face1 === faces[1] && face2 === faces[0])
    ) {
      setPigeon(true);
    }
  }, [face1, face2, faces]);

  return (
    <main className="text-center bg-success p-5 text-light mh-100">
      <div className="container container-img-btn bg-warning rounded p-5">
        <div>
          <img src={face1} alt="face dé 1 " className="img-fluid" />
          <img src={face2} alt="face dé 2" className="img-fluid" />
        </div>
        {pigeon && (
          <h3 className="text-danger bg-light p-3 rounded mb-4 ">Pigeon !</h3>
        )}
        {messageDescription ? (
          <p className="bg-light rounded p-3 fw-bold text-dark">
            {messageDescription.description}
          </p>
        ) : null}
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-light btn-outline-dark"
        >
          Lancez
        </button>
      </div>
    </main>
  );
};

export default App;
