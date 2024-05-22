/*
  The exercise is meant to test code fluency, understanding of react idioms, and communication.
  To solve, rewrite the snippet of code to a better version and a description of why the code is improved.
  
  Submit a fork or a PR to gabriel@silver.dev for feedback and corrections.

  Some references used:
  https://claritydev.net/blog/the-most-common-mistakes-when-using-react
*/
import React, {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	FormEvent,
} from 'react';

/**
 * ISSUES - FunctionsAsComponents
 * 1 - Lack of return statement on showButton
 * 2 - Unnecesary showButton function, the button is used once (doesn't help with optimization/redundancy) & makes the component harder to read
 * 3 - The "Function as child" pattern is something to avoid if possible, a top-bottom read is a simpler approach for code readability
 */

// export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
// 	const showButton = () => {
// 		<button>{buttonText}</button>;
// 	};

// 	return <div>{showButton()}</div>;
// }

/**
 *
 * IMPROVEMENTS - FunctionsAsComponents
 * 1- Easier to read/mantain without unnecesary functions
 */

export function FunctionsAsComponents({ buttonText = 'Start Now' }) {
	return (
		<div>
			<button>{buttonText}</button>
		</div>
	);
}

/**
 * ISSUES - objectCopying
 * 1 - Shallow copy, first level primitives are re-created but nested objects are passed by reference
 * 2 - Return object is altered due to the manipulation of the copy variable, not mantaining the immutability of the copy process
 */

// export function objectCopying() {
// 	const object = { a: { c: 1 }, b: 2 };
// 	const copy = { ...object };
// 	copy.a.c = 2;
// 	return { ...object };
// }

/**
 *
 * IMPROVEMENTS - objectCopying
 * 1 - Changed spread operator for the function structuredClone (now supported by all major browsers)
 * 2 - The implementation ensures a deep copy at all nested leves regarding of the data type inside the original object
 * 3 - Another possible improvement could be using the JSON.parse(JSON.stringify(object)) combo, but it doesn't work with non-JSON-safe data
 */

export function objectCopying() {
	const object = { a: { c: 1 }, b: 2 };
	const copy = structuredClone(object);
	copy.a.c = 2;
	return structuredClone(object);
}

/**
 * ISSUES - arrayCopying
 * 1 - Even if it generates an array with a different reference, the objects inside are shared between both arrays
 * 2 - This may cause reference issues if those are modified on the outside
 */

// export function arrayCopying() {
// 	const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
// 	const copy = [...array];
// 	return copy;
// }

/**
 *
 * IMPROVEMENTS - arrayCopying
 * 1 - Assuming the depth of the given objects inside the array, a map over each element and a spread operator is enough to safely copy the array
 * 2 - If more complex objects are nested the use of structuredClone is recommended
 */

export function arrayCopying() {
	const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
	const copy = array.map((item) => ({ ...item }));
	return copy;
}

/**
 * ISSUES - user abort / UseEffect
 * 1 - Lack of types
 * 2 - No handling of the server response
 * 3 - Lack of error handling
 * 4 - It can request an indefinite number of times (based on the amount of fetchURL changes), should be cancelled on each change
 * 5 - Fetching even if url is not provided
 */

// user abort
// export function UseEffect({ fetchURL, label }) {
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			await fetch(fetchURL);
// 		};

// 		fetchData();
// 	}, [fetchURL]);

// 	return (
// 		<div>
// 			<button>{label}</button>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - user abort / UseEffect
 * 1 - Interface for types
 * 2 - Added try/catch block for error handling
 * 3 - Log error on console for dev purposes
 * 4 - Verify if fetchURL exists to proceed with effect
 * 5 - Signal added for properly abort the fetch on every URL change
 * 6 - Improved response handling
 */

interface UseEffectProps {
	fetchURL: string;
	label: string;
}

