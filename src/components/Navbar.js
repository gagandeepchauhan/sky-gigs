import React,{useState} from 'react'
import { useLocation, Link } from 'react-router-dom'
import {useLogin} from '../contexts/LoginContext'

import Avatar from './Avatar'

export default function Navbar() {
	const {userStatus,isRecruiter,isLoggedIn,logout} = useLogin()
	const [showPop,setShowPop] = useState(false)
	const location = useLocation()
	let showRightHead = (location.pathname.includes('/auth/login')||location.pathname.includes('/auth/signup'))
							? false : true

	function togglePop(){
		setShowPop(prev=>!prev)
	}

	return (
		<div className="nav">
			<Link to="/jobs">
				<div className="logo">
					My<span className="prime-color-text">Jobs</span>
				</div>
			</Link>
			{showRightHead &&
				<div className="nav-links">
					{isLoggedIn() ?
						<>
							{isRecruiter() &&
								<Link className='nav-item' to="/create-job">Post a job</Link>
							}
							<Avatar name={userStatus?.data?.name} imgSrc={null} />

							<span style={{position:"relative"}} className="nav-item" onClick={togglePop} >
								<i className="fas fa-caret-down"></i>
								{showPop &&
									<span className="logout-pop">
										<span className="nav-item" onClick={logout} >Logout</span>
									</span>
								}
							</span>
						</>
					:
						<Link to="/auth/login" className="nav-btn">Login/Signup</Link>
					}
				</div>
			}
		</div>
	)
}