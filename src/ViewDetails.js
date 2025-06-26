import {useParams} from "react-router-dom"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ViewDetails(){
    console.log(useParams())
    const {studentid}=useParams();
    const [studentdata, setStudentdata] = useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/students/"+studentid)
        .then((res)=>res.json())
        .then((data)=>setStudentdata(data))
        .catch((err)=>console.log(err.message))
    },[])
    console.log(studentid);
    return(
        <div className="container">
            <h2>Student Details</h2>
            <div className="details">
            <p><strong>ID: </strong>{studentdata.id}</p>
            <p><strong>Name: </strong>{studentdata.name}</p>
            <p><strong>Place: </strong>{studentdata.place}</p>
            <p><strong>Phone: </strong>{studentdata.phone}</p>
            </div>
            <Link to="/" className="btn btn-danger">Back</Link>
        </div>
        
    )
}