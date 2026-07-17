import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Input } from './ui/Input';
import { CoverPageData } from '../types';

export const InputForm = () => {
  const { data, updateField } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.name as keyof CoverPageData, e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-white/20 dark:border-white/10 pb-2">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Assignment Type" name="assignmentType" value={data.assignmentType} onChange={handleChange} placeholder="e.g. Term Project" />
          <Input label="Course Code" name="courseCode" value={data.courseCode} onChange={handleChange} placeholder="e.g. CSE-301" />
          <Input label="Course Title" name="courseTitle" value={data.courseTitle} onChange={handleChange} className="md:col-span-2" placeholder="e.g. Data Communication & Networking" />
          <Input label="Assignment Title" name="assignmentTitle" value={data.assignmentTitle} onChange={handleChange} className="md:col-span-2" placeholder="e.g. Design and Analysis of Modern Distributed Networks" />
          <Input label="Submission Date" name="submissionDate" value={data.submissionDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-white/20 dark:border-white/10 pb-2">Submitted By</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Heading Label" name="submittedByLabel" value={data.submittedByLabel} onChange={handleChange} />
          <Input label="Student Name" name="studentName" value={data.studentName} onChange={handleChange} />
          <Input label="Batch" name="batch" value={data.batch} onChange={handleChange} />
          <Input label="Student ID" name="studentId" value={data.studentId} onChange={handleChange} />
          <Input label="Department" name="studentDepartment" value={data.studentDepartment} onChange={handleChange} className="md:col-span-2" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-white/20 dark:border-white/10 pb-2">Submitted To</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Heading Label" name="submittedToLabel" value={data.submittedToLabel} onChange={handleChange} />
          <Input label="Teacher Name" name="teacherName" value={data.teacherName} onChange={handleChange} />
          <Input label="Designation" name="teacherDesignation" value={data.teacherDesignation} onChange={handleChange} />
          <Input label="Department" name="teacherDepartment" value={data.teacherDepartment} onChange={handleChange} />
          <Input label="University" name="teacherUniversity" value={data.teacherUniversity} onChange={handleChange} className="md:col-span-2" />
        </div>
      </div>
    </div>
  );
};
