export const getJokes = () => {
  return fetch(" http://localhost:8088/jokes").then((res) => res.json())
}
