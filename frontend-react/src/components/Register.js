import {useState} from 'react'

export default function Register() {
    const [userInfo, setUserInfo] = useState({name:'', email:'', password:''})
    // const [pwd, setPassword] = useState('')

    async function handleUserRegistration(event) {
        event.preventDefault()
        const res = await fetch('http://localhost:1050/api/users/', {
            method:'POST',
            body: JSON.stringify(userInfo),
            headers:{'Content-Type' : 'application/json'},
        })
        if (res.status === 200) {
            alert('registration successful');
          } else {
            alert('registration failed');
          }
    }

    return(
        <>
            <form className="register" onSubmit={handleUserRegistration}>
                <h1>Register</h1>
                <input 
                    type='text' 
                    placeholder="email"
                    value={userInfo.email}
                    onChange={ event => setUserInfo({...userInfo, email:event.target.value})}
                />
                <input 
                    type='text' 
                    placeholder="username"
                    value={userInfo.name}
                    onChange={(event) => {
                        setUserInfo({...userInfo, name:event.target.value})
                    }}
                />
                <input 
                    type='password' 
                    placeholder="password"
                    value={userInfo.password}
                    onChange={(event) => {
                        setUserInfo({...userInfo, password:event.target.value})
                    }}
                />
                <button>Submit</button>
            </form>
        </>
    )
}