export const getJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

export const postJoke = (jokeObj) => {
  return fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObj),
  }).then((res) => res.json())
}

export const putJoke = (jokeObj) => {
  return fetch(`http://localhost:8088/jokes/${jokeObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObj),
  }).then((res) => res.json())
}
