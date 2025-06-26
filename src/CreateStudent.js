import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateStudent() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [phone, setPhone] = useState("");
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { id, name, place, phone };
        fetch("http://localhost:8000/students",
            {
                method: "POST",
                headers: {
                    "content.type": "application/json"
                },
                body: JSON.stringify(studentData)

            }
        )
            .then((res) => {
                alert("Student Data Saved Successfully.")
                navigate("/")
            })
            .catch((err) => console.log(err.message));
    }

    return (
        
        <div className="container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label"><strong>ID:</strong></label>
                    <input type="text" id="id" name="id" required value={id} className="form-control"
                        onChange={e => setId(e.target.value)}
                        onMouseDown={() => setValidation(true)} />
                    {id.length === 0 && validation && <span className="text-sm-end">Please Enter your ID.</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Name:</strong></label>
                    <input type="text" id="name" name="name" required value={name} className="form-control" onChange={e => setName(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {name.length === 0 && validation && <span className="text-start">Please Enter your Name.</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="place" className="form-label"><strong>Place:</strong></label>
                    <input type="text" id="place" required value={place} className="form-control" onChange={e => setPlace(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {place.length === 0 && validation && <span className="text-start">Please Enter your place.</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label"><strong>Phone no:</strong></label>
                    <input type="text" id="phone" required value={phone} className="form-control" onChange={e => setPhone(e.target.value)} onMouseDown={() => setValidation(true)} />
                    {phone.length === 0 && validation && <span className="text-start">Please Enter your phone no.</span>}
                </div>
                <div>
                    <button className="btn btn-primary">Save</button>&nbsp;
                    <Link to="/" className="btn btn-secondary">Back</Link>
                </div>

            </form>
        </div>
        

    )
}