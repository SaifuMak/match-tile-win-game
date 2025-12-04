import React, { useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";


export default function SearchComponent({ onSearch, query, setQuery }) {


  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
    else {
      onSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearInput = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center w-full  border border-black/30 rounded-md ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by name..."
        className="flex-1 p-3 outline-none text-sm"
      />
      {query && (
        <button
          onClick={clearInput}
          className=" cursor-pointer mr-3 hover:bg-slate-200 p-1 rounded-md text-black"
        >
          <IoMdClose size={20} />
        </button>
      )}
      <button
        onClick={handleSearch}
        className=" mr-2 text-black hover:bg-slate-200  p-1 cursor-pointer  rounded-md flex items-center justify-center"
      >
        <IoMdSearch size={20} />
      </button>
    </div>
  );
}