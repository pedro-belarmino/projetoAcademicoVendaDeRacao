import UserForms from "../components/User/UserForms";
import UserList from "../components/User/UserList";

export default function User() {



    return (
        <div className="flex p-5 m-5">
            <UserForms />
            <UserList />
        </div>
    )
}