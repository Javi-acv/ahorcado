import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App () {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorretLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorretLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => 
    guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return 
  
      setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner,isLoser])
  
  useEffect(() => {
  }, [guessedLetters]) 

  useEffect (() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

    e.preventDefault()
    setGuessedLetters([])
    setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  console.log(wordToGuess)
  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection:"column",
      gap:"2rem",
      margin: "0 auto",
      alignItems: "center"

    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Ganaste!! - Actualiza para jugar de nuevo"}
        {isLoser && "Perdiste - Actualiza para jugar de nuevo"}
        </div>
      <HangmanDrawing numberOfGuesses={incorretLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf:"stretch"}}>
        <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorretLetters}
        addGuessedLetter={addGuessedLetter}
        />
        
        </div>
    </div>
  )
}

export default App;

