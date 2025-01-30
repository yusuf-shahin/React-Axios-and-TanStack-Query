import { useEffect, useState } from "react"
import axios from "axios"

const url = "https://icanhazdadjoke.com/"
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState("random dad joke")

  const fetchDadJoke = async () => {
    try {
      //@ fetch API

      // const resp = await fetch(url, {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // })
      // const data = await resp.json()
      // console.log(data)
      // setJoke(data.joke)

      //* practice axios
      // const response = await axios(url)
      // console.log(response)

      //* main axios
      const response = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      })
      console.log(response)

      // console.log(response.data)
      // console.log(response.data.joke)
      setJoke(response.data.joke)

      //! another approach
      // const {
      //   data: { joke },
      // } = await axios(url, {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // })
      // setJoke(response)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchDadJoke()
  }, [])

  return (
    <section className='section text-center'>
      <button className='btn' onClick={fetchDadJoke}>
        random joke
      </button>
      <p className='dad-joke'>{joke}</p>
    </section>
  )
}
export default Headers
