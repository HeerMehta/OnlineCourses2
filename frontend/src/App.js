// import logo from './logo.svg';
import './App.css';
import header1 from './images/header1.png'
import header2 from './images/header2.png'
import header3 from './images/header3.png'
import { useState, useEffect } from 'react'
import CourseList from './Components/CourseList';



function App() {

  //Fetch data of all orgs
  useEffect(() => {
    fetch(`http://localhost:8000/api/orgs/`)
     .then((response) => response.json())
     .then((actualData) => {
      console.log(actualData)
       setorgs(actualData)
     })
     .catch(err => console.log(err));
   }, []);

   //Fetch data of all courses
  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/`)
     .then((response) => response.json())
     .then((actualData) => {
      console.log(actualData)
       setcourses(actualData)
       setFilteredCourses(actualData)
     })
     .catch(err => console.log(err));
   }, []);
  
   //Set state of courses
  const [courses, setcourses] = useState([])

  // const coursels = [
  //   {
  //     course_name: "ABC",
  //     price: 1000,
  //     duration: 12,
  //     organization: {
  //       org_name: "org1",
  //       contact: 224243442,
  //       email: "rwrwr@mail.com"
  //     },
  //     description: "Online Courses from the Best Professionals, Share your Projects and find a job. Boost your skills and learn with tips and techniques from top experts."
  //   },
  //   {
  //     course_name: "GHI",
  //     price: 1200,
  //     duration: 12,
  //     organization: {
  //       org_name: "org1",
  //       contact: 224243442,
  //       email: "rwrwr@mail.com"
  //     },
  //     description: "Online Courses from the Best Professionals, Share your Projects and find a job. Boost your skills and learn with tips and techniques from top experts."
  //   },
  //   {
  //     course_name: "DEF",
  //     price: 1300,
  //     duration: 12,
  //     organization: {
  //       org_name: "org1",
  //       contact: 224243442,
  //       email: "rwrwr@mail.com"
  //     },
  //     description: "Online Courses from the Best Professionals, Share your Projects and find a job. Boost your skills and learn with tips and techniques from top experts."
  //   },
  //   {
  //     course_name: "XYZ",
  //     price: 1030,
  //     duration: 12,
  //     organization: {
  //       org_name: "org1",
  //       contact: 224243442,
  //       email: "rwrwr@mail.com"
  //     },
  //     description: "Online Courses from the Best Professionals, Share your Projects and find a job. Boost your skills and learn with tips and techniques from top experts."
  //   }

  // ]

  //orgs
  const [orgs, setorgs] = useState([])
  //filter state for showing and removing filters
  const [showfilters, setshowfilters] = useState(true)
  //orgfilter for storing filtered orgs
  const [orgFilter, setorgFilter] = useState([])
  //price filter for storing desired price ranges
  const [priceFilter, setPriceFilter] = useState([])
  //filtered course list to store final list after filtering data
  const [filteredCourses, setFilteredCourses] = useState(courses)
  //transition for running heavy functions
  // const [isPending, startTransition] = useTransition()


  const orgChecks = orgs.map(org => <div className="form-check fs-5">
  <input className="form-check-input" type="checkbox" value={org.id} id="flexCheckDefault" onClick={e => handleOrgFilter(e)} />
  <label className="form-check-label" htmlFor="flexCheckDefault">
    {org.org_name}
  </label>
</div>)


const handleOrgFilter = (e) => {

  if(e.target.checked){
    orgFilter.push(e.target.value);
    console.log(orgFilter);

    filterCourses();
  }
  else{
    const newOrgFilter = [...orgFilter]
    const index = newOrgFilter.indexOf(e.target.value)
    newOrgFilter.splice(index, 1)
    setorgFilter(newOrgFilter)

    let newCourses = filteredCourses.filter(course => course.organization != e.target.value)

    setFilteredCourses(newCourses)

    console.log(orgFilter);
  }

  
}


const filterCourses = ()=>{
  console.log("The length of filter is")
  console.log(orgFilter)
  if(orgFilter.length === 0 && priceFilter.length === 0){
    setFilteredCourses(courses)
  }
  else{
    let tempCourseList1 = []
      for(let i=0; i<orgFilter.length; i++){
        let newCourses = []
        let id = orgFilter[i]
        newCourses = courses.filter(course => course.organization == id);
        tempCourseList1 = tempCourseList1.concat(newCourses);
      }
      
      console.log(filteredCourses);
      // setFilteredCourses(tempCourseList1);

      let tempCourseList2 = []
      for(let i=0; i<priceFilter.length; i++){
        let newCourses = []
        let p = priceFilter[i]
        newCourses = filteredCourses.filter(course => course.price <= p);
        tempCourseList2 = tempCourseList2.concat(newCourses);
        console.log(tempCourseList2);
      }

      if(tempCourseList2.length > 0 && tempCourseList1.length >0){
        tempCourseList1 = tempCourseList1.filter(course => tempCourseList2.includes(course));
      }
      else if(tempCourseList1.length == 0){
        tempCourseList1 = tempCourseList2;
      }

      // tempCourseList1 = tempCourseList1.filter(course => tempCourseList2.includes(course));

      setFilteredCourses(tempCourseList1);
  }

}

const handlePriceFilter = (e) => {

  if(e.target.checked){
    priceFilter.push(e.target.value);
    console.log(priceFilter);

    filterCourses();
  }
  else{
    const newPriceFilter = [...priceFilter]
    const index = newPriceFilter.indexOf(e.target.value)
    newPriceFilter.splice(index, 1)
    setPriceFilter(newPriceFilter)

    let newCourses = filteredCourses.filter(course => course.price > e.target.value)

    setFilteredCourses(newCourses)

    console.log(orgFilter);
  }

  
}



  const handleShowFilter = () => {
    if (showfilters == true) {
      setshowfilters(false)
    }
    else {
      setshowfilters(true)
    }
  }


  const refreshPage = (e) => {
    window.location.reload();
  }

  let cl
  if (showfilters) {
    cl = <>
      <div className="col-md-3 p-3 border-end">
        <div className="my-3">
        <h6 className="text-dark fs-4">Organizations</h6>
        {orgChecks}
        </div>
        <div className="my-3">
        <h6 className="text-dark fs-4">Prices</h6>
        <div className="form-check fs-5">
          <input className="form-check-input" type="checkbox" value="0" id="flexCheckDefault" onClick={e => handlePriceFilter(e)}/>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Free
          </label>
        </div>
        <div className="form-check fs-5">
          <input className="form-check-input" type="checkbox" value="1000" id="flexCheckDefault" onClick={e => handlePriceFilter(e)}/>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Upto 1000
          </label>
        </div>
        <div className="form-check fs-5">
          <input className="form-check-input" type="checkbox" value="5000" id="flexCheckDefault" onClick={e => handlePriceFilter(e)}/>
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Upto 5000
          </label>
        </div>
        <div className="form-check fs-5 my-5">
        <button type="button" className="btn btn-primary" onClick={e => refreshPage(e)}>Reset</button>
        </div>
        </div>
      </div>
      <div className="col-md-9 row p-3">
        <CourseList courses={filteredCourses} orgs={orgs}/>
      </div>
    </>
  }
  else {
    cl = <div className="col-md-12 row p-3">
      <CourseList courses={filteredCourses} orgs={orgs}/>
    </div>
  }

  return (
    <div className="App">
      <nav className="navbar bg-info">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
            <span className="text-white">
              Online Course List
            </span>
          </a>
        </div>
      </nav>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "250px" }}>
            <img src={header1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" style={{ height: "250px" }}>
            <img src={header2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" style={{ height: "250px" }}>
            <img src={header3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container-fluid row">
        <div className="container col-md-12">
          <h1>Find Courses offered by all organizations over here!!!</h1>
          <hr />
        </div>
        <div className="container col-md-12">
          <button type="button" className="btn btn-outline-primary" id="filter" onClick={handleShowFilter}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill"
              viewBox="0 0 16 16">
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
            </svg>
            Filter
          </button>
        </div>

        {cl}

      </div>
    </div>
  );
}

export default App;
