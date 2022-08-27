import './App.css';
import Dice from './Dice'

function App() {
  return (
    <div className="App">
      <main className="window-game">
        <h1 className="game-title">Tenzies</h1>
        <p className="game-description">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls</p>
        <div className="game-dices">
          <Dice id={1}
                value={1}
                froze={true} />
          <Dice id={2}
                value={2}
                froze={false} />
          <Dice id={3}
                value={1}
                froze={true} />
          <Dice id={4}
                value={4}
                froze={false} />
          <Dice id={5}
                value={5}
                froze={false} />
          <Dice id={6}
                value={3}
                froze={false} />
          <Dice id={7}
                value={3}
                froze={false} />
          <Dice id={8}
                value={5}
                froze={false} />
          <Dice id={9}
                value={6}
                froze={false} />
          <Dice id={10}
                value={1}
                froze={true} />
        </div>
        <button className="game-roll-button">Roll</button>

      </main>
    </div>
  );
}

export default App;
