import {useState} from "react";
import {useHistory} from "react-router-dom";

function Landing({users, activeUserSetter}) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    function formChangeHandler(e) {
        const name = e.target.name;
        const val = e.target.value;

        setFormData({...formData, [name]: val});
    }

    function submitHandler(e) {
        e.preventDefault();

        let userCheck = users.filter(user => user.name === formData.name && user.email === formData.email)
        if (userCheck.length > 0) {
            activeUserSetter(userCheck[0]);
            history.push("/home")
        } else {
            //DAVERY NOTE - CREATE THE POST PROCESS FOR CREATING
            //USERS AND ADDING THEM
            let userSeed = {name: formData.name, email: formData.email};
            let postConfig = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(userSeed)
            };
            let postURL = 'http://localhost:9292/users';
            console.log("I need to create a User object for you!");
            fetch(postURL, postConfig)
            .then(res => res.json())
            .then(userObj => activeUserSetter(userObj))
            console.log("User created, and active user set to new user obj");
            history.push("/home");
        }
    }

    return (
        <>
        <p>Please login to have access to inventory management functions</p>
        <form onSubmit={submitHandler} name="login" id="login">
            <label htmlFor="name"></label>
            <input value={formData.name} onChange={formChangeHandler} name="name" id="name" type="text" placeholder="username"/>
            <label htmlFor="email"></label>
            <input value={formData.email} onChange={formChangeHandler} name="email" id="email" type="text" placeholder="email"/>
            <button type="submit" id="submit" name="submit">Login / Create Account</button>
        </form>
        </>
    )
}

export default Landing;