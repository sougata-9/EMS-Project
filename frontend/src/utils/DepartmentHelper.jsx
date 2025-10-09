import { useNavigate } from "react-router-dom"

import axios from "axios"
import { FaPenAlt, FaPencilAlt, FaTrash } from "react-icons/fa";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]


export const DepartmentButtons = ({Id, onDepertmentDelete}) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?")
    if(confirm) {
         try {
            
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        // console.log(response.data)
        if (response.data.success) {
          onDepertmentDelete()
        }
      } catch(error) {
         if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      }
    }
    };



    //id change to Id
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-3 bg-green-600 
            text-white rounded-md
            hover:bg-green-700
            transition duration-300 ease-in-out 
             hover:scale-105" 
            onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>
                <FaPencilAlt/>
                {/* <span>Edit</span> */}
                </button>  
            <button className="px-3 py-3 bg-red-500 
            text-white rounded-md
            hover:bg-red-600
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => handleDelete(Id)}>
                <FaTrash/>
                {/* <span>Delete</span> */}
                </button>
        </div>
    )
} 