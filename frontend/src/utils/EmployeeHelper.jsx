import axios from "axios";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "150px"
        // sortable: true
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px",
        center: true
        // sortable: true
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px",
        center: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    },
]


export const fetchDepartments = async () => {
    let departments
      
      try {
        const responnse = await axios.get('http://localhost:5000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (responnse.data.success) {
            departments = responnse.data.departments
          
        }
      } catch(error) {
         if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      } 
      return departments
     };

    //  employees for salary form

    export const getEmployees = async (id) => {
    let employees;
      
      try {
        const responnse = await axios.get(
            `http://localhost:5000/api/employee/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(responnse)
        if (responnse.data.success) {
            employees = responnse.data.employees
          
        }
      } catch(error) {
         if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      } 
      return employees
     };



     export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();
    



    //id change to Id
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-3 bg-teal-600
             hover:bg-teal-700
             text-white rounded-md
             transition duration-300 ease-in-out 
             hover:scale-105" onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
              <FaEye/>
              {/* <span>View</span> */}
              </button> 
            <button className="px-3 py-3 bg-blue-600 
            hover:bg-blue-800 
            text-white rounded-md
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
               <FaPencilAlt/>
              {/* <span>Edit</span> */}
              </button>
            <button className="px-3 py-3 bg-yellow-600 
             hover:bg-yellow-700 
             text-white rounded-md 
             transition duration-300 ease-in-out 
             hover:scale-105"

             
            onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >Salary</button>
            <button className="px-3 py-3 bg-red-600 
            hover:bg-red-700 
            text-white rounded-md
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >Leave</button>
        </div>
    )
} 