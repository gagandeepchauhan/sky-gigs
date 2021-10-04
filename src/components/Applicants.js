import React,{useState,useEffect} from 'react'
import {Modal} from 'react-bootstrap'

import Avatar from './Avatar'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function Applicants({jobId,close}) {
	const {getJobApplicants} = useApi()
	const {setToast} = useLogin()
	const [applications,setApplications] = useState(null)
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)

	async function getApplications(){
		try{
			setLoading(true)
			setError(null)
			const res = await getJobApplicants(jobId)
			const resData = res?.data?.data?.data
			if(resData)
				setApplications(resData)
			console.log(res?.data)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err.toString()})
		}
		setLoading(false)
	}

	useEffect(() => {
		getApplications()
	}, [])

	return (
		<Modal.Body className="app-modal">
			<div className=" p-4">
				<h2 className="auth-head app-head pb-3">Applicants for this job</h2>
				<span onClick={close} className="close-icon">
					<i className="fas fa-times"></i>
				</span>
				{applications?.length===0 ?
					<>
						<h6 className="sec-color-text">{applications.length} applications</h6>
						<div className="empty-applications mt-3">
							<div>
								<span className="empty-icon"><i className="far fa-file-alt"></i></span>
								<p className="sec-color-text">No applications available!</p>
							</div>
						</div>
					</>
					:
					<>
						<h6 className="sec-color-text">Total {applications?.length} applications</h6>
						<div className="applications mt-3 styled-scrollbar">
							<div className="application-card">
								<div className="card-head">
									<Avatar name='Eliza Lucas' imgSrc={null} />
									<div className="app-info">
										<h6 className="sec-color-text">Eliza Lucas</h6>
										<small>abc@gmail.com</small>
									</div>
								</div>
								<div className="card-body">
									<strong className="sec-color-text">Skills</strong>
									<p className="sec-color-text mb-0">
										Coding, designing, graphics, website, app ui
									</p>
								</div>
							</div>
							<div className="application-card">
								<div className="card-head">
									<Avatar name='Eliza Lucas' imgSrc={null} />
									<div className="app-info">
										<h6 className="sec-color-text">Eliza Lucas</h6>
										<small>abc@gmail.com</small>
									</div>
								</div>
								<div className="card-body">
									<strong className="sec-color-text">Skills</strong>
									<p className="sec-color-text mb-0">
										Coding, designing, graphics, website, app ui
									</p>
								</div>
							</div>
						</div>
					</>
				}
			</div>
		</Modal.Body>
	)
}