import { useEffect } from 'react';
import './App.css';
import puzzle from './images/puzzle.svg'
import logo from './images/logo.svg'
import creator from './images/Ellipse 1.png'
import json from './utils/data.json'
import { useState } from 'react';
import Rating from '@mui/material/Rating';


function App() {

  const [data, setData] = useState([])
  const [isRanged, setRange] = useState(false)
  const [isRandom, setRandom] = useState(false)

  const numberStars = 10

  useEffect(() => {
    const source = JSON.parse(JSON.stringify(json))
    const sorted = moviesorter(source.body)
    setData(sorted)
  }, [])

  useEffect(() => {
      const randomrating = 
        setInterval(() => {
          if (isRandom) {
          console.log('interval')
          const point = randomizer([0, data.length - 1])
          const star = randomizer([1, numberStars])
          data[point].rating = star
          moviesorter(data)
          setData(data)
          setRange(!isRanged)
        }
          clearInterval(randomrating)
      }, timeDelay(50, 1000))
  })

  //Подсчет среднего значения всех оценок фильма
  const startRandom = () => {
    setRandom(!isRandom)
  }

  const changeoption = (i, newrating) => {
    console.log(newrating)
    data[i].rating = newrating
    moviesorter(data)
    setData(data)
    setRange(!isRanged)
  }

  console.log(data)

  const randomizer = (some) => {
    const min = Math.min(...some)
    const max = Math.max(...some)
    return min + Math.round(Math.random() * (max - min))
  }

  const timeDelay = (min, max) => {
    return min + Math.round(Math.random() * (max - min))
  }

  //Сортировка фильмов
  const moviesorter = (movie) =>
    movie.sort((a, b) => {
      return b.rating - a.rating
    })

  return (
    <div className="App">
      <header style={{ backgroundColor: 'white' }}>
        <div className='headerBlock'>
          <img alt={'logo'} src={logo} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img alr={'creater'} src={creator} style={{ height: '40%' }} /><p style={{ color: '#fc4908', marginLeft: '10px' }}>Created by John Smith</p>
          </div>
        </div>
        <div className='orangeLabel'>
          <div className='buttonRating' onClick={startRandom}><img alt={'logo'} style={{ height: '60%' }} src={puzzle} /><p style={{ marginLeft: '10px' }}>Random Rating</p></div>
        </div>

      </header>
      <ul>
        {data.map((el, i) => <div className='artistBlock' key={Math.random()}><div><img className='picture' alt={el.name} src={el.coverUrl} /></div><div className='infoBlock'><h1 style={{ color: `${el.color}` }}>{el.name}</h1><h3>{el.single}</h3><div style={{ display: 'flex', alignItems: 'center' }}><p style={{ marginRight: '5px' }}>Rate me:</p><div>
          <Rating
            value={el.rating}
            max={numberStars}
            onChange={(e, newValue) => {
              changeoption(i, newValue)
            }}
          /></div></div></div><div style={{ width: '9px', backgroundColor: `${el.color}` }}></div></div>)}
      </ul>
    </div>
  );
}

export default App;


