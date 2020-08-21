import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

export default ({ usersList }) => {
	if (usersList.length === 0) {
		return (
			<div className="center">
				<Card>
					<h2>No users found!</h2>
				</Card>
			</div>
		);
	}
	return (
		<div>
			{/* maps users list to userItem component */}
			{usersList.map((user) => (
				<div key={user.id}>
					<UserItem id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />
				</div>
			))}
		</div>
	);
};
