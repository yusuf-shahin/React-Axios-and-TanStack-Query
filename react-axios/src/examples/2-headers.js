import { useEffect, useState } from "react"
import axios from "axios"

const url = "https://icanhazdadjoke.com/"
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState("random dad joke")

  const fetchDadJoke = async () => {
    try {
      //* practice axios
      const response = await axios(url)
      console.log(response)

      //* main axios
      // const response = await axios(url, {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // })
      // console.log(response.data)
      // console.log(response.data.joke)
      // setJoke(data.joke)

      //! another approach
      // const {
      //   data: { joke },
      // } = await axios(url, {
      //   headers: {
      //     Accept: "application/json",
      //   },
      // })
      // setJoke(joke)
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
