import { useContext } from "react";
import { AppContext } from "../../App";
import "./GameOver.css";

export const GameOver = () => {
  const { gameOver, correctWord, currentAttempt } = useContext(AppContext);

  return (
    <div className="game-over">
      <h3
        className={
          gameOver.guessedWord ? "game-over-title" : "game-over-title-fail"
        }
      >
        {gameOver.guessedWord ? "Has acertado la palabra" : "Has fallado"}
      </h3>

      {gameOver.guessedWord ? (
        <h1 className="game-over-correct-word">
          La palabra correcta es:
          <span style={{ textTransform: "uppercase", marginLeft: "8px" }}>
            {correctWord}
          </span>
        </h1>
      ) : (
        <h1 className="game-over-correct-word">
          La palabra correcta era:
          <span style={{ textTransform: "uppercase", marginLeft: "8px" }}>
            {correctWord}
          </span>
        </h1>
      )}

      {gameOver.guessedWord ? (
        <h3 className="game-over-attempts">
          Has acertado en {currentAttempt.attempt} intento(s)
        </h3>
      ) : null}

      {gameOver ? (
        <button
          className="game-over-restart"
          onClick={() => window.location.reload()}
        >
          Volver a jugar
        </button>
      ) : null}
    </div>
  );
};
