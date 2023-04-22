import React from 'react'
import './Search.css'

const Search = () => {
  return (
  <>



<div className="flex justify-center box-border box-shadow p-4">
  <form className="flex">
    <input
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none min-w-100"
      type="text"
      placeholder="Search..."
    />
    <input
      className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg ml-4 text-sm focus:outline-none"
      type="text"
      placeholder="Location"
    />
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      style={{ backgroundColor: "#46c29d" }}
      type="submit"
    >
      Search
    </button>
  </form>
</div>

  </>
  )
}

export default Search