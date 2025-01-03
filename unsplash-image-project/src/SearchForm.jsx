import { useState } from "react"
import { useGlovalContext } from "./useContext"

const SearchForm = () => {
  const { setSearchTerm } = useGlovalContext()

  function handleSubmit(e) {
    e.preventDefault()
    const searchValue = e.target.elements.search.value
    // console.log(e)
    // console.log(searchValue)
    setSearchTerm(searchValue)
  }
  return (
    <section>
      <h1 className='title'>unsplash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-input search-input'
          name='search'
          placeholder='universe'
        />
        <button type='submit' className='btn'>
          search
        </button>
      </form>
    </section>
  )
}

export default SearchForm
