// const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ totalExercises }) => (
	<p>
		<strong>Number of exercises: {totalExercises}</strong>
	</p>
);

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Course = ({ course }) => {
	console.log("rendering Course for: ", course);
	const totalExercises = course.parts.reduce(
		(sum, part) => sum + part.exercises,
		0
	);
	console.log("total exercises: ", totalExercises);

	return (
		<>
			<h2>{course.name}</h2>
			{course.parts.map((part) => (
				<Part part={part} />
			))}
			<Total totalExercises={totalExercises} />
		</>
	);
};

const App = () => {
	const courses = [
		{
			name: "Half Stack application development",
			id: 1,
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
		},
		{
			name: "Node.js",
			id: 2,
			parts: [
				{
					name: "Routing",
					exercises: 3,
					id: 1,
				},
				{
					name: "Middlewares",
					exercises: 7,
					id: 2,
				},
			],
		},
	];
	return (
		<>
			<h1>Web Development Curriculum</h1>
			{courses.map((course) => (
				<Course course={course} />
			))}
		</>
	);
};

export default App;
