import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const PostRQ = () => {
  const result = useQuery({
    // it always return the promise
    queryFn: () => {
      return axios.get("http://localhost:9000/abc")
    },
  })
  // console.log(result)

  //? here is the result is going to be a object , which has all information , in the particular things of query

  //? so we can distructure it .

  const { data, isLoading, isError, error } = result

  // console.log(data)

  if (isLoading) {
    return <div>Page is loading...</div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  return (
    <div className='post-list'>
      {data?.data.map((post) => (
        <div className='post-item' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.category}</p>
        </div>
      ))}
    </div>
  )
}

export default PostRQ
