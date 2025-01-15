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

export default Course;
