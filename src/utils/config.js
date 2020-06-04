const BACKEND = (process.env.REACT_APP_ENV === 'dev ' ? "http://localhost:5000" : "https://funcster-api.herokuapp.com")

export { BACKEND };