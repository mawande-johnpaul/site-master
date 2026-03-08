import { computed, Injectable, signal, Type } from '@angular/core';

export class User {
  name = 'Saul Goodman';
  email = 'saul.goodman@example.com';
  isLoggedIn = true;
}

export type ApplicationStatus = 'offered' | 'interview' | 'pending' | 'rejected';

export interface Application {
  id: number;
  company: string;
  role: string;
  dateApplied: string;
  status: ApplicationStatus;
  avatarColor: string;
}

export interface Listing {
  id: number;
  company: string;
  role: string;
  location: string;
  postedDate: string;
  avatarColor: string;
  slots: number;
  details: Map<string, string>;
}

export interface Doc {
  id: number;
  name: string;
  category: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppContext {

  user = signal(new User());
  isLoggedIn = computed(() => this.user().isLoggedIn);

  isOpen = signal(false);
  activeModal = signal<Type<unknown> | null>(null);

  applications = signal<Application[]>([
    { id: 1,  company: 'TechNexus',        role: 'Full Stack Engineer Intern',    dateApplied: 'Oct 14, 2023', status: 'offered',   avatarColor: '#64748b' },
    { id: 2,  company: 'BrightBank',       role: 'Junior Data Analyst',           dateApplied: 'Oct 12, 2023', status: 'interview', avatarColor: '#3b82f6' },
    { id: 3,  company: 'CloudScale',       role: 'DevOps Specialist Intern',      dateApplied: 'Oct 08, 2023', status: 'pending',   avatarColor: '#10b981' },
    { id: 4,  company: 'Global Logistics', role: 'Systems Administrator',         dateApplied: 'Sep 28, 2023', status: 'rejected',  avatarColor: '#8b5cf6' },
    { id: 5,  company: 'UrbanDesign Co.',  role: 'UI/UX Designer',                dateApplied: 'Sep 25, 2023', status: 'pending',   avatarColor: '#f59e0b' },
    { id: 6,  company: 'FinTech Solutions',role: 'Blockchain Dev Intern',         dateApplied: 'Sep 20, 2023', status: 'interview', avatarColor: '#ef4444' },
    { id: 7,  company: 'HealthPlus',       role: 'Healthcare Data Analyst',       dateApplied: 'Sep 15, 2023', status: 'pending',   avatarColor: '#06b6d4' },
    { id: 8,  company: 'NovaSpark',        role: 'ML Research Intern',            dateApplied: 'Sep 10, 2023', status: 'offered',   avatarColor: '#84cc16' },
    { id: 9,  company: 'PinnaclePay',      role: 'Product Management Intern',     dateApplied: 'Sep 05, 2023', status: 'rejected',  avatarColor: '#d946ef' },
    { id: 10, company: 'SkyNet Corp',      role: 'Cloud Infrastructure Intern',   dateApplied: 'Aug 28, 2023', status: 'pending',   avatarColor: '#f97316' },
    { id: 11, company: 'Axiom Labs',       role: 'Frontend Developer Intern',     dateApplied: 'Aug 20, 2023', status: 'interview', avatarColor: '#0ea5e9' },
    { id: 12, company: 'MedTech Inc.',     role: 'Biomedical Engineering Intern', dateApplied: 'Aug 15, 2023', status: 'offered',   avatarColor: '#10b981' },
  ]);

  listings = signal<Listing[]>([
    { id: 1, company: 'TechNexus', role: 'Full Stack Engineer Intern', location: 'San Francisco, CA', postedDate: 'Oct 10, 2023', avatarColor: '#64748b', slots: 3, details: new Map([['Duration', '3 months'], ['Compensation', '$25/hr'], ['Remote', 'No']]) },
    { id: 2, company: 'BrightBank', role: 'Junior Data Analyst', location: 'New York, NY', postedDate: 'Oct 08, 2023', avatarColor: '#3b82f6', slots: 2, details: new Map([['Duration', '6 months'], ['Compensation', '$20/hr'], ['Remote', 'Yes']]) },
    { id: 3, company: 'CloudScale', role: 'DevOps Specialist Intern', location: 'Seattle, WA', postedDate: 'Oct 05, 2023', avatarColor: '#10b981', slots: 4, details: new Map([['Duration', '4 months'], ['Compensation', '$22/hr'], ['Remote', 'No']]) },
    { id: 4, company: 'Global Logistics', role: 'Systems Administrator', location: 'Chicago, IL', postedDate: 'Oct 01, 2023', avatarColor: '#8b5cf6', slots: 1, details: new Map([['Duration', '3 months'], ['Compensation', '$24/hr'], ['Remote', 'Yes']]) },
    { id: 5, company: 'UrbanDesign Co.', role: 'UI/UX Designer', location: 'Austin, TX', postedDate: 'Sep 28, 2023', avatarColor: '#f59e0b', slots: 2, details: new Map([['Duration', '6 months'], ['Compensation', '$21/hr'], ['Remote', 'No']]) },
    { id: 6, company: 'FinTech Solutions', role: 'Blockchain Developer Intern', location: 'Boston, MA', postedDate: 'Sep 25, 2023', avatarColor: '#ef4444', slots: 3, details: new Map([['Duration', '4 months'], ['Compensation', '$23/hr'], ['Remote', 'Yes']]) },
    { id: 7,  company: 'HealthPlus',       role: 'Healthcare Data Analyst Intern', location: 'Denver, CO',   postedDate: 'Sep 20, 2023', avatarColor: '#3b82f6', slots: 2, details: new Map([['Duration', '3 months'], ['Compensation', '$20/hr'], ['Remote', 'No']]) },
    { id: 8,  company: 'NovaSpark',         role: 'ML Research Intern',             location: 'Remote',        postedDate: 'Sep 22, 2023', avatarColor: '#84cc16', slots: 2, details: new Map([['Duration', '6 months'], ['Compensation', '$26/hr'], ['Remote', 'Yes']]) },
    { id: 9,  company: 'PinnaclePay',       role: 'Product Management Intern',      location: 'Miami, FL',     postedDate: 'Sep 18, 2023', avatarColor: '#d946ef', slots: 1, details: new Map([['Duration', '3 months'], ['Compensation', '$22/hr'], ['Remote', 'No']]) },
    { id: 10, company: 'SkyNet Corp',        role: 'Cloud Infrastructure Intern',    location: 'Remote',        postedDate: 'Sep 15, 2023', avatarColor: '#f97316', slots: 3, details: new Map([['Duration', '4 months'], ['Compensation', '$24/hr'], ['Remote', 'Yes']]) },
  ]);

  allowedDocuments = ['Resume/CV', 'Cover Letter', 'Transcript', 'Student ID', 'University Letter'];

  uploadedDocuments = signal<Doc[]>([
    {
      id:1, 
      name: 'Saul_Goodman_Resume.pdf',
      type: 'pdf',
      category: 'Resume/CV'
    },
    {
      id:2, 
      name: 'My_Cover_leter.docx',
      type: 'docx',
      category: 'Cover Letter'
    },
    {
      id:3, 
      name: 'Saul_Goodman_Id.png',
      type: 'png',
      category: 'Student ID'
    },
  ]);

  openModal(component: Type<unknown>) {
    this.activeModal.set(component);
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
    this.activeModal.set(null);
  }

}
