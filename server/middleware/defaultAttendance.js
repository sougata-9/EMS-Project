import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const existingAttendance = await Attendance.findOne({ date });

        if (!existingAttendance) {
            const employees = await Employee.find({});
            const attendance = employees.map(emp => ({
                date,
                employeeId: emp._id,
                status: null 
            }));

            await Attendance.insertMany(attendance);
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

};

export default defaultAttendance;



