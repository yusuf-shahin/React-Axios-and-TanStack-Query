# Tanstake query

### JSON server

- create a json-server and set-up API end point that serves mock data for use in our application .

**install json-server**

```js
npm i json-server
```

**create a file _db.json_ for mock data**

- One thing should notice that, the location **db.json** file out of `src` or any component .

```json
{
  "abc": [
    {
      "id": "1",
      "title": "Sundar Pichai Interview 1",
      "body": "Discussing The Future of Tech"
    },
    {
      "id": "2",
      "title": "Marques Reviews Tesla",
      "body": "Tesla's latest EV review"
    },
    {
      "id": "3",
      "title": "AI in 2024",
      "body": "Impact on daily life"
    },
    {
      "title": "RQ",
      "body": "RQ is amazing!",
      "id": "9fHf1DZ"
    }
  ]
}
```

- it is basically an array of **abc**

#### Package.json

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "server-json": "json-server --watch db.json --port 9000"

  },
```

- In that script we extra add

```json
"server-json": "json-server --watch db.json --port 9000"
```

- In terminal we run

```
npm run server-json
```

- in `"http://localhost:9000/abc"` we can find our **db.json** model in our browser .

#### We also add extra element in our mock data

```json
{
  "todo": [
    {
      "id": "1",
      "title": "Go to the doctor"
    }
  ]
}
```

- in browser , using that _url_`"http://localhost:9000/abc"` we can get that json file .

### React Router Dom

- first install `react-router-dom` in our project
- ```
   npm i react-router-dom
  ```
- Apply React Router Dom in our **App.js**

**App.js**

```jsx
import { useState } from "react"
import Home from "./Components/Home"
import TraditionalPost from "./Components/TraditionalPost"
import PostRQ from "./Components/PostRQ"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/post'>Traditional Posts</Link>
            </li>
            <li>
              <Link to='/rq-post'>RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/post' element={<TraditionalPost />} />
          <Route exact path='/rq-post' element={<PostRQ />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

## Traditional fatching using **Axios**

- Rendering _db.json_ data in our **TraditionalPost.jsx**
- Here we use **axios** method to fetch the data .
- **useState** and **useEffect** hook to render the data

```jsx
import axios from "axios"
import React, { useEffect, useState } from "react"

const TraditionalPost = () => {
  const [posts, setPosts] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/abc")
      console.log(response)
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

export default TraditionalPost
```

## Fetch data using **Tanstack-Query**

- Rendering _db.json_ data in our **PostRQ.jsx**
- Here we use **TanStack** to fetch the data .
- install **tanstack react query**
- ```
  npm i @tanstack/react-query
  ```

### Query Client Provider

- simple way to fetch the data
- here we basically follow two step .

#### First step

- import **QueryClientProvider** and **QueryClient()** from _@tanstack/react-query_
- warp the **main.jsx** component using `QueryClientProvider`
- pass **QueryClient** as clint

```jsx
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
```

### Second step

- import **useQuery** from _@tanstack/react-query_
- **useQuery** is a function , which basically reurn a object

```jsx
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
```
