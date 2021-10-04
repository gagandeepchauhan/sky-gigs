import React from 'react'

import Navbar from '../components/Navbar'
import CreateJob from '../components/CreateJob'

export default function CreateJobScreen() {
	return (
		<>
			<div className="head head-auth"></div>
			<div className="auth">
				<Navbar />
				<div className="container p-3">
					<CreateJob />
				</div>
			</div>
		</>
	)
}