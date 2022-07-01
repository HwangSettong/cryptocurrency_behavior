import {useState, useEffect} from "react"
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(amount)
  const onClick = () => (setPrice(amount))
  const onChange = (event) => (setAmount(event.target.value))
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    
    setLoading(false)
  }, []);
  return (
    <div>
      {loading ? <strong>Loading...</strong> :
      <div>
        <div>
          <h3>How much do you have? (USD)</h3>
          <input value={amount} onChange={onChange} type="number" placeholder="USD"></input> 
          <button onClick={onClick}>submit</button>
        </div>
        <div>
          <h1>The Coins!{loading ? "" : ` (total : ${coins.length})`}</h1>
          <table>
            <th>Coin name</th>
            <th>Coin price (USD)</th>
            <th>I can have...</th>
            {coins.map((coin) => 
              <tr key={coin.id}>
                <td>{coin.name} ({coin.symbol})</td>
                <td>${coin.quotes.USD.price}</td>
                <td>{price/coin.quotes.USD.price} coin</td>
              </tr>)}
          </table>
        </div>
      </div>
      }
    </div>
  );
}
// coin.quotes.USD.price
export default App;
