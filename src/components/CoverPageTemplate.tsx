import React, { forwardRef } from 'react';
import { CoverPageData } from '../types';

interface Props {
  data: CoverPageData;
}

export const CoverPageTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-[#ffffff] mx-auto overflow-hidden font-serif text-[#000000]"
        style={{
          width: '794px',
          height: '1123px',
          boxSizing: 'border-box',
          padding: '32px', // Outer whitespace
          position: 'relative'
        }}
      >
        {/* Border Container */}
        <div className="w-full h-full border-[4px] border-[#000000] p-[4px]">
          <div className="w-full h-full border-[1.5px] border-[#000000] p-[2px]">
            <div className="w-full h-full border-[1.5px] border-[#000000] flex flex-col pt-[72px] px-[64px] pb-[64px]">
              
              {/* Header Section */}
              <div className="flex flex-col items-center">
                <img 
                  src="https://i.postimg.cc/1XV2FJ1w/image.png" 
                  alt="Brahmaputra International University Logo" 
                  className="w-[140px] h-auto mb-8 object-contain"
                  crossOrigin="anonymous"
                />
                
                <h1 className="text-[32px] leading-tight font-bold text-[#1b3a6e] mb-[40px] text-center w-full whitespace-nowrap">
                  Brahmaputra International University
                </h1>
                
                <h2 className="text-[28px] font-bold text-[#1560a8] mb-6">
                  {data.assignmentType}
                </h2>
                
                <div className="text-[20px] font-bold text-[#1b3a6e] flex flex-col items-center gap-4 mb-8">
                  <p>Course Code: {data.courseCode}</p>
                  <p>Course Title: {data.courseTitle}</p>
                </div>
                
                <p className="text-[22px] font-bold text-[#1b3a6e] mt-4 mb-20 text-center px-4">
                  Title: {data.assignmentTitle}
                </p>
              </div>

              {/* Flex Spacer to push submission info to bottom center-ish */}
              <div className="flex-grow"></div>

              {/* Submission Info Section */}
              <div className="flex justify-between w-full text-[#000000] text-[18px] leading-[1.6] mb-24 px-4">
                {/* Submitted By */}
                <div className="flex flex-col w-[45%]">
                  <span className="font-bold mb-4">{data.submittedByLabel}</span>
                  <div className="pl-6 flex flex-col font-bold gap-1">
                    <span className="text-[19px]">{data.studentName}</span>
                    <span>Batch: {data.batch}</span>
                    <span>ID: {data.studentId}</span>
                    <span>{data.studentDepartment}</span>
                  </div>
                </div>

                {/* Submitted To */}
                <div className="flex flex-col w-[45%]">
                  <span className="font-bold mb-4">{data.submittedToLabel}</span>
                  <div className="pl-6 flex flex-col font-bold gap-1">
                    <span className="text-[19px]">{data.teacherName}</span>
                    <span>{data.teacherDesignation}</span>
                    <span>{data.teacherDepartment}</span>
                    <span>{data.teacherUniversity}</span>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex justify-center text-[#000000] font-bold text-[20px] mt-auto">
                <p>Submission Date: {data.submissionDate}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
);

CoverPageTemplate.displayName = 'CoverPageTemplate';
