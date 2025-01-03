import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGlovalContext } from "./useContext"

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}&query=`

const Gallery = () => {
  const { searchTerm } = useGlovalContext()

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}${searchTerm}`)
      //@ those data are store in response
      return result.data
    },
  })

  console.log(response)

  if (response.isLoading) {
    return <section className='image-container'>Data is Loading</section>
  }

  if (response.isError) {
    return <section className='image-container'>There is an error</section>
  }

  const result = response?.data.results
  console.log(result)

  if (result.length < 1) {
    return <section className='image-container'>No result faund...</section>
  }

  return (
    <section className='image-container'>
      {result.map((data) => {
        const url = data?.urls?.regular
        return (
          <img
            src={url}
            key={data.id}
            alt={data.alt_description}
            className='img'
          ></img>
        )
      })}
    </section>
  )
}

export default Gallery
