import Part from "./Part"

const Course = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}

            <b>total of {course.parts.reduce((s, p) => s + parseInt(p.exercises), 0)} exercises</b>
        </>)
}

export default Course;