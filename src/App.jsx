
import { useEffect, useState } from "react"
import { postJoke, getJokes, putJoke } from "./services/jokeServices"
import steve from "./assets/steve.png"

/* State Management: We have 4 pieces of state: the jokes array, the untold jokes array, the told jokes array, and the new joke input value. The jokes array is the main source of truth for our data, while the untold and told jokes arrays are derived from it using a filter function. The new joke input value is used to capture user input for adding new jokes. */
export const App = () => {
  const [jokes, setJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")

/*Hook 1: The Fetch (Loads the jokes after input is added) */
  useEffect(() => {
    getJokes().then((jokeArr) => {
      setJokes(jokeArr)
    })
  }, [])

/*Hook 2: The Filter (Filters the jokes into two separate arrays) */
  useEffect(() => {
    const untold = jokes.filter((joke) => joke.told === false)
    const told = jokes.filter((joke) => joke.told === true)
    setUntoldJokes(untold)
    setToldJokes(told)
  }, [jokes]) 
  /* watches for changes in jokes array and then runs the filter function to update the two separate arrays */

  /* JSX: The JSX structure includes an input field for adding new jokes*/
  return (
   <div className="app-container">
    <div className="app-heading"> /* The heading */
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
/* The button's onClick handler creates a new joke object with the text from the input field and a default "told" status of false. It then calls the postJoke function to send this new joke to the server. After the joke is successfully added, it clears the input field and fetches the updated list of jokes to refresh the state and display the new joke in the appropriate section. */
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
  /* Lists Section */
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
             Toggle
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
                Toggle
          </button>
         </div>
      ))}
    </div>

  </div>
 </div>
  )
}