// user abort
export function UseEffect({ fetchURL, label }: UseEffectProps) {
	const abortController = new AbortController();

	useEffect(() => {
		if (!fetchURL) return;

		const fetchData = async () => {
			try {
				const response = await fetch(fetchURL, {
					signal: abortController.signal,
				});
				const data = await response.json();
			} catch (error) {
				console.error(error);
				return;
			}
		};

		fetchData();

		return () => abortController.abort();
	}, [fetchURL]);

	return (
		<div>
			<button>{label}</button>
		</div>
	);
}

/**
 * ISSUES - UseEffectDerivedCalculation
 * 1 - Not defining initial values for useState hooks
 * 2 - The useEffect for calculated value, adds unnecesary re-render on each calculation
 */

// export function UseEffectDerivedCalculation() {
// 	const [remainder, setReminder] = useState();
// 	const [clickedTimes, setClickedTimes] = useState();

// 	useEffect(() => {
// 		setReminder(clickedTimes % 5);
// 	}, [clickedTimes]);

// 	const handleClick = () => setClickedTimes(clickedTimes + 1);

// 	return (
// 		<div>
// 			<button onClick={handleClick}>Add Click Count</button>
// 			<span>{sum}</span>
// 			<span>{remainder}</span>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UseEffectDerivedCalculation
 * 1 - Initial state added
 * 2 - Reminder calculated on each render, useMemo could be added but seems overkill for the situation
 * 3 - Updater function passed to setClickedTimes to always use the latest clickedTimes value
 * 4 - Removed unecesary sum <span>
 */

export function UseEffectDerivedCalculation() {
	const [clickedTimes, setClickedTimes] = useState(0);

	const handleClick = () => setClickedTimes((clickedTimes) => clickedTimes + 1);

	const reminder = clickedTimes % 5;

	return (
		<div>
			<button onClick={handleClick}>Add Click Count</button>
			<span>{reminder}</span>
		</div>
	);
}

/**
 * ISSUES - UseEffectLifeCycle
 * 1 - Not defining initial values for useState hook
 * 2 - No useState hook implemented for clickedTimes
 * 3 - Lack of proper lifecycle handling on the useEffect hook
 */

// export function UseEffectLifeCycle() {
// 	const [_loaded, setLoaded] = useState();

// 	useEffect(() => {
// 		setTimeout(() => setLoaded(true), 1000);
// 	}, []);

// 	const handleClick = () => setClickedTimes(clickedTimes + 1);

// 	return (
// 		<div>
// 			<button onClick={handleClick}>Add Click Count</button>
// 			<span>{clickedTimes}</span>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UseEffectLifeCycle
 * 1 - Initial state added
 * 2 - useState hooks added to track clickedTimes
 * 3 - Updater function passed to setClickedTimes to always use the latest clickedTimes value
 * 4 - cleanUp function added on useEffect to properly clean the timeout if the component is unmounted before the timeout executes the callback
 */

