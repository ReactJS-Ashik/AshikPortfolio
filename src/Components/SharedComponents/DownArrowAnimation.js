import React from 'react'
import "../../resources/CSS/sharedComp.css"
import { udDirection } from '../../Utils/Constants'

export default function DownArrowAnimation(props) {
  return (
    <div className='arrow-row'>
        <div className={props.direction === udDirection ? 'arrow-boxV' : 'arrow-boxH'}>
            {[...Array(3)].map((_, index) => (
                <svg key={index} className={props.direction === udDirection ? 'arrowV' : "arrowH"} idth="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.880005 2.12L8.76 10L0.880005 17.88L3 20L13 10L3 0L0.880005 2.12Z" fill="#D41F1F"/>
                </svg>
            ))}
            {/* <svg className={props.direction === udDirection ? 'arrowV' : "arrowH"} idth="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.880005 2.12L8.76 10L0.880005 17.88L3 20L13 10L3 0L0.880005 2.12Z" fill="#D41F1F"/>
            </svg>
            <svg className={props.direction === udDirection ? 'arrowV' : "arrowH"} idth="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.880005 2.12L8.76 10L0.880005 17.88L3 20L13 10L3 0L0.880005 2.12Z" fill="#D41F1F"/>
            </svg> */}
        </div>
    </div>
  )
}
