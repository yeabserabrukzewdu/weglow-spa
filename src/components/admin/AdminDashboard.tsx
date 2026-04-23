import React from 'react';
import { motion } from 'motion/react';
import { User, Calendar, Star, CheckCircle2, Trash2, LogOut } from 'lucide-react';
import { UserProfile, Appointment, AdminData } from '../../types';

interface AdminDashboardProps {
  adminData: AdminData | null;
  setView: (view: 'user' | 'admin') => void;
  onRefresh: () => void;
  setUser: (user: null) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, setView, onRefresh, setUser }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-3xl font-serif italic">Administrator</h1>
            <p className="text-xs uppercase tracking-widest font-bold text-black/30">System Overview</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onRefresh}
              className="px-6 py-3 border border-black/5 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-black/5"
            >
              Refresh Data
            </button>
            <button 
              onClick={() => {
                setView('user');
                setUser(null);
                localStorage.removeItem('zen_user');
              }}
              className="px-6 py-3 bg-red-500/10 text-red-500 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>

        {adminData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard label="Total Revenue" value={`$${adminData.stats.total_revenue}`} sub="Generated" />
            <StatsCard label="Bookings" value={adminData.stats.total_bookings} sub="Confirmed" />
            <StatsCard label="Customers" value={adminData.stats.total_customers} sub="Unique Users" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Section title="Active Users" icon={<User className="w-4 h-4" />}>
            <div className="space-y-4">
              {adminData?.users.map(u => (
                <div key={u.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40] uppercase font-bold text-xs">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{u.name}</p>
                      <p className="text-[10px] text-black/30 tracking-wider">{u.email}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Recent Appointments" icon={<Calendar className="w-4 h-4" />}>
            <div className="space-y-4">
              {adminData?.appointments.map(a => (
                <div key={a.id} className="p-5 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-3 py-1 bg-[#5A5A40]/10 text-[#5A5A40] rounded-full text-[8px] uppercase tracking-widest font-bold">
                        {a.status}
                      </span>
                      <h4 className="font-serif italic text-lg mt-2">{a.service}</h4>
                    </div>
                    <p className="font-bold text-sm tracking-tight text-[#5A5A40]">${a.price}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] text-black/30 font-semibold space-y-1">
                      <p className="uppercase tracking-widest">{a.user_name}</p>
                      <p>{a.date} at {a.time}</p>
                    </div>
                    <button className="p-2 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, sub }: { label: string, value: any, sub: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[40px] shadow-sm border border-black/5"
  >
    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 mb-4">{label}</p>
    <h3 className="text-4xl font-serif italic mb-1">{value}</h3>
    <p className="text-[10px] uppercase tracking-widest font-bold text-black/20">{sub}</p>
  </motion.div>
);

const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-black/5">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-black/5 rounded-lg">{icon}</div>
      <h2 className="text-xl font-serif italic">{title}</h2>
    </div>
    {children}
  </div>
);
