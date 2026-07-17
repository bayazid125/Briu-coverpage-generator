export interface CoverPageData {
  assignmentType: string;
  courseCode: string;
  courseTitle: string;
  assignmentTitle: string;
  
  submittedByLabel: string;
  studentName: string;
  batch: string;
  studentId: string;
  studentDepartment: string;
  
  submittedToLabel: string;
  teacherName: string;
  teacherDesignation: string;
  teacherDepartment: string;
  teacherUniversity: string;
  
  submissionDate: string;
  
  // Optional / Dynamic fields if the user wants to add more
  program: string;
  section: string;
  semester: string;
  session: string;
  phone: string;
  email: string;
  groupMembers: string;
  projectTitle: string;
  labNumber: string;
  supervisor: string;
  remarks: string;
}

export type Theme = 'dark' | 'light';
