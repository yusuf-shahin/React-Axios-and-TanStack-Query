import { useEffect } from "react"
import axios from "axios"

// limit, if 429 wait for 15 min and try again
const url = "https://www.course-api.com/react-store-products/as"

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      //* axios
      const resp = await axios(url)
      console.log(resp)

      //* fetch
      // const resp = await fetch(url)
      // const data = await resp.json()
      // console.log(data)
    } catch (error) {
      console.log(error.resp)
    }
  }
  useEffect(() => {
    fetchData()
    // console.log("first axios request")
  }, [])

  return <h2 className='text-center'>first request</h2>
}
export default FirstRequest
