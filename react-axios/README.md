# Axios Tutorial

#### Docs

[Axios Docs](https://axios-http.com/docs/intro)

#### Setup

- we get everything in **app.js**

- Our main code base is **examples repo**
- we practice our code in **examples repo**
- **final repo** is not our concern
- **final repo** basically our finish project

#### Install

```sh
npm install axios
```

```js
<script src='https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'></script>
```

### First Request

- import axios

- axios.get(url)
- axios.post(url)
- axios.patch/put(url)
- axios.delete(url)

- default get axios(url)

- returns a promise
- response data located in data property
- error in error.response

**in fetch data**

```js
const url = "https://www.course-api.com/react-store-products"

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const resp = await fetch(url)
      const data = await resp.json()

      console.log(data)
    } catch (error) {
      console.log(console.error())
    }
  }
  useEffect(() => {
    fetchData()
    // console.log("first axios request")
  }, [])

  return <h2 className='text-center'>first request</h2>
}
export default FirstRequest
```

- using fetch its only show us data

```js
import axios from "axios"

const fetchData = async () => {
  try {
    // axios.get(), axios.post(),axios.put(), axios.delete()
    const response = await axios(url)

    console.log(response)
  } catch (error) {
    console.log(error.response)
  }
}
```

- basically **axios** give us a huge object , where our data is store in our **data** property .
- so, in axios we get everything of data .

### Headers (./examples/2-headers)

- second argument

- axios.get(url,{})

**Why we need that ?**

```jsx
const Headers = () => {
  const [joke, setJoke] = useState("random dad joke")

  const fetchDadJoke = async () => {
    try {
      const data = await axios(url)
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchDadJoke()
  }, [])
}
```

- in console we get that :-
  ![Relative](./Image/WhatsApp%20Image%202024-11-08%20at%2012.18.46%20PM.jpeg)

- if we click the config button we can find
  ![Relative](./Image/WhatsApp%20Image%202024-11-08%20at%2012.10.39%20PM.jpeg)

- inside config , we find our headers . Inside headers we get the those things.
  ![!Relative](./Image/WhatsApp%20Image%202024-11-08%20at%2012.13.21%20PM.jpeg)

So we want to get dadJoke from API . We can maintain this process :-

```jsx
const Headers = () => {
  const [joke, setJoke] = useState("random dad joke")

  const fetchDadJoke = async () => {
    try {
      const data = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      })
      // console.log(data.data.joke)
      const getJoke = data.data.joke
      setJoke(getJoke)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchDadJoke()
  }, [])
```

**same things in different approach**

```jsx
      const { data } = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      })
      setJoke(data.joke)
    } catch (error) {
      console.log(error.response)
    }
```

**The whole code is**

```js
import { useEffect, useState } from "react"
import axios from "axios"

const url = "https://icanhazdadjoke.com/"
// Accept : 'application/json'

const Headers = () => {
  const [joke, setJoke] = useState("random dad joke")

  const fetchDadJoke = async () => {
    try {
      const { data } = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      })

      setJoke(data.joke)
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
```

#### Post Request (3-post-request)

- send data to the server
- axios.post(url, { data })
- more options (auth header) - axios.post(url, { data },{})

```js
try {
  const resp = await axios.post(url, { data })
} catch (error) {
  console.log(error.response.data)
}
```

#### Global Defaults

```js
axios.defaults.headers["Accept"] = "application/json"

axios.defaults.baseURL = "https://api.example.com"

// In latest axios version common property returns "undefined"
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers["Authorization"] = AUTH_TOKEN

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
```

#### Custom Instance

```js
const authFetch = axios.create({
  baseURL: "https://www.course-api.com",
  headers: {
    Accept: "application/json",
  },
})
```

#### Interceptors

- global and custom

```js
authFetch.interceptors.request.use(
  (request) => {
    // request.headers.common['Accept'] = `application/json`;
    request.headers["Accept"] = `application/json`

    console.log("request sent")
    // must return request
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

authFetch.interceptors.response.use(
  (response) => {
    console.log("got response")
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response.status === 404) {
      // do something
      console.log("NOT FOUND")
    }
    return Promise.reject(error)
  }
)
```

##### Update

In the latest version there is no common property

```js
// In latest axios version common property returns "undefined"
// axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers["Accept"] = "application/json"

// In latest axios version common property returns "undefined"
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers["Authorization"] = AUTH_TOKEN
```

```js
// request.headers.common['Accept'] = `application/json`;
request.headers["Accept"] = `application/json`
```
