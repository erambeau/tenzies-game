import './App.css';
import Dice from './Dice'
import React from 'react'
import {nanoid} from 'nanoid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti"



function App() {

  const [dices, setDices] = React.useState(allNewDice()) // array of 10 dices
  const [tenzies, setTenzies] = React.useState(false)  // represents whether the game is won or not

  // for Confetti
  const { width, height } = useWindowSize()

  React.useEffect(() => {
      const all_frozen = dices.every((dice) => dice.froze)
      const all_equals = dices.every((dice) => dice.value === dices[0].value)

      if (all_frozen && all_equals) {
            setTenzies(true)
      }
  }  
  , [dices])

  function generateNewDice() {
      return {
                  value: Math.floor(Math.random() * 6) + 1, 
                  froze: false,
                  id: nanoid()
             }
  }

  function allNewDice() {
      const res = []
      for (let i = 0 ; i < 10 ; i ++){
            res.push(generateNewDice())
      }
      return res;
  }

  function rollDicesOrNewGame () {
      if (tenzies) {
            setDices(allNewDice())
            setTenzies(false)
      }
      else {
            setDices(prevDices => {
                  return prevDices.map(dice => {
                        return dice.froze ? 
                              dice :
                              generateNewDice()
                  })
            })
      }
  }

  function freezeDice (idDiceFroze) {
      setDices(prevDices => {
            return prevDices.map(dice => {
                  return dice.id === idDiceFroze ? {...dice, froze: !dice.froze} : dice
            })
      })
  }

  const dicesElements = dices.map(dice => 
                              (
                              <Dice key={dice.id}
                                    id={dice.id}
                                    value={dice.value}
                                    froze={dice.froze}
                                    freezeDice={freezeDice}
                              />
                              ))

  const styleButton = {
      backgroundColor: tenzies ? "#59E391" : "#5035FF"
  }

  return (

    <div className="App">
      
      <main className="window-game">
        <h1 className="game-title">Tenzies</h1>
        <p className="game-description">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls</p>
        <div className="game-dices">
          {tenzies && <Confetti width={width} height={height}/>}
          {dicesElements}
        </div>
        <button className="game-roll-button" onClick={rollDicesOrNewGame} style={styleButton}>{tenzies ? "You won ! 💪\nPlay again ?" : "Roll"}</button>
      </main>
      <div className="media-part" target="_blank" >
            <a href="https://github.com/erambeau/tenzies-game">
                  <img className="media-img" src={process.env.PUBLIC_URL+"/icons/github.png"} title="See this project on Github !" alt="Github"/>
            </a>
      </div>


    </div>
  );
}

export default App;