export function UseEffectLifeCycle() {
	const [_loaded, setLoaded] = useState(false);
	const [clickedTimes, setClickedTimes] = useState(0);

	const handleClick = () => setClickedTimes((clickedTimes) => clickedTimes + 1);

	useEffect(() => {
		const timeoutId = setTimeout(() => setLoaded(true), 1000);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<div>
			<button onClick={handleClick}>Add Click Count</button>
			<span>{clickedTimes}</span>
		</div>
	);
}

/**
 * ISSUES - DirtyUnmount
 * 1 - Lack of proper lifecycle handling on the useEffect hook
 */

// export function DirtyUnmount() {
// 	const [time, setTime] = useState(0);

// 	useEffect(() => {
// 		setInterval(() => {
// 			setTime((t) => t + 1);
// 		}, 1000);
// 	}, []);

// 	return <div>Clock in seconds: {time}</div>;
// }

/**
 *
 * IMPROVEMENTS - DirtyUnmount
 * 1 - cleanUp function added on useEffect to properly clean the timeout if the component is unmounted before the timeout executes the callback
 */

export function DirtyUnmount() {
	const [time, setTime] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime((t) => t + 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return <div>Clock in seconds: {time}</div>;
}

/**
 * ISSUES - AvoidingUseState
 * 1 - Not showing the updated value, useRef will be updated but the change will not trigger a re-render of the component
 */

// export function AvoidingUseState() {
// 	const ref = useRef('Unmounted');

// 	useEffect(() => {
// 		ref.current = 'Mounted';
// 	}, []);

// 	return <div>{ref.current}</div>;
// }

/**
 *
 * IMPROVEMENTS - AvoidingUseState
 * 1 - Assumed that we want to show the Mounted/Unmounted state
 * 2 - Changed useRef to useState in order to be able to show the actual change of the Mounted/Unmounted state
 */

export function AvoidingUseState() {
	const [state, setState] = useState('Unmounted');

	useEffect(() => {
		setState('Mounted');
	}, []);

	return <div>{state}</div>;
}

/**
 * ISSUES - UntraceableState
 * 1 - Not defining initial values for useState hook
 * 2 - The loading variable is not beign tracked between renders
 */

// async function API() {
// 	return true;
// }

// export function UntraceableState() {
// 	const [result, setResult] = useState();
// 	let loading = false;

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			loading = true;
// 			const result = await API();
// 			loading = false;
// 			setResult(result);
// 		};

// 		fetchData();
// 	}, []);

// 	return (
// 		<div>
// 			<span>Loading: {loading}</span>
// 			Result:{result}
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UntraceableState
 * 1 - Added initial state for both useState hooks
 * 2 - useState hook added to trace loading state changes between renders
 * 3 - <span> added to show the "Result:" for HTML consistency
 * 4 - Considered adding try/catch, overkill for this scenario due to the basic API mock, considered to be added in a real scenario
 */

async function API() {
	return true;
}

export function UntraceableState() {
	const [result, setResult] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const result = await API();
			setLoading(false);
			setResult(result);
		};

		fetchData();
	}, []);

	return (
		<div>
			<span>Loading: {loading}</span>
			<span>Result:{result}</span>
		</div>
	);
}

/**
 * ISSUES - CrudeDeclarations
 * 1 - calendarDays is beign recreated on every render
 * 2 - span used inside of an ol
 */

// export function CrudeDeclarations() {
// 	const calendarDays = [
// 		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
// 		22, 23, 24, 25, 26, 27, 28, 29, 30,
// 	];
// 	return (
// 		<ol>
// 			{calendarDays.map((val) => (
// 				<span key={val}>{val}</span>
// 			))}
// 		</ol>
// 	);
// }

/**
 *
 * IMPROVEMENTS - CrudeDeclarations
 * 1 - calendarDays moved outside component, improved optimization due to the lack of re-definition of the array on each render
 * 2 - Changed span to li to follow HTML semantics and for a better accessibility
 */

const calendarDays = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28, 29, 30,
];

export function CrudeDeclarations() {
	return (
		<ol>
			{calendarDays.map((val) => (
				<li key={val}>{val}</li>
			))}
		</ol>
	);
}

/**
 * ISSUES - MagicNumbers
 * 1 - What is 18? i can guess it is an age limit, this should be on the code identified as a properly named variable
 * 2 - age is not beign destructured from props
 * 3 - ol is not showing a list, but a text composition
 * 4 - No types support for props
 */

// export function MagicNumbers(age) {
// 	return (
// 		<ol>{age < 18 ? <div>Spicy</div> : <div>You are not old enough</div>}</ol>
// 	);
// }

/**
 *
 * IMPROVEMENTS - MagicNumbers
 * 1 - Changed 18 to ageLimit to avoid using magic numbers
 * 2 - Replaced ol with div due to the content beign a text composition and not a list to follow HTML semantics
 * 3 - age beign destructured from props
 * 4 - Types added to the props
 */

const ageLimit = 18;

export function MagicNumbers({ age }: { age: number }) {
	return (
		<div>
			{age < ageLimit ? (
				<div>old enough</div>
			) : (
				<div>You are not old enough</div>
			)}
		</div>
	);
}

