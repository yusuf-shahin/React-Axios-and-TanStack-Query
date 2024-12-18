import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import customFetch from "./utils"
import { toast } from "react-toastify"

const Form = () => {
  const [newItemName, setNewItemName] = useState("")
  const queryClint = useQueryClient()

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onError: (error) => {
      // console.log(error)
      // console.log(error.response)
      // console.log(error.response.data)
      // console.log(error.response.data.msg)

      toast.error(error.response.data.msg)
    },
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["task"] })
      toast.success("task added")
      setNewItemName("")
    },
  })

  // console.log(result)

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(newItemName)
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
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
