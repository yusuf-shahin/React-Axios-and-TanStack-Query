import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const url =
  "https://api.unsplash.com/search/photos?client_id=JBc1EZFVqeNpWV5DFI6HBdNspasHOPPQjymOFb5vZsA&query=cat"

const Gallery = () => {
  const response = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await axios.get(url)
      return response.data
    },
  })
  console.log(response)

  return <div>gallary</div>
}

export default Gallery
