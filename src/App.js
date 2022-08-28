import './App.css';
import Dice from './Dice'
import React from 'react'
import {nanoid} from 'nanoid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti"



function App() {

  const nbDices = 10    // nb dices - set less for debugging

  const [dices, setDices] = React.useState(allNewDice()) // array of 10 dices
  const [tenzies, setTenzies] = React.useState(false)  // represents whether the game is won or not
  const [beginTheGame, setBeginTheGame] = React.useState(false) // at the first clic on a dice : set true to launch the timer
  const [timer, setTimer] = React.useState({beginTime: 0, endTime: 0}) //timer in miliseconds
  
  // for Confetti
  const { width, height } = useWindowSize()

  React.useEffect(() => {
      const all_frozen = dices.every((dice) => dice.froze)
      const all_equals = dices.every((dice) => dice.value === dices[0].value)

      if (all_frozen && all_equals) {
            setTenzies(true)
            setBeginTheGame(false)
      }
  }  
  , [dices])



  React.useEffect(() => {
      if (beginTheGame) {
            setTimer({beginTime: performance.now(), endTime: 0})
      }
      else {
            setTimer(prevTimer => {return {...prevTimer, endTime: performance.now() } })
      }
  }
  , [beginTheGame])


  function generateNewDice() {
      return {
                  value: Math.floor(Math.random() * 6) + 1, 
                  froze: false,
                  id: nanoid()
             }
  }

  function allNewDice() {
      const res = []
      for (let i = 0 ; i < nbDices ; i ++){
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

      if (!beginTheGame) {
            setBeginTheGame(true)
      }

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
        <button className="game-roll-button" onClick={rollDicesOrNewGame} style={styleButton}>
            {
                  tenzies ? 
                  `You won  in ${Math.floor((timer.endTime - timer.beginTime)/100) / 10}s ! 💪\nPlay again ?` : 
                  "Roll"
            }
        </button>
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
