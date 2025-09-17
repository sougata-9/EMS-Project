import axios from 'axios'
import { set } from 'mongoose'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


const AttendanceReport = () => {
  const [report, setReport]  = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false) 

  const fetchReport = async () => {
    try {
      setLoading(true)
      const query = URLSearchParams({limit, skip});
      if(dateFilter) {
        query.append('date', dateFilter)
      }
      const responnse = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        // console.log(responnse.data)
        if (responnse.data.success) {
          if(skip == 0) {
            setReport(responnse.data.groupData)
          } else {
            setReport(prevData => ({...prevData, ...responnse.data.groupData}))
          // setReport(data)  
          // setFilterAttendance(data)
          }
        }
        setLoading(false)
    } catch(error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [skip, dateFilter]);

  const handleLodemore = () => {
    setSkip(prevSkip => prevSkip + limit);
  }
  return (
    <div className='min-h-screen p-10 bg-white'>
      <h2 className='text-center text-2xl font-bold'>Attendance Report</h2>
      <div>
        <h2 className='text-xl font-semibold'>Filter By Date</h2>
        <input type="date"
        className='border bg-gray-100'
        onChange={(e) => {
          setDateFilter(e.target.value);
          setSkip(0)
        }}/>
      </div>
      {loading ? <div> Loading ...</div> : Object.entries(report).map(([date, record]) => (
        <div className='mt-4 border-b' key={date}>
          <h2 className='text-xl font-semibold'>{date}</h2>
           <table className='' border="1" cellPadding= "10">
        <thead>
          <tr>
            <th>S No</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          
            {record.map((data, i) => (
              <tr key={data.employeeId}>
                <td>{i + 1}</td>
                <td>{data.employeeId}</td>
                <td>{data.employeeName}</td>
                <td>{data.departmentName}</td>
                <td>{data.status}</td>
              </tr>
          )) }
        </tbody>
      </table>
        </div>
      )
      
    )}
    <button className='px-4 py-2 border bg-gray-100 text-lg font-semibold' onClick={handleLodemore}>Load More</button>
    </div>
  )
}

export default AttendanceReport

