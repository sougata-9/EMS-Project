import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/LeaveHelper'
import axios from 'axios'
import { LeaveButtons } from '../../utils/LeaveHelper'// added v12

const Table = () => {

    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState(null)
    const fetchLeaves = async () => {
        try {
        const responnse = await axios.get('http://localhost:5000/api/leave', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(responnse.data)
        if (responnse.data.success) {
          let sno = 1;
          const data = await responnse.data.leaves.map((leave) => (
            {
              _id: leave._id,
              sno: sno++,
              employeeId: leave.employeeId.employeeId,
              name: leave.employeeId.userId.name,
              leaveType: leave.leaveType,
              department: leave.employeeId.department.dep_name,
              days :
              new Date(leave.endDate).getDate() -
              new Date(leave.startDate).getDate(),
              status: leave.status,
              action: <LeaveButtons Id={leave._id}/>,
            }
          ))
          setLeaves(data);
          setFilteredLeaves(data)
        }
      } catch(error) {
         if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, []);

    const filterByInput = (e) => {
      const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredLeaves(data)
    };
    const filterByButton = (status) => {
      const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
      setFilteredLeaves(data)
    };


  return (
    <>
    {filteredLeaves ? (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
            <input 
            type="text"
            placeholder='Search By Emp Id'
            className='px-4 py-0.5 border
            rounded
          hover:border-gray-400 
            transition duration-300 ease-in-out'
            onChange={filterByInput}
            />
            <div className='space-x-3'>
            <button className="px-2 py-1 bg-yellow-500 text-white 
            hover:bg-yellow-600
            rounded-md
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => filterByButton("Pending")}
            >Pending</button>
            <button className="px-2 py-1 bg-green-600 text-white 
            hover:bg-green-700
            rounded-md
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => filterByButton("Approved")}
            >Approved</button>
            <button className="px-2 py-1 bg-red-600 text-white 
            hover:bg-red-700
            rounded-md
            transition duration-300 ease-in-out 
             hover:scale-105"
            onClick={() => filterByButton("Rejected")}
            >Rejected</button>
            </div>
        </div>

        <div className='mt-3'>
        <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
    </div>
    ) :   <div>Loading....</div>}
    </>
  )
}

export default Table
