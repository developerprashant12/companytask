import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleView } from '../features/posts/postSlice';

function ViewToggle() {
 
    const dispatch = useDispatch();

  return (
    <button onClick={()=> dispatch(toggleView())}>Toggle View</button>
  );
};

export default ViewToggle;
