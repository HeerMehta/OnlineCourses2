import React from 'react'

const SingleCourse = props => {

  console.log(props.org[0])
  console.log(props.course)
    return(
        <a className="card text-decoration-none shadow border-0 my-2" href={props.course.link}>
          <div className="card-body">
            <h5 className="card-title text-dark">{props.course.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Offered By {props.org[0].name}</h6>
            <p className="card-text text-secondary">{props.course.description}</p>
            <p className="card-text">Duration - {props.course.duration} Months</p>
            <h6 className="card-text text-muted">Rs. {props.course.price}</h6>
          </div>
        </a>
    )
}

export default SingleCourse