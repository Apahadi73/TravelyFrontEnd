import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					Users
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/places/new">ADD PLACE</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">Login/Sign Up</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink onClick={auth.logout} to="/auth">
						LOG OUT
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