/**
 * ISSUES - UnidiomaticHTMLStructure
 * 1 - Incorrect input onChange & button onClick handler
 * 2 - The HTML structure should be wrapped with a form, not a div
 * 3 - Lack of proper handlers for input & form elements
 * 4 - No types definitions
 */

// export function UnidiomaticHTMLStructure() {
// 	const [name, setName] = useState('');
// 	const handleSubmit = (e) => {};

// 	return (
// 		<div>
// 			<input value={name} name="name" type="text" onChange={setName} />
// 			<button type="submit" onClick={handleSubmit}>
// 				Submit
// 			</button>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UnidiomaticHTMLStructure
 * 1 - Replaced div with form as a HTML wrapper for proper HTML semantics
 * 2 - Removed unnecesary button onClick handler for submission
 * 3 - Added proper onChange handler to the input
 * 4 - Added proper onSubmit handler to the form
 * 5 - Types added to event handlers
 */

export function UnidiomaticHTMLStructure() {
	const [name, setName] = useState('');

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission...
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	return (
		<form onSubmit={onSubmit}>
			<input value={name} name="name" type="text" onChange={onChange} />
			<button type="submit">Submit</button>
		</form>
	);
}

/**
 * ISSUES - CrudeStateManagement
 * 1 - Lack of proper onChange handlers
 * 2 - Multiple useState that could be replaced with a single one
 * 3 - Lack of handleSubmit implementation
 * 4 - The state segmentation would require multiple onChange handlers with almost the same code
 */

// export function CrudeStateManagement() {
// 	const [name, setName] = useState('');
// 	const [age, setAge] = useState('');
// 	const [location, setLocation] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');

// 	const handleSubmit = (e) => {};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<input value={name} name="name" type="text" onChange={setName} />
// 			<input value={age} name="age" type="number" onChange={setAge} />
// 			<input
// 				value={location}
// 				name="location"
// 				type="text"
// 				onChange={setLocation}
// 			/>
// 			<input value={email} name="email" type="email" onChange={setEmail} />
// 			<input
// 				value={password}
// 				name="password"
// 				type="password"
// 				onChange={setPassword}
// 			/>
// 			<button type="submit">Submit</button>
// 		</form>
// 	);
// }

/**
 *
 * IMPROVEMENTS - CrudeStateManagement
 * 1 - Proper handleSubmit handler implemented
 * 2 - Unified useState for form state management
 * 3 - Implemented a single input onChange handler to avoid code duplication
 * 4 - Initial state provided
 */

