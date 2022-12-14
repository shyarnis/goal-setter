import { useState, useEffect } from "react"
import {FaUser} from "react-icons/fa"

function Register() {
  // use of useEffect
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // destructuring
  const {name, email, password, password2} = formData
  
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      {/*  form for registration */}
      <section className="form">
        <form onSubmit={onSubmit}>
          
          {/* name */}
          <div className="form-group">
            <input 
              type={'text'} 
              className='form-control' 
              id='name'
              name="name"
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>

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

          {/* password2 */}
          <div className="form-group">
            <input 
              type={'password'} 
              className='form-control' 
              id='password2'
              name="password2"
              value={password2}
              placeholder='Confirm Password'
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

export default Register