import { useQuery } from "@tanstack/react-query"
import SingleItem from "./SingleItem"
import customFetch from "./utils"
import axios from "axios"
const Items = () => {
  const result = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      // const { data } = await customFetch.get("/")
      const { data } = await axios("http://localhost:9000/api/tasks")
      return data
    },
  })
  // console.log(data)
  console.log(result)

  // if (isLoading) {
  //   return <p style={{ marginTop: "1rem" }}>Loading...</p>
  // }

  // if (isError) {
  //   return <p style={{ marginTop: "1rem" }}>There was an error...</p>
  // }

  // if (error) {
  //   return <p style={{ marginTop: "1rem" }}>{error.message}</p>
  // }

  // return (
  //   <div className='items'>
  //     {data?.taskList?.map((item) => {
  //       return <SingleItem key={item.id} item={item} />
  //     })}
  //   </div>
  // )
}
export default Items
