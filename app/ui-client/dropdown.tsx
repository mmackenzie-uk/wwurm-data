"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ICategoryDTO } from "../DTO/categoryDTO";


export default function Dropdown({ list, name } : {
    list: Array<ICategoryDTO>;
    name: string;
}) {
    const [state, setState] = useState("");
    const router = useRouter();

    const handleClick = () => {
        if (state === "show") {
            setState("dropdown-content");
        } else {
            setState("show");
        } 
    }
    const handleNavigation = (url: string) => {
        setState("");
        router.push(`/${url}`);   
    }

    const btnState = (state === "show")? "btn-minus" : "btn-plus";
    return (
        <li className="dropdown">
            <button onClick={handleClick} className="dropdown-btn">{name} <span className={btnState}></span></button>
            <ul className={`dropdown-content ${state}`} >
                <li key={-1} onClick={() => handleNavigation("")}>All Produkte</li>
            {
                list.map(({slug, name}, idx) => <li key={idx} onClick={() => handleNavigation(slug)}>{name}</li>)
            }
            </ul>
        </li>
    );
}

