// import { useState, useCallback, useRef, useEffect } from 'react';

// export const useHttpClient = () => {
// 	const [ isLoading, setIsLoading ] = useState(false);
// 	const [ error, setError ] = useState();

// 	const activeHttpRequests = useRef([]); //stores data across active rerenders

// 	const sendRequest = useCallback(async (url, method = 'GET', body = null, header = {}) => {
// 		setIsLoading(true);

// 		// The AbortController interface represents a controller object that
// 		// allows you to abort one or more Web requests as and when desired.
// 		const httpAbortController = new AbortController();
// 		activeHttpRequests.current.push(httpAbortController);

// 		try {
// 			const response = await fetch(url, {
// 				method,
// 				body,
// 				header,
// 				signal: httpAbortController.signal
// 			});

// 			const responseData = await response.json();

// 			// disposes request controller after the request is made and successfule
// 			activeHttpRequests.current = activeHttpRequests.current.filter(
// 				(requestController) => requestController !== AbortController
// 			);

// 			// 400 and 500 errors would be recieved here instead of the catch

// 			if (!response.ok) {
// 				throw new Error(responseData.message);
// 			}
// 			setIsLoading(false);

// 			return responseData;
// 		} catch (error) {
// 			setIsLoading(false);
// 			setError(error.message); // message received from the backend
// 			throw error;
// 		}
// 	}, []);

// 	const clearError = () => {
// 		setError(null);
// 	};

// 	useEffect(() => {
// 		// clean up function
// 		// aborts all component's http requests if it unmounts from the dom
// 		return () => {
// 			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
// 		};
// 	}, []);
// 	return { isLoading, error, sendRequest, clearError };
// };

import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setIsLoading(true);
		const httpAbortCtrl = new AbortController();
		activeHttpRequests.current.push(httpAbortCtrl);

		try {
			const response = await fetch(url, {
				method,
				body,
				headers,
				signal: httpAbortCtrl.signal
			});

			const responseData = await response.json();

			activeHttpRequests.current = activeHttpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

			if (!response.ok) {
				throw new Error(responseData.message);
			}

			setIsLoading(false);
			return responseData;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
