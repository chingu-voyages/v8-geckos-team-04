import React, { useState } from 'react';
import { Route } from 'react-router-dom'

function Score() {

	return (
		<div>
			<h1>Guess The Language</h1>
			<div>Total Score:</div>
			<Route render={({history}) => (
	            <button onClick={() => { history.push('/history') }}>
	            	View History
	            </button>
        	)} />
		</div>
	);
}

export default Score;