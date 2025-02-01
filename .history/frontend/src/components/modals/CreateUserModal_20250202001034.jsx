//importing neccessary libraries for this modal which will add users to the database and we will be using this as a functional component for table
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

// Get API URL from environment variables
const apiUrl = import.meta.env.VITE_API_URL;

//starting of the functional component which takes a argument inside for adding the user to the user aray for dynamic display witout any reload
function CreateUserModal({ addUser }) {
  //using state variables for access of the input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //function for dynamic change of values for the input fields of name field
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //function for dynamic change of values for the input fields of email field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //creation of an async await function which first checks if all the inputs are filled, sends a post request to the server using axios then shows a toast message if is successful or not
  const handleCreateUser = async () => {
    // Validate input fields
    if (!name.trim() || !email.trim()) {
      toast.error("All Fields Are Required");
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        name: name.trim(),
        email: email.trim(),
      });

      if (response.status === 201) {
        toast.success("User Created Successfully");
        addUser(response.data);

        // Reset form
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error Creating User:", error);
      toast.error(error.response?.data?.message || "Error Creating User");
    }
  };

  //using bootstrap pre built components
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#CreateUserModal"
      >
        <b>Create User</b>
      </button>

      <div
        className="modal fade"
        id="CreateUserModal"
        tabIndex="-1"
        aria-labelledby="CreateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserModalLabel">
                <b>Enter Name and Email</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ex: John Doe"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ex: johndoe@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreateUser}
                data-bs-dismiss="modal"
              >
                <b>Create User</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//exporting the created function
export default CreateUserModal;
