import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [phone, setPhone] = useState("");
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    const { studentid } = useParams();
    //const [studentdata, setStudentdata] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/students/" + studentid)
            .then((res) => res.json())
            .then((data) => {
                setId(data.id);
                setName(data.name);
                setPlace(data.place);
                setPhone(data.phone)
            }
            )
            .catch((err) => console.log(err.message))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { id, name, place, phone };
        fetch("http://localhost:8000/students/" + studentid,
            {
                method: "PUT",
                headers: {
                    "content.type": "application/json"
                },
                body: JSON.stringify(studentData)

            }
        )
            .then((res) => {
                alert("Student Data Updated Successfully.")
                navigate("/")
            })
            .catch((err) => console.log(err.message));
    }
    return (
        <div className="container">
            <h2>Edit Student Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID:</label>
                    <input type="text" id="id" name="id" required value={id} className="form-control"
                        onChange={e => setId(e.target.value)}
                        onMouseDown={() => setValidation(true)} />
                    {id.length === 0 && validation && <span className="error">Please Enter your ID.</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" id="name" name="name" required value={name} className="form-control" onChange={e => setName(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {name.length === 0 && validation && <span className="error">Please Enter your Name.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="place" className="form-label">Place:</label>
                    <input type="text" id="place" required value={place} className="form-control" onChange={e => setPlace(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {place.length === 0 && validation && <span className="error">Please Enter your place.</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone no:</label>
                    <input type="text" id="phone" required value={phone} className="form-control" onChange={e => setPhone(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {phone.length === 0 && validation && <span className="error">Please Enter your phone no.</span>}
                </div>
                <div>
                    <button className="btn btn-primary">Update</button>&nbsp;
                    <Link to="/" className="btn btn-secondary">Back</Link>
                </div>
            </form>
        </div>

    )
}