export function CrudeStateManagement() {
	const [formData, setFormData] = useState({
		name: '',
		age: '',
		location: '',
		email: '',
		password: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission...
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={formData.name}
				name="name"
				type="text"
				onChange={handleOnChange}
			/>
			<input
				value={formData.age}
				name="age"
				type="number"
				onChange={handleOnChange}
			/>
			<input
				value={formData.location}
				name="location"
				type="text"
				onChange={handleOnChange}
			/>
			<input
				value={formData.email}
				name="email"
				type="email"
				onChange={handleOnChange}
			/>
			<input
				value={formData.password}
				name="password"
				type="password"
				onChange={handleOnChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}

/**
 * ISSUES - UnidiomaticHTMLHierarchy
 * 1 - bids & asks are beign recreated on every render
 * 2 - Incorrect HTML semantics, li shold be item not wrapper of a list
 * 3 - Both lists are coupled together, those should be independent
 */

// export function UnidiomaticHTMLHierarchy() {
// 	const bids = [1, 2, 3];
// 	const asks = [1, 2, 3];

// 	return (
// 		<li>
// 			{bids.map((bid, i) => (
// 				<span key={i}>{bid}</span>
// 			))}
// 			{asks.map((ask, j) => (
// 				<span key={j + 'asks'}>{ask}</span>
// 			))}
// 		</li>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UnidiomaticHTMLHierarchy
 * 1 - bids & asks moved outside component, improved optimization due to the lack of re-definition of the arrays on each render
 * 2 - Improved HTML semantics, div as a general wrapper, two separated ul with internal li
 * 3 - Template literals added to keys to avoid collisions with other lists
 */

const bids = [1, 2, 3];
const asks = [1, 2, 3];

export function UnidiomaticHTMLHierarchy() {
	return (
		<div>
			<ul>
				{bids.map((bid, i) => (
					<li key={`${i}-bids`}>{bid}</li>
				))}
			</ul>
			<ul>
				{asks.map((ask, j) => (
					<li key={`${j}-asks`}>{ask}</li>
				))}
			</ul>
		</div>
	);
}

/**
 * ISSUES - SubstandardDataStructure
 * 1 - Calling setState on each button could be stadarized for throwing/cleaning errors
 */

// export function SubstandardDataStructure() {
// 	const [error, setError] = useState('');

// 	return (
// 		<div>
// 			<button onClick={() => setError('Error A')}>Throw Error A</button>
// 			<button onClick={() => setError('Error B')}>Throw Error B</button>
// 			<button onClick={() => setError('')}>Clear Errors</button>
// 			<div>{error}</div>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - SubstandardDataStructure
 * 1 - Implemented throError/cleanError functions, standardizing processes adds modularity
 */

export function SubstandardDataStructure() {
	const [error, setError] = useState('');

	const throwError = (error: string) => setError(error);

	const clearError = () => setError('');

	return (
		<div>
			<button onClick={() => throwError('Error A')}>Throw Error A</button>
			<button onClick={() => throwError('Error B')}>Throw Error B</button>
			<button onClick={clearError}>Clear Errors</button>
			<div>{error}</div>
		</div>
	);
}

/**
 * ISSUES - DangerousIdentifier
 * 1 - Incorrect HTML semantics
 * 2 - Dangerous key, could be repeated easily
 * 3 - FormData shouldn't be used to create a person
 * 4 - Lack of proper state management for the input
 */

// export function DangerousIdentifier() {
// 	const [people, setPeople] = useState([]);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const person = new FormData(e.target);
// 		setPeople((ppl) => [...ppl, ...person]);
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<input type="text" />
// 				<button>Add Person</button>
// 			</form>
// 			<ul>
// 				{people.map((person) => (
// 					<span key={person.name}>{person.name}</span>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - DangerousIdentifier
 * 1 - Improved HTML semantics, li as ul child
 * 2 - Template literal used for list item key
 * 3 - Implemented useState for form input state management
 * 4 - Propper handleOnSubmit & onChange event handlers added
 * 5 - Explicit form data, easier to understand and maintain
 */

interface Person {
	name: string;
}

export function DangerousIdentifier() {
	const [people, setPeople] = useState<Person[]>([]);
	const [name, setName] = useState('');

	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const person: Person = {
			name,
		};

		setPeople((ppl) => [...ppl, person]);
		clearName();
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const clearName = () => setName('');

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<input type="text" value={name} onChange={handleOnChange} />
				<button>Add Person</button>
			</form>
			<ul>
				{people.map((person, i) => (
					<li key={`${person.name}-${i}`}>{person.name}</li>
				))}
			</ul>
		</div>
	);
}

/**
 * ISSUES - UnnecessaryEffectTriggering
 * 1 - The useEffect with the dependency [leader] will cause an infinite loop because it references an object, the comparison will always cause a new rendering
 */

// Hint: this only requires a single line change!
// export function UnnecessaryEffectTriggering() {
// 	const [leader, setLeader] = useState({});

// 	useEffect(() => {
// 		const interval = setInterval(async () => {
// 			const leader = await fetchLeader();
// 			setLeader(leader);
// 		}, 1000);
// 		return () => clearInterval(interval);
// 	}, []);

// 	useEffect(() => {
// 		async function enhanceRecord() {
// 			const enriched = await fetchDetails(leader);
// 			setLeader(enriched);
// 		}
// 		enhanceRecord();
// 	}, [leader]);

// 	return (
// 		<div>
// 			<div>Leader:{leader.name}</div>
// 			{leader.country && <div>{`From: ${leader.country}`}</div>}
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UnnecessaryEffectTriggering
 * 1 - By changing [leader] to [leader.name] on the second useEffect the infine loop is fixed
 */

async function fetchLeader() {
	return { name: 'Messi' };
}
async function fetchDetails(leader) {
	return { ...leader, country: 'Argentina' };
}

// Hint: this only requires a single line change!
export function UnnecessaryEffectTriggering() {
	const [leader, setLeader] = useState({});

	useEffect(() => {
		const interval = setInterval(async () => {
			const leader = await fetchLeader();
			setLeader(leader);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function enhanceRecord() {
			const enriched = await fetchDetails(leader);
			setLeader(enriched);
		}
		enhanceRecord();
	}, [leader.name]);

	return (
		<div>
			<div>Leader:{leader.name}</div>
			{leader.country && <div>{`From: ${leader.country}`}</div>}
		</div>
	);
}

/**
 * ISSUES - IncorrectDependencies
 * 1 - The useEffect with the dependency [records] will cause an infinite loop because it references an array, the comparison will always cause a new rendering
 */

// Hint: same error pattern as above
// export function IncorrectDependencies(records) {
// 	const handleClick = useCallback(() => {
// 		trackClick(records);
// 	}, [records]);

// 	return (
// 		<div>
// 			{records.map((record) => (
// 				<div id={record.id}>{record.name}</div>
// 			))}
// 			<button onClick={handleClick}>Click me!</button>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - IncorrectDependencies
 * 1 - By changing [leader] to [leader.name] on the second useEffect the infine loop is fixed
 * 2 - Depending on the content of the array:
 *      - JSON.stringify(records): may cause issues with certain data types
 *      - [...records]: may cause performance issues if the array is big enough
 *      - [records.length]: Will work if elements in array cannot be edited
 */

async function trackClick(ids) {
	return ids;
}

// Hint: same error pattern as above
export function IncorrectDependencies({ records }) {
	const handleClick = useCallback(() => {
		trackClick(records);
	}, [JSON.stringify(records)]);

	return (
		<div>
			{records.map((record) => (
				<div id={record.id}>{record.name}</div>
			))}
			<button onClick={handleClick}>Click me!</button>
		</div>
	);
}

/**
 * ISSUES - UnnecessaryFunctionRedefinitions
 * 1 - The validateEmail funcion gets redefined on every render, this unnecesary since is not tied to any value inside the component
 */

// export function UnnecessaryFunctionRedefinitions(emails) {
// 	const validateEmail = (email) => email.includes('@');

// 	return (
// 		<div>
// 			{emails.map((email) => (
// 				<div key={email}>
// 					{email} is {validateEmail(email) ? 'Valid' : 'Invalid'}
// 				</div>
// 			))}
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - UnnecessaryFunctionRedefinitions
 * 1 - Moved validateEmail funcion outisde the component to improve code optimization
 */

const validateEmail = (email: string) => email.includes('@');

export function UnnecessaryFunctionRedefinitions(emails: string[]) {
	return (
		<div>
			{emails.map((email) => (
				<div key={email}>
					{email} is {validateEmail(email) ? 'Valid' : 'Invalid'}
				</div>
			))}
		</div>
	);
}

/**
 * ISSUES - SerialLoading
 * 1 - Incorrect HTML semantics, lists shold be separated and implemented with the combo <ul> & <li>
 * 2 - The loading is sequentially, it means that fetchAlternateRecords will only trigger after fetchRecords generating a delay on the application
 */

// async function fetchRecords() {
// 	return [{ id: 1, type: 'record' }];
// }
// async function fetchAlternateRecords() {
// 	return [{ id: 1, type: 'alt-record' }];
// }

// export function SerialLoading() {
// 	const [records, setRecords] = useState([]);
// 	const [altRecords, setAltRecords] = useState([]);

// 	useEffect(() => {
// 		async function loadRecords() {
// 			const recs = await fetchRecords();
// 			const altRecs = await fetchAlternateRecords();
// 			setRecords(recs);
// 			setAltRecords(altRecs);
// 		}
// 		loadRecords();
// 	}, []);

// 	return (
// 		<div>
// 			{records.map((rec) => (
// 				<div key={rec.id}></div>
// 			))}
// 			{altRecords.map((rec) => (
// 				<div key={rec.id}></div>
// 			))}
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - SerialLoading
 * 1 - Improved HTML semantics, ul and li added
 * 2 - Parallel fetching added with fetchRecords & fetchAlternateRecords
 * 3 - Modified keys to ensure no collisions
 * 4 - Types added
 */

interface Record {
	id: number;
	type: string;
}

async function fetchRecords(): Promise<Record[]> {
	return [{ id: 1, type: 'record' }];
}
async function fetchAlternateRecords(): Promise<Record[]> {
	return [{ id: 1, type: 'alt-record' }];
}

export function SerialLoading() {
	const [records, setRecords] = useState<Record[]>([]);
	const [altRecords, setAltRecords] = useState<Record[]>([]);

	useEffect(() => {
		async function loadRecords() {
			const [recs, altRecs] = await Promise.all([
				fetchRecords(),
				fetchAlternateRecords(),
			]);

			setRecords(recs);
			setAltRecords(altRecs);
		}

		loadRecords();
	}, []);

	return (
		<div>
			<ul>
				{records.map((rec) => (
					<li key={`rec-${rec.id}`}></li>
				))}
			</ul>
			<ul>
				{altRecords.map((rec) => (
					<li key={`alt-rec-${rec.id}`}></li>
				))}
			</ul>
		</div>
	);
}

/**
 * ISSUES - UnoptimizableRenderingStructure
 * 1 - The useState update triggers a re-render of all the components
 */

// async function fetchRecords() {
// 	return [{ id: 1, type: 'record' }];
// }
// async function fetchAlternateRecords() {
// 	return [{ id: 1, type: 'alt-record' }];
// }

// // Hint: part of the rendering structure is re-rendered frequently unnecessarily
// export function UnoptimizableRenderingStructure({ altRecords }) {
// 	const [records, setRecords] = useState([]);

// 	useEffect(() => {
// 		async function loadRecords() {
// 			const interval = setInterval(async () => {
// 				const recs = await fetchRecords();
// 				setRecords(recs);
// 			}, 5000);

// 			return () => clearInterval(interval);
// 		}
// 		loadRecords();
// 	}, []);

// 	return (
// 		<div>
// 			<ul>
// 				{records.map((rec) => (
// 					<li key={rec.id}>{rec.id}</li>
// 				))}
// 			</ul>
// 			<ul>
// 				{altRecords.map((rec) => (
// 					<li key={rec.id}>{rec.id}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

/**
 *
 * IMPROVEMENTS - SerialLoading
 * 1 - State colocation, moved state to a child component RecordsList (with the related HTML) in order to avoid re-rendering the entire component
 * 2 - Used Record & fetchRecords from SerialLoading
 */

const RecordsList = () => {
	const [records, setRecords] = useState<Record[]>([]);

	useEffect(() => {
		async function loadRecords() {
			const interval = setInterval(async () => {
				const recs = await fetchRecords();
				setRecords(recs);
			}, 5000);

			return () => clearInterval(interval);
		}
		loadRecords();
	}, []);

	return (
		<ul>
			{records.map((rec) => (
				<li key={`rec-${rec.id}`}>{rec.id}</li>
			))}
		</ul>
	);
};

// Hint: part of the rendering structure is re-rendered frequently unnecessarily
export function UnoptimizableRenderingStructure({
	altRecords,
}: {
	altRecords: Record[];
}) {
	return (
		<div>
			<RecordsList />
			<ul>
				{altRecords.map((rec) => (
					<li key={`alt-rec-${rec.id}`}>{rec.id}</li>
				))}
			</ul>
		</div>
	);
}
