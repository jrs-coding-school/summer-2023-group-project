//** Import Statements
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//** Setup (define helper functions and variables here)

function CrimeDetails() {
    //** Destructure Props
  const { id } = useParams()
//     //** State Variables
//     const [currentCrime, setCurrentCrime] = useState();
//     console.log(currentCrime)
//     //** Component Logic

//   useEffect (() => {
//     const getCurrentCrime = async () => {
//      try {
// const response = await fetch (`https://localhost:9000/reports/1`);
//  if (!response.ok) {
//     throw new Error('failed to fetch data')
//  }
// const result = await response.json();
// console.log(response.json())
//  setCurrentCrime(result)
//         } catch (err){
//             console.log(err);
//         }
//     };
//     getCurrentCrime();
//   }, [])
//     //** Return JSX
//     return (
//       <div> 
//         {currentCrime.description}
//         {console.log(currentCrime.description)}
//       </div>
//     )
//   }
//   export default CrimeDetails

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  console.log(data)
  useEffect(() => {
    fetch(`http://localhost:9000/reports/${id}`)
      .then((response) => {
        if(!response.ok) {
          throw new Error('failed to fetch data')
        }
        return response.json() // parse the response data
      })
      .then((result) => {
        setData(result)
        
    }) // set state when the data received
      .catch((err) => err) // return the error
    }, [])
if (!data) {
    return ( 
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
const filteredData = data.filter(item => item.crimeId == id )
console.log(filteredData)
return (
    //need to get data from array of objects where the crimeId matches the id from params
    <div>
      <h4>{data[0].description}</h4>
      <h4>{data[0].city}</h4>
      <h4>{data[0].state}</h4>
    </div>
)
    
}
export default CrimeDetails



