import {useState} from 'react';
import TextInput from "../TextInput";
import {useCreateUserMutation, useGetUsersQuery} from "../../store/api/usersApi";

const createUserStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    backgroundColor: "black",
    padding: "2rem",
    borderRadius: "10px",
    border: "1px solid white"
};

let done = false;

const CreateUser = () => {

    const {refetch} = useGetUsersQuery({})

    const [createUser, result] = useCreateUserMutation();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [status, setStatus] = useState("");
    const [submitted, setSubmitted] = useState(false);

/*    const usersToAdd = [
        {firstName: 'John', lastName: 'Doe'},
        {firstName: 'Alice', lastName: 'Smith'},
        {firstName: 'Bob', lastName: 'Johnson'},
        {firstName: 'Ella', lastName: 'Wilson'},
        {firstName: 'Mike', lastName: 'Brown'},
        {firstName: 'Olivia', lastName: 'Davis'},
        {firstName: 'James', lastName: 'Miller'},
        {firstName: 'Sophia', lastName: 'Anderson'},
        {firstName: 'William', lastName: 'Garcia'},
        {firstName: 'Emma', lastName: 'Martinez'},
    ];

    if (!done) {
        (async () => {
            done = true
            for (let index = 0; index < usersToAdd.length; index++) {
                const user = usersToAdd[index];

                try {
                    await createUser({user});
                    console.log(`User ${index + 1} added successfully`);
                } catch (error) {
                    console.error(`Error adding user ${index + 1}: ${error}`);
                }
            }
        })()
    }*/

    const submitHandler = () => {
        if (firstName !== "" && lastName !== "") {
            createUser({
                user: {
                    firstName,
                    lastName
                }
            }).then(() => refetch())
            setSubmitted(true)
            setStatus(`Hej ${firstName} ${lastName}!`)
            setFirstName("")
            setLastName("")
        } else {
            setSubmitted(false)
            setStatus("All fields are required!")
        }

        setTimeout(() => {
            setSubmitted(false)
            setStatus("")
        }, 5000)
    }

    return (
        <div className="CreateUser" style={createUserStyle}>
            <TextInput value={firstName} placeholder="First Name" onInput={(evt) => {
                setFirstName(evt.target.value.trim())
            }}/>
            <TextInput value={lastName} placeholder="Last Name" onInput={(evt) => {
                setLastName(evt.target.value.trim())
            }}/>
            <input type="password" style={{padding: ".5rem"}} placeholder="Password"/>
            <button style={{padding: ".5rem"}} onClick={submitHandler}>Create</button>

            <p style={{color: submitted ? "green" : "red"}} className="status">{status}</p>
        </div>
    )
}

export default CreateUser