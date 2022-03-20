import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

export const Letter = ({ letterPosition, attemptValue }) => {
  const { board, correctWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);

  const letter = board[attemptValue][letterPosition];
  // Si la letra introducida está en la posición correcta, es "correct"
  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  // Si la letra introducida no es correcta, si no está vacía y si la palabra correcta incluye esa letra pero en otra posición, entonces esa letra es "almost"
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};
