
import React from 'react'
import { MdDelete } from "react-icons/md";
function Card({ title, desc, deleteNote }) {
    return (

        <div className="card">

            <div className = "del" onClick = {()=>{deleteNote(title)}}>
            <MdDelete />

            </div>

            <div>T:{title}</div>
            <div>D:{desc}</div>

        </div>
    )
}

export default Card

