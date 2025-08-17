import React from 'react';
import Select from '../../../components/ui/Select';

const SemesterSelector = ({ selectedSemester, onSemesterChange, className = "" }) => {
  const semesterOptions = [
    { value: 'all', label: 'All Semesters' },
    { value: '1', label: '1st Semester' },
    { value: '2', label: '2nd Semester' },
    { value: '3', label: '3rd Semester' },
    { value: '4', label: '4th Semester' },
    { value: '5', label: '5th Semester' },
    { value: '6', label: '6th Semester' },
    { value: '7', label: '7th Semester' },
    { value: '8', label: '8th Semester' }
  ];

  return (
    <div className={`w-full md:w-64 ${className}`}>
      <Select
        label="Filter by Semester"
        options={semesterOptions}
        value={selectedSemester}
        onChange={onSemesterChange}
        placeholder="Select semester..."
        className="w-full"
      />
    </div>
  );
};

export default SemesterSelector;