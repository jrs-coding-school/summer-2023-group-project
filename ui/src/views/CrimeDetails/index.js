//** Import Statements
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//** Setup (define helper functions and variables here)

function CrimeDetails(props) {
    //** Destructure Props
    const {} = props
    const { id } = useParams()
    //** State Variables
    const [currentCrime, setCurrentCrime] = useState();
    //** Component Logic
  useEffect (() => {
    const getCurrentCrime = async (id) => {
     try {
const response = await fetch (`https://localhost:9000/${id}`);
 if (!response.ok) {
    throw new Error('failed to fetch data')
 }
 const result = await response.json();
 setCurrentCrime(result)
        } catch (err){
            console.log(err);
        }
    };
    getCurrentCrime(id);
  }, [])
    //** Return JSX
    return (
      <div> 
        {currentCrime.title}
      </div>
    )
  }
  export default CrimeDetails