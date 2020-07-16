import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
	return time.toString().padStart(2, '0');
}

function App() {
	const [title, setTitle] = useState('At your mark!')
	const [timeLeft, setTimeLeft] = useState(2);
	const [isRunning, setIsRunning] = useState(false);


	const minutes = padTime(Math.floor(timeLeft / 60));
	const seconds = padTime(timeLeft - minutes * 60);

	const intervalRef = useRef(null);

	function startTimer() {
		setTitle(`Gooooooo…`);
		setIsRunning(true);
		intervalRef.current = setInterval( () => {
			 setTimeLeft((timeLeft) => {
			 		if (timeLeft >= 1) return timeLeft - 1
				 	resetTimer();
				  return 0;
			});
		}, 1000);
	}

	function stopTimer() {

		clearInterval(intervalRef.current);
		intervalRef.current = null;

		setTitle('Keep it up!');
		setIsRunning(false);
	}

	function resetTimer() {
		stopTimer();
		intervalRef.current = null;
		setTitle('Ready to go another round?');
		setTimeLeft(25 * 60);
		setIsRunning(false);
	}

	return (
		<div className="app">
			<h2>{title}</h2>

			<div className="timer">
				<span>{minutes}</span><span>:</span><span>{seconds}</span>
			</div>

			<div className="buttons">
				{!isRunning && <button onClick={startTimer}>Start</button>}
				{isRunning && <button onClick={stopTimer}>Stop</button>}
				<button onClick={resetTimer}>Reset</button>
			</div>
		</div>
	);
}

export default App;
