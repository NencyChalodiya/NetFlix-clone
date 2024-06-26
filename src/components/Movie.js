import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'
const Movie = ({item}) => {
  const [like,setLike] = useState(false);
  const [saved,setSaved] = useState(false);
  const {user} = UserAuth();

  const movieID = doc(db,'users',`${user?.email}`)

  const saveShow = async () => {
    if(user?.email){
      setLike(!like)
      setSaved(true)
      await updateDoc(movieID,{
        savedShows : arrayUnion({
          id:item.id,
          title:item.title,
          img:item.backdrop_path
        })
      })
    }
    else{
      alert('Please log in to save a movie')
    }
  }
  
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="block w-full h-auto"
        src={`https://images.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      ></img>
      <div className="absolute top-0 left-0 w-full h-full text-white opacity-0 hover:bg-black/80 hover:opacity-100">
        <p className="flex items-center justify-center h-full text-xs font-bold text-center white-space-normal md:text-sm">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute text-gray-300 top-4 left-4" />
          ) : (
            <FaRegHeart className="absolute text-gray-300 top-4 left-4" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
