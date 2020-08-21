import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImagePicker';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/formHook';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

import './PlaceForm.css';
const NewPlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ formState, inputHandler ] = useForm(
		{
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			},
			address: {
				value: '',
				isValid: false
			},
			image: {
				value: null,
				isValid: false
			}
		},
		false
	);

	const history = useHistory();

	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('description', formState.inputs.description.value);
			formData.append('address', formState.inputs.address.value);
			formData.append('image', formState.inputs.image.value);

			// for all action verbs except get, browser sens OPTIONS to the server whether it accepts that or not
			await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', formData, {
				Authorization: 'Bearer ' + auth.token
			});
			history.push(`/${auth.userId}/places`);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className="place-form" onSubmit={placeSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				{auth.isLoggedIn && <ImageUpload center id="image" onInput={inputHandler} />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[ VALIDATOR_REQUIRE() ]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[ VALIDATOR_MINLENGTH(5) ]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
				/>
				<Input
					id="address"
					element="input"
					label="Address"
					validators={[ VALIDATOR_REQUIRE() ]}
					errorText="Please enter a valid address."
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewPlace;
