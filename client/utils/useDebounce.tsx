import React, { useCallback } from "react";

export interface useDebounceOptions {
delay?:number ,
first?:boolean
}

const defaultOptions = {
  delay:200,
  first:true
}

function useDebounce(callback:Function,deps:React.DependencyList,options = defaultOptions){

  const {delay,first} = options;

  const cb = useCallback(
    (()=>{

      let shouldRun = first,timer:any;

      const cb =  (...args:any[]) => {

        clearTimeout(timer);

        if(shouldRun) {
          callback(...args);
          shouldRun = false;
        }else{
          timer = setTimeout(()=>{
            shouldRun = true;
            cb(...args)
          },delay)
        }
      }

      return cb;
    })(),
    deps,
  );

  return cb
}

export default useDebounce