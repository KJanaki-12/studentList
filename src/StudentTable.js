import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";

export default function StudentTable() {
    // console.log(useState(1));
    const [students, setStudents] = useState("");
    const navigate=useNavigate();
    const DisplayDetails=(id)=>{
       navigate("/student/view/"+id)
        
    }
    const EditDetails=(id)=>{
        navigate("/student/edit/"+id);
    }
    const RemoveDetails=(id)=>{
        if(window.confirm("Are you sure you want to delete?")){
            fetch("http://localhost:8000/students/"+id, 
           { method:"DELETE",}
        )
        .then((res)=>{
            alert("Removed Student Data Successfully.")
            window.location.reload();
            navigate("/")
        })
        .catch((err)=>console.log(err.message));
    }
        
    }

    useEffect(() => {
        fetch('http://localhost:8000/students')
            .then((res) => res.json())
            .then((data) =>
                setStudents(data)).catch((err) =>
                    console.log(err.message))
    }, [])
    return (
        <div className="container-fluid">
            <h2>Student Records</h2>
            <div className="table-container">
                {/* <a href="#" className="btn btn-add">Add new Student</a> */}
                <Link to="/student/create" className="btn btn-outline-info">Add new Student</Link>
                <br></br>
                <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>SI NO.</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Phone</th>
                            <th>Acdtions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students && students.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.place}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button onClick={()=>DisplayDetails(item.id)} className="btn btn-success">View</button>&nbsp;
                                        <button onClick={()=>EditDetails(item.id)} className="btn btn-warning">Edit</button>&nbsp;
                                        <button onClick={()=>RemoveDetails(item.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}