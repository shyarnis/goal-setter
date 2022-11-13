import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"

function Login() {
  // use of useEffect
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // destructuring
  const {email, password} = formData
  
  // onChange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault()
  }

  // return
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals </p>
      </section>

      {/*  form for login */}
      <section className="form">
        <form onSubmit={onSubmit}>

          {/* email */}
          <div className="form-group">
            <input 
              type={'email'} 
              className='form-control' 
              id='email'
              name="email"
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>

          {/* password */}
          <div className="form-group">
            <input 
              type={'password'} 
              className='form-control' 
              id='password'
              name="password"
              value={password}
              placeholder='Enter Password'
              onChange={onChange}
            />
          </div>

        </form>

        {/* Submit button */}
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </section>
    </>
  )
}

export default Login