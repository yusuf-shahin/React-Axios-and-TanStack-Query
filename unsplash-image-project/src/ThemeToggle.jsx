import { useGlovalContext } from "./useContext"

const ThemeToggle = () => {
  const { greeting } = useGlovalContext()
  console.log(greeting)

  return <div>Theme Toggle</div>
}

export default ThemeToggle
