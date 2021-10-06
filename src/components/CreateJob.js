import React,{useState} from 'react'
import {Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function CreateJob() {
	const {setToast} = useLogin()
	const {createJob} = useApi()
	const [title,setTitle] = useState('')
	const [description,setDescription] = useState('')
	const [location,setLocation] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function handleSubmit(){
		try{
			setLoading(true)
			setError(null)
			const res = await createJob({title,description,location})
			setToast({title:'Success',desc:'Job posted successfully'})
			window.location.href = '/jobs'
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err.toString()})
			history.push('/')
		}
		setLoading(false)
	}

	return (
		<>
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">Post a Job</h2>
			<Form onSubmit={handleSubmit} className="my-4">
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Job title*</Form.Label>
					<Form.Control 
						placeholder="Enter job title" 
						required value={title} 
						type="text"
						onChange={({target})=>setTitle(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Description*</Form.Label>
					<Form.Control 
						placeholder="Enter job description" 
						required value={description}
						as="textarea" rows={5} 
						type="text"
						onChange={({target})=>setDescription(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Location*</Form.Label>
					<Form.Control 
						placeholder="Enter location" 
						required value={location} 
						type="text"
						onChange={({target})=>setLocation(target.value)} 
					/>
				</Form.Group>
				<div align="center">
					{loading ?
						<div className="mt-3 spinner-grow prime-color-text" role="status">
						  <span className="sr-only"></span>
						</div>
						:
						<button type="submit" className='mt-3 auth-btn'>Post</button>
					}
				</div>
			</Form>
		</div>
		</>
	)
}