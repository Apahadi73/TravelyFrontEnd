import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';
import Button from '../../shared/components/FormElements/Button';

const PlaceList = ({ items }) => {
	const [ PlacesList, setPlacesList ] = useState(items);
	if (PlacesList.length === 0) {
		return (
			<div className="place-list center">
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<Button to="/places/new">Share Place</Button>
				</Card>
			</div>
		);
	}

	const onDeletePlace = (deletedPlaceId) => {
		const newList = PlacesList.filter((place) => place.id !== deletedPlaceId);
		setPlacesList(newList);
	};

	return (
		<ul className="place-list">
			{PlacesList.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.image}
					title={place.title}
					description={place.description}
					address={place.address}
					creatorId={place.creator}
					coordinates={place.location}
					onDelete={onDeletePlace}
				/>
			))}
		</ul>
	);
};

export default PlaceList;
