import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import customFetch from "./utils"
import { toast } from "react-toastify"
import axios from "axios"

const Form = () => {
  const [newItemName, setNewItemName] = useState("")
  const queryClint = useQueryClient()

  const result = useMutation({
    // mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    mutationFn: async (taskTitle) =>
      await axios.post("http://localhost:9000/api/tasks", { title: taskTitle }),
    onError: (error) => {
      // console.log(error)
      // console.log(error.response)
      // console.log(error.response.data)
      // console.log(error.response.data.msg)

      toast.error(error.response.data.msg)
    },
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["tasks"] })
      toast.success("task added")
      setNewItemName("")
    },
  })

  // console.log(result)

  const handleSubmit = (e) => {
    e.preventDefault()
    result.mutate(newItemName)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={result.isLoading}>
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
