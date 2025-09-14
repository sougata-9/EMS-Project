import { useNavigate } from "react-router-dom"

import axios from "axios"

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
            <button className="px-3 py-1 bg-teal-600 text-white" onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>Edit</button>  
            <button className="px-3 py-1 bg-red-600 text-white"
            onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    )
} 