import { useMutation, useQueryClient } from "@tanstack/react-query"
import customFetch from "./utils"
import axios from "axios"

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return axios.patch(`http://localhost:9000/api/tasks/${taskId}`, {
        isDone: isDone,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
        // we pass a object in editTask
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => console.log("delete task")}
      >
        delete
      </button>
    </div>
  )
}
export default SingleItem
