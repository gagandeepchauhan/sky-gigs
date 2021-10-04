import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form} from 'react-bootstrap'

import {useLogin} from '../contexts/LoginContext'

export default function Signup() {
	const {signup,setUserStatus,setToast} = useLogin()
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')
	const [userRole,setUserRole] = useState(0)
	const [name,setName] = useState('')
	const [skills,setSkills] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	function toggleUserRole(){
		setUserRole(prev=>{
			if(prev) return 0
			return 1
		})
	}

	async function handleSubmit(e){
		e.preventDefault()
		if(password!==confirmPassword){
			setToast({title:'Error',desc:"Passwords should match"})
			return 
		}
		try{
			setLoading(true)
			setError(null)
			const res = await signup({email,password,confirmPassword,userRole,name,skills})
			setUserStatus({data:res.data?.data})
			setToast({title:'Success',desc:'successfully signed up!'})
			history.push('/jobs')
			console.log(res)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err.toString()})
			console.log(err)
		}
		setLoading(false)
	}

	return (
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">Signup</h2>
			<Form onSubmit={handleSubmit} className="my-4">
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">I'm a*</Form.Label>
					<div className="d-flex justify-content-start align-items-center">
						<div onClick={toggleUserRole} className={`user-role ${userRole===0 && 'active'}`}>
							<span>R</span>
							<span>Recruiter</span>
						</div>
						<div onClick={toggleUserRole} className={`user-role ${userRole===1 && 'active'}`}>
							<span>C</span>
							<span>Candidate</span>
						</div>
					</div>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">First Name*</Form.Label>
					<Form.Control 
						placeholder="Enter your first name" 
						required value={name} 
						type="text"
						onChange={({target})=>setName(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Email address*</Form.Label>
					<Form.Control 
						placeholder="Enter your email" 
						required value={email} 
						type="email"
						onChange={({target})=>setEmail(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3 d-flex justify-content-between align-items-center">
					<div>
						<Form.Label className="sec-color-text">Create Password*</Form.Label>
						<Form.Control 
							placeholder="Enter your password" 
							required value={password} 
							type="password"
							onChange={({target})=>setPassword(target.value)} 
						/>
					</div>
					<div>
						<Form.Label className="sec-color-text">Confirm Password*</Form.Label>
						<Form.Control 
							placeholder="Enter your password" 
							required value={confirmPassword} 
							type="password"
							onChange={({target})=>setConfirmPassword(target.value)} 
						/>
					</div>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Skills</Form.Label>
					<Form.Control 
						placeholder="Enter comma seperated skills" 
						type="text"
						onChange={({target})=>setSkills(target.value)} 
					/>
				</Form.Group>
				<div align="center">
					<button type="submit" className='mt-3 auth-btn'>Signup</button>
				</div>
			</Form>
			<div align="center">
				<Link to="/auth/login">
					<small className="sec-color-text">Have an account? <span className="prime-color-text">Login</span></small>
				</Link>
			</div>
		</div>
	)
}