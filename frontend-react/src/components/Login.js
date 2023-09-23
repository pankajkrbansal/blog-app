import {useContext, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from './UserContext';

export default function Register() {
    const [userInfo, setUserInfo] = useState({ email:'', password:''})
    // const [email, setUserEmail] = useState('')
    // const [password, setUserPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const {setUserDetails} = useContext(UserContext)

    async function handleUserLogin(event) {
        event.preventDefault()
        const res = await fetch('http://localhost:1050/api/users/auth', {
            method:'POST',
            body: JSON.stringify(userInfo),
            headers:{'Content-Type' : 'application/json'},
            credentials:'include'
        })
        console.log("\n\nresponse 14\n\n", res);
        if (res.ok) {
            res.json().then(usrData => {
                console.log(usrData);
                setUserDetails(usrData)                
                setRedirect(true); 
            })
          } else {
            alert('wrong credentials');
          }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <>
            <form className="login" onSubmit={handleUserLogin}>
                <h1>Login</h1>
                <input 
                    type='text' 
                    placeholder="email"
                    value={userInfo.email}
                    onChange={ event => setUserInfo({...userInfo, email:event.target.value})}
                    // onChange={event => setUserEmail(event.target.value)}
                />
                <input 
                    type='password' 
                    placeholder="password"
                    value={userInfo.password}
                    onChange={(event) => {
                        setUserInfo({...userInfo, password:event.target.value})
                    }}
                    // onChange={event => {setUserPassword(event.target.value)}}
                />
                <button>Submit</button>
            </form>
        </>
    )
}