import Title from "./components/Title"
import Setup from "./examples/1-first-request"
import Headers from "./examples/2-headers"
import Post from "./examples/3-post-request"
import CustomInstance from "./examples/5-custom-instance"
//! custom instance
import custom from "./final/axios/custom"
function App() {
  return (
    <main>
      <Title />
      {/* <Setup /> */}
      {/* <Headers /> */}
      {/* <Post /> */}
      <CustomInstance />
    </main>
  )
}

export default App
