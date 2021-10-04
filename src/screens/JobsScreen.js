import React,{useState,useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Applicants from '../components/Applicants'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function JobsScreen() {
	const {setToast} = useLogin()
	const {getRecruiterJobs} = useApi()
	const [showApplicantsModal,setShowApplicantsModal] = useState(false)
	const [jobs,setJobs] = useState([])
	const [selectedJobId,setSelectedJobId] = useState(null)
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function fetchJobs(){
		try{
			setLoading(true)
			setError(null)
			const res = await getRecruiterJobs()
			// console.log(res.data)
			const resData = res?.data?.data?.data
			if(resData)
				setJobs(resData)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err.toString()})
			history.push('/')
		}
		setLoading(false)
	}
	function viewApplications(jobId){
		setSelectedJobId(jobId)
		setShowApplicantsModal(true)
	}

	useEffect(()=>{
		fetchJobs()
	},[])

	return (
		<>
			<div className="head head-job"></div>
			<div className="jobs">
				<Navbar />
				<div className="container">
					<div className="text-light mt-2">
						<p style={{fontSize:"12px"}}>
							<span><i className="fas fa-home"></i></span>
							<Link to="/" className="text-light">&nbsp;Home</Link>
						</p>
					</div>
					<h6 className="text-light mt-4 mb-3">
						<strong>Jobs posted by you</strong>
					</h6>
					<div className="job-group row">
						{jobs.map(job=>(
						<div key={job.id} className="p-3 job-card col col-12 col-sm-6 col-md-4">
							<h6>{job.title}</h6>
							<div className="info-content">{job.description}</div>
							<div className="job-bottom mt-3">
								<div className="location">
									<i className="fas fa-location-arrow"></i>
									{job.location}
								</div>
								<button onClick={()=>viewApplications(job.id)} className="job-btn">
									View applications
								</button>
							</div>
						</div>	
						))}
					</div>
					{jobs?.length===0 &&
						<div className="empty-jobs">
							<div>
							    <span className="empty-icon"><i className="far fa-file-alt"></i></span>
							    <p className="sec-color-text">Your posted jobs will show here!</p>
							    <Link to="/create-job" className="auth-btn py-2">Post a Job</Link>
							</div>
						</div>
					}
				</div>
			</div>
			<Modal show={showApplicantsModal} onHide={()=>setShowApplicantsModal(false)}>
				<Applicants jobId={selectedJobId} close={()=>setShowApplicantsModal(false)} />
			</Modal>
		</>
	)
}