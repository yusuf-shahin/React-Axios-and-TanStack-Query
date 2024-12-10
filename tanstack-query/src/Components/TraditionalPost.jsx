import axios from "axios"
import React, { useEffect, useState } from "react"

const TraditionalFetch = () => {
  const [posts, setPosts] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    // const resp = await fetch("https://fakestoreapi.com/products")
    // const data = await resp.json()
    // setPost(data)
    // console.log(data)
    try {
      const response = await axios.get("https://fakestoreapi.com/products")
      setPosts(response.data)
    } catch (error) {
      setIsError(true)
    }
  }

  useEffect(() => {
    fetchData()
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Page is loading...</div>
  }

  if (isError) {
    return <div>Error has occurred...</div>
  }

  return (
    <div className='post-list'>
      {posts.map((post) => (
        <div className='post-item' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.category}</p>
        </div>
      ))}
    </div>
  )
}

export default TraditionalFetch
