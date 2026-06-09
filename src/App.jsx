
import { useEffect, useState } from "react"
import { getJokes } from "./services/jokeServices"

export const App = () => {
  const [jokes, setJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")

  useEffect(() => {
    getJokes().then((data) => {
      setJokes(data)
    })
  }, [])


  
  return <div> <input
  className=""
  type="text"
  placeholder="New One Liner"
  onChange={(event) => {
    // What's the value of event?
    console.log(event.target.value)
    setNewJoke(event.target.value)
  }}
></input></div>
}
