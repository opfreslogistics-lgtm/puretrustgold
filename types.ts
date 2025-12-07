export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum MessageStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  REPLIED = 'REPLIED'
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  itemType: string;
  dateTime: string;
  notes?: string;
  photoUrl?: string; // In a real app this would be a storage URL
  status: AppointmentStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin';
}