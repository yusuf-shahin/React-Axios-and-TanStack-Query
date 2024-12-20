## Steps

#### Server

Open server directory.

- run **npm install** and **npm start**

#### Node Course

[Node Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/?referralCode=E94792BEAE9ADD204BC7)

#### Starter

- run `npm install` and `npm run dev`
- Grocery Bud structure

#### Explore Setup

Explore files and folders

#### Custom Axios Instance

Create utils.js and setup custom axios instance with
following base url:**localhost:9000/api/tasks**

#### HTTP Methods

HTTP (Hypertext Transfer Protocol) methods define the types of actions that can be performed on a web server to retrieve, modify or delete information. The most commonly used HTTP methods are GET, POST, PATCH and DELETE. GET retrieves data, POST sends data to be processed, PATCH update or replace existing data, DELETE removes data.

### React Query

React Query is a state management library that simplifies the process of fetching, caching, and updating data in React applications. Its major benefits include automatic background refetching, caching and stale data management, error handling, and easy pagination and infinite scrolling. Compared to setting up requests with useEffect, React Query provides a more declarative and centralized approach to managing data in React, which results in cleaner and more efficient code. It also reduces boilerplate code and improves performance by minimizing unnecessary re-renders and network requests.

- tons of features
- versions

[React Query](https://tanstack.com/query/v4/docs/react/overview)

#### Install

```sh
npm i @tanstack/react-query
```

### Setup React Query

**main.jsx**

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```

### First Query

**Items.jsx**

```js
import { useQuery } from "@tanstack/react-query"

// useQuery function basically return a object
const result = useQuery({
  queryKey: ["tasks"],
  queryFn: () => customFetch.get("/"),
  // customFetch come from util.js
})
console.log(result)
```

- Query Key

The unique key you provide is used internally for refetching, caching, and sharing your queries throughout your application.

- Query Function

A query function can be literally any function that returns a promise. The promise that is returned should either resolve the data or throw an error.

### Render the data :

**Items.jsx**

```js
import { useQuery } from "@tanstack/react-query"
import SingleItem from "./SingleItem"
import customFetch from "./utils"
const Items = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  })
  // console.log(result)

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>
  }

  return (
    <div className='items'>
      {data?.data?.taskList?.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
```

**same thing on different way**

```js
const { isLoading, data } = useQuery({
  queryKey: ["tasks"],
  // turn it into async
  queryFn: async () => {
    const { data } = await customFetch.get("/")
    return data
  },
})

return (
  <div className='items'>
    {data?.taskList?.map((item) => {
      return <SingleItem key={item.id} item={item} />
    })}
  </div>
)
```

### Error Handling

```js
const Items = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/something")
      return data
    },
  })

  if (isLoading) {
    return <p style={{ marginTop: "1rem " }}>Loading...</p>
  }

  // if (isError) {
  //   return <p style={{ marginTop: '1rem ' }}>there was an error...</p>;
  // }
  if (error) {
    return <p style={{ marginTop: "1rem " }}>{error.message}</p>
  }
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
```

#### Thunder Client Extension

Test API endpoints directly in VS CODE

#### Test Create Task (Challenge)

- check the docs and test endpoint in Thunder Client

#### Create Task

- when we creating, editing basically updating the resource or deleting we want to use **useMutation** hook.

**Form.jsx**

```js
const { mutate: createTask, isLoading } = useMutation({
  mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
})

const handleSubmit = (e) => {
  e.preventDefault()
  createTask(newItemName)
}
```

### useMutation Helper Options

useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both invalidating and refetching queries after mutations

```js
const { mutate: createTask, isLoading } = useMutation({
  mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
  onSuccess: () => {
    // do something
  },
  onError: () => {
    // do something
  },
})
```

#### Edit Task (Challenge)

- check the docs and test endpoint in Thunder Client
- setup the functionality
  hints : Item.jsx, look for edit log, and two arguments in mutationFn

#### Delete Task (Challenge)

- check the docs and test endpoint in Thunder Client
- setup the functionality
