import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Games from './components/Games';
import SearchBar from './components/SearchBar';


function App() {

  const [games, setGames] = useState([]);
  const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("https://corsproxy.io/https://www.freetogame.com/api/games")
        const data = await response.json()

        const formatGames = data.map(game => {
          const min = 5;
          const max = 60;
          const priceNum = String(Math.floor(Math.random() * (max - min + 1)) + min)
          return {
            name: game.title,
            img: game.thumbnail,
            realesDate: game.release_date,
            price: priceNum + "$",
          };
        })

        setGames(formatGames)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGames()

  }, []);

  const filteredGames = searchBar ? games.filter(game =>
    game.name.toLowerCase().includes(searchBar.toLowerCase())
  ) : games;

  return (
    <div className="App">
      <br></br>
      <h1 className="h1">Shopping Web Store For The best game !</h1>
      <br></br>
      <SearchBar setSearchBar={setSearchBar} searchBar={searchBar} />
      <br></br><br></br>
      <Games items={filteredGames} />
    </div>
  );
}

export default App;