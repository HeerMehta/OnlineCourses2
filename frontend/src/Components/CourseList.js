import React from 'react'
import SingleCourse from './SingleCourse'
// import { useTransition } from 'react'

const CourseList = props => {


    function filterById(obj, id){
            return obj.filter((obj) => obj._id === id)
    }

    const courses = props.courses.map((course) => <SingleCourse key={course._id} course={course} org={filterById(props.orgs, course.org_id)}/>)

    return(
        <div className="col-md-12">
            {courses}
        </div>
    )
}

export default CourseList