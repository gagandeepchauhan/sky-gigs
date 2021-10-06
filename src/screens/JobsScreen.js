import React,{useState,useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Applicants from '../components/Applicants'
import FullScreenLoader from '../components/FullScreenLoader'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

const LIMIT = 20

export default function JobsScreen() {
	const {setToast} = useLogin()
	const {getRecruiterJobs} = useApi()
	const [showApplicantsModal,setShowApplicantsModal] = useState(false)
	const [jobs,setJobs] = useState([])
	const [selectedJobId,setSelectedJobId] = useState(null)
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const [page,setPage] = useState(1)
	const [limit,setLimit] = useState(LIMIT)
	const [totalCount,setTotalCount] = useState(0)
	const history = useHistory()

	function showLeft(){
		return page>1
	}
	function showRight(){
		return (page*limit)<totalCount
	}
	async function fetchJobs(){
		try{
			setLoading(true)
			setError(null)
			const res = await getRecruiterJobs(page)
			// console.log(res.data)
			const resData = res?.data?.data?.data
			if(resData){
				let metadata = res?.data?.data?.metadata
				setLimit(metadata?.limit)
				setTotalCount(metadata?.count)
				setJobs(resData)
			}
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
	useEffect(()=>{
		if(jobs?.length>0){
			fetchJobs()
		}
	},[page])


	return (
		<>
			{loading &&
				<FullScreenLoader />
			}
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
					<h5 className="text-light mt-4 mb-3">
						<strong>Jobs posted by you</strong>
					</h5>
					<div className="job-group row styled-scrollbar">
						{jobs?.map(job=>(
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
					{jobs?.length!=0 &&
						<div className="pagination">
							<button className="page-btn" onClick={()=>setPage(prev=>prev-1)} disabled={!showLeft()}>
								<i className="fas fa-backward"></i>
							</button>
							<span>{page}</span>
							<button className="page-btn" onClick={()=>setPage(prev=>prev+1)} disabled={!showRight()}>
								<i className="fas fa-forward"></i>
							</button>
						</div>
					}
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