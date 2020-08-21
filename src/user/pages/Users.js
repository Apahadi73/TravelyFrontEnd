import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/httpHook';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

export default () => {
	const [ loadedUsers, setLoadedUsers ] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	// runs at the first mount
	useEffect(
		() => {
			const getUsers = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
					setLoadedUsers(responseData.users);
				} catch (error) {}
			};
			getUsers();
		},
		[ sendRequest ]
	);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList usersList={loadedUsers} />}
		</React.Fragment>
	);
};
