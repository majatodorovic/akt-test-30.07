"use client";

import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // useEffect hook is used to run the function inside it only when the value changes
  // and it will run after the delay has passed
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // this will clear the timeout and run the function again
    // if the value changes before the delay has passed
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
