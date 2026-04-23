export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: number;
  user_id: number;
  date: string;
  time: string;
  service: string;
  status: string;
  price: number;
}

export interface AdminData {
  users: UserProfile[];
  appointments: (Appointment & { user_name: string; user_email: string })[];
  stats: {
    total_revenue: number;
    total_bookings: number;
    total_customers: number;
  };
}
