import React,{useContext} from 'react'

import {useLogin} from './LoginContext'

import api from '../api/gigs'

const ApiContext = React.createContext()

export function useApi(){
	return useContext(ApiContext)
}

export default function ApiProvider({children}) {
	const {userStatus} = useLogin()
	const headConfig={
		headers:{
			Authorization:userStatus?.data?.token
		}
	}

	// recruiter api
	function getRecruiterJobs(page){
		return api.get(`/recruiters/jobs?page=${page}`,headConfig)
	}
	function getJobApplicants(jobId){
		return api.get(`/recruiters/jobs/${jobId}/candidates`,headConfig)
	}
	function createJob(data){ // {title,description,location}
		return api.post('/jobs',data,headConfig)
	}
	function deleteJob(data){ // {jobId}
		return api.delete('/jobs',data,headConfig)
	}
	// candidate api
	function getAllJobs(page){
		return api.get(`/jobs?page=${page}`)
	}
	function getJob(jobId){
		return api.get(`/jobs/${jobId}`)
	}
	function applyToJob(data){ // {jobId}
		return api.post(`/candidates/jobs`,data,headConfig)
	}
	function getAppliedJobs(){
		return api.get(`/candidates/jobs/applied`,headConfig)
	}

	const data = {
		createJob,
		getRecruiterJobs,
		getJobApplicants
	}

	return (
		<ApiContext.Provider value={data} >
			{children}
		</ApiContext.Provider>
	)
}