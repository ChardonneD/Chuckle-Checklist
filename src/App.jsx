
import { useEffect, useState } from "react"
import { postJoke, getJokes, putJoke } from "./services/jokeServices"
import steve from "./assets/steve.png"
import "./App.css"

export const App = () => {
  const [jokes, setJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")

  useEffect(() => {
    getJokes().then((jokeArr) => {
      setJokes(jokeArr)
    })
  }, [])

  useEffect(() => {
    const untold = jokes.filter((joke) => joke.told === false)
    const told = jokes.filter((joke) => joke.told === true)
    setUntoldJokes(untold)
    setToldJokes(told)
  }, [jokes]) 

  return (
   <div className="app-container">
    <div className="app-heading"> 
      <div className="app-heading-circle">
      <img className="app-logo" src={steve} alt="Good job Steve" />
    </div>
      <h1 className="app-heading-text">Chuckle Checklist</h1>
   </div>
 <h3>Add Joke</h3>
    <div className="joke-add-form">
      <input
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        value={newJoke}
        onChange={(event) => {
          setNewJoke(event.target.value) 
  }}
  />
    <button 
      className="joke-input-submit"
      onClick={() => {
       const jokeObj = {
        text: newJoke,
        told: false,
       }
      postJoke(jokeObj).then((newJoke) => {
       setNewJoke("")
        getJokes().then((jokeArr) => {
         setJokes(jokeArr)
      })
     })
    }}
   >
      Add
    </button>
  </div>
    <div className="joke-lists-container">
      {/* Untold Jokes List */}
      <div className="joke-list-container">
        <h2>Untold <span className="untold-count">{untoldJokes.length}</span> Jokes</h2>
        {untoldJokes.map((joke) => (
          <div className="joke-list-item" key={joke.id}>
            <p className="joke-list-item-text">{joke.text}</p>
             <button
              className="joke-list-action-toggle"
             /* 1. Build the package */
             onClick={() => {
              const toggledJoke = {
                id: joke.id,
                text: joke.text,
                told: !joke.told 
              }
  
             /* 2. Ship the package */
             putJoke(toggledJoke).then(() => {
             /* 3. Refresh the inventory */
             getJokes().then((jokeArr) => {
               setJokes(jokeArr)
             }) 
            })
           }}
            >
             <i className="fa-regular fa-face-grin-tongue-wink"></i>
            </button>
          </div>
       ))}
     </div>

      {/* Told Jokes List */}
    <div className="joke-list-container">
       <h2>Told <span className="told-count">{toldJokes.length}</span> Jokes</h2>
       {toldJokes.map((joke) => (
         <div className="joke-list-item" key={joke.id}>
           <p className="joke-list-item-text">{joke.text}</p>
          <button
                className="joke-list-action-toggle"
                onClick={() => {
                  const toggledJoke = {
                    id: joke.id,
                    text: joke.text,
                    told: !joke.told
                  }
                  putJoke(toggledJoke).then(() => {
                    getJokes().then((jokeArr) => {
                      setJokes(jokeArr)
                    })
                  })
                }}
              >
                <i className="fa-regular fa-face-grin-tongue-wink"></i>
          </button>
         </div>
      ))}
    </div>

  </div>
 </div>
  )
}
