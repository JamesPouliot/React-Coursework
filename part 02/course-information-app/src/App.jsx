// const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Course = ({ course }) => {
	return (course.parts.map((part) => <Part part={part} />);
<Total sum={sum} />

);
};

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
			{
				name: "Redux",
				exercises: 11,
				id: 4,
			},
		],
	};

	return (
		<>
			<h1>Half Stack Application Development</h1>
			<Course course={course} />
		</>
	);
};

export default App;
