import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "./Movie";
const Row = ({ title, fetchURL,rowId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);
  console.log(movies);

  const slideLeft = () =>{
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft-500;
  }

  const slideRight = () =>{
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft+500;
  }
  
  return (
    <>
       <h2 className='p-4 font-bold text-white md:text-xl'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='absolute left-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
          size={40}
        />
        <div
          id={'slider' + rowId }
          className='relative w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='absolute right-0 z-10 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
