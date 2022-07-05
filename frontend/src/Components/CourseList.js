import React from 'react'
import SingleCourse from './SingleCourse'
// import { useTransition } from 'react'

const CourseList = props => {


    function filterById(obj, id){
            return obj.filter((obj) => obj.id === id)
    }

    const courses = props.courses.map((course) => <SingleCourse key={course.name} course={course} org={filterById(props.orgs, course.organization)}/>)

    return(
        <div className="col-md-12">
            {courses}
        </div>
    )
}

export default CourseList