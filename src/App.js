import { useState, createContext, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { GameOver } from "./components/game-over/GameOver";
import { Keyboard } from "./components/keyboard/Keyboard";
import { Navbar } from "./components/navbar/Navbar";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [wordSet, setWordSet] = useState(new Set());
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPossition: 0,
  });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPossition > 4) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPossition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPossition: currentAttempt.letterPossition + 1,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPossition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPossition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPossition: currentAttempt.letterPossition - 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPossition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPossition: 0,
      });
    } else {
      alert("No se encuentra la palabra");
    }

    if (currentWord === correctWord.toUpperCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <Navbar />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          <p className="text">
            Escribe una palabra de 5 letras. Puedes usar el teclado en pantalla
            o el teclado de tu ordenador. Tienes 6 intentos para adivinar la
            palabra escondida. Con cada intento, se marcarán en naranja las
            letras que pertenecen a la palabra secreta pero que están en una
            posición incorrecta. Las letras que pertenezcan a la palabra y estén
            en la posición correcta se marcan en color verde. Si la palabra
            escrita no existe en la base de datos, saltará un aviso y el intento
            no será válido. Si adivinas la palabra en menos de 6 intentos,
            ganarás el juego.
          </p>
          <div className="bottom-side">
            {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
