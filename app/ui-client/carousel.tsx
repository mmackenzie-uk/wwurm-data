"use client"

import { useEffect, useState } from "react";

import { CAROUSEL_IMG_ARR, CAROUSEL_INTERVAL, BRAND, CAROUSEL_INIT_STATE } from "../configuration/wwurm";

const LEN = CAROUSEL_IMG_ARR.length;

export default function Carousel() {
  // when the state changes, the component will re-render
  const [count, setState] = useState(CAROUSEL_INIT_STATE);

  useEffect(() => {
    const id = setInterval(() => setState(c => (c + 1) % LEN), CAROUSEL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">  
      <div className="overlay-wrap">
        <img className="overlay-img" src={BRAND} />
      </div>  
      <ul className="marker-dots"> 
        {
          CAROUSEL_IMG_ARR.map((_, idx) => {
            const state = (idx === count) ? "marker-active" : "";
            return <li key={idx} className={state}><button>{idx}</button></li>;
          })
        }
      </ul> 
      <div className="image-wrap"> 
        {
          CAROUSEL_IMG_ARR.map((src, idx) => {
            const state = (idx === count) ? "image active" : "image inactive";
            return <img key={idx} className={state} src={src} />;
          })
        }
      </div> 
    </div> 
  );
}


