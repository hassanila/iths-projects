import {useGetUsersQuery, useDeleteUserMutation} from "../../store/api/usersApi";

const GetUsersStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    backgroundColor: "black",
    padding: "2rem",
    borderRadius: "10px",
    border: "1px solid white"
};

const GetUsers = () => {

    const {data: users, refetch} = useGetUsersQuery({});
    const [deleteUser] = useDeleteUserMutation()

    if (users) {
        return (
            <div className="GetUsers" style={GetUsersStyle}>

                <ul>
                    {users.map((user) => <li> {user.firstName} {user.lastName}
                        <button onClick={() => {
                            deleteUser({userId: user.id}).then(() => refetch())}
                        }>X</button>
                    </li>)
                    }
                </ul>
                <button style={{padding: ".5rem"}} onClick={refetch}>Reload</button>
            </div>
        )
    }


}

export default GetUsers