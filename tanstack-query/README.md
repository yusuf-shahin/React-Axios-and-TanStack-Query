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

- in `localhost:9000/abc` we can find our **db.json** model in our browser .

#### We also add element in our mock data

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

- in browser , using that _url_`localhost:9000/todo` we can get that json file .
