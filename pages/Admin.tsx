import React, { useState, useEffect } from 'react';
import { supabaseService, aiService } from '../services/mockServices';
import { Appointment, Message, AppointmentStatus } from '../types';
import { RefreshCwIcon, CheckIcon, MailIcon, SparklesIcon, CalendarIcon, DollarSignIcon } from '../components/Icons';

// --- Simple SVG Components for Charts ---

const BarChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    return (
        <div className="flex items-end space-x-2 h-40 w-full pt-4">
            {data.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                    <div 
                        className="w-full bg-gold/50 hover:bg-gold transition-all rounded-t-sm relative" 
                        style={{ height: `${(val / max) * 100}%` }}
                    >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {val} Bookings
                        </div>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-2 uppercase tracking-wide">D-{7-i}</span>
                </div>
            ))}
        </div>
    );
};

const DonutChart = ({ data }: { data: { name: string, count: number }[] }) => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0);
    let currentAngle = 0;
    const colors = ['#D4AF37', '#F6E27F', '#AA8C2C', '#E63946'];

    return (
        <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                {data.map((item, i) => {
                    const percentage = item.count / total;
                    const angle = percentage * 360;
                    const largeArcFlag = percentage > 0.5 ? 1 : 0;
                    
                    // Prevent drawing error if single item is 100%
                    if (percentage === 1) {
                         return <circle key={i} cx="50" cy="50" r="40" fill={colors[i % colors.length]} stroke="black" strokeWidth="2" />;
                    }

                    const x1 = 50 + 40 * Math.cos(Math.PI * currentAngle / 180);
                    const y1 = 50 + 40 * Math.sin(Math.PI * currentAngle / 180);
                    const x2 = 50 + 40 * Math.cos(Math.PI * (currentAngle + angle) / 180);
                    const y2 = 50 + 40 * Math.sin(Math.PI * (currentAngle + angle) / 180);
                    
                    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    currentAngle += angle;
                    
                    return (
                        <path key={i} d={pathData} fill={colors[i % colors.length]} stroke="#121212" strokeWidth="1" className="hover:opacity-80 transition-opacity cursor-pointer">
                            <title>{item.name}: {item.count}</title>
                        </path>
                    );
                })}
                <circle cx="50" cy="50" r="25" fill="#121212" />
            </svg>
        </div>
    );
};


const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'messages'>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // AI State
  const [generatingReply, setGeneratingReply] = useState<string | null>(null);
  const [draftReply, setDraftReply] = useState<{id: string, text: string} | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const appts = await supabaseService.getAppointments();
    const msgs = await supabaseService.getMessages();
    const stats = await supabaseService.getAnalytics();
    
    if (appts.data) setAppointments(appts.data);
    if (msgs.data) setMessages(msgs.data);
    if (stats) setAnalytics(stats);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: string, status: AppointmentStatus) => {
    await supabaseService.updateAppointmentStatus(id, status);
    fetchData();
  };

  const handleGenerateAiReply = async (msg: Message) => {
    setGeneratingReply(msg.id);
    const reply = await aiService.generateReply(msg.message);
    setDraftReply({ id: msg.id, text: reply });
    setGeneratingReply(null);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-deep-charcoal px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
              <h1 className="text-4xl font-serif text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, Admin. Overview of operations.</p>
          </div>
          <button onClick={fetchData} className="flex items-center space-x-2 text-gold hover:text-white transition-colors bg-black px-4 py-2 border border-gray-800 rounded mt-4 md:mt-0">
            <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-xs uppercase tracking-widest font-bold">Refresh Data</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-12 border-b border-gray-700 mb-10">
          {['dashboard', 'appointments', 'messages'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm uppercase tracking-widest font-bold transition-all ${activeTab === tab ? 'text-gold border-b-2 border-gold scale-105' : 'text-gray-500 hover:text-white'}`}
            >
                {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden min-h-[600px] relative shadow-2xl">
          {loading && (
             <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
                 <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-gold text-xs uppercase tracking-widest font-bold">Loading Data...</div>
                 </div>
             </div>
          )}

          {activeTab === 'dashboard' && analytics && (
            <div className="p-8 md:p-12">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gray-900/50 p-8 rounded border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-black border border-gray-700 rounded"><CalendarIcon className="w-5 h-5 text-gold" /></div>
                             <span className="text-green-500 text-xs font-bold">+12%</span>
                        </div>
                        <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Appointments</h4>
                        <div className="text-4xl text-white font-serif">{analytics.totalAppointments}</div>
                    </div>

                    <div className="bg-gray-900/50 p-8 rounded border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-black border border-gray-700 rounded"><DollarSignIcon className="w-5 h-5 text-gold" /></div>
                             <span className="text-green-500 text-xs font-bold">+8%</span>
                        </div>
                        <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Estimated Pipeline</h4>
                        <div className="text-4xl text-gold font-serif">${(analytics.totalRevenue / 1000000).toFixed(1)}M</div>
                    </div>

                     <div className="bg-gray-900/50 p-8 rounded border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-black border border-gray-700 rounded"><MailIcon className="w-5 h-5 text-gray-400" /></div>
                             <span className="text-gray-500 text-xs font-bold">New</span>
                        </div>
                        <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Message Volume</h4>
                        <div className="text-4xl text-white font-serif">{analytics.messageVolume}</div>
                    </div>
                    
                     <div className="bg-gray-900/50 p-8 rounded border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-black border border-gray-700 rounded"><CheckIcon className="w-5 h-5 text-green-400" /></div>
                        </div>
                        <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Pending Actions</h4>
                        <div className="text-4xl text-white font-serif">{analytics.statusDistribution.find((s:any) => s.status === 'Pending')?.count || 0}</div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bar Chart Container */}
                    <div className="bg-gray-900/30 p-8 rounded border border-gray-800">
                        <div className="flex justify-between items-center mb-8">
                             <h3 className="text-white font-serif text-xl">Appointments (Last 7 Days)</h3>
                             <select className="bg-black text-xs text-gray-400 border border-gray-700 px-2 py-1 outline-none">
                                 <option>Weekly</option>
                                 <option>Monthly</option>
                             </select>
                        </div>
                        <div className="border-b border-gray-800 pb-4">
                            <BarChart data={analytics.appointmentsOverTime} />
                        </div>
                    </div>
                    
                    {/* Donut Chart Container */}
                    <div className="bg-gray-900/30 p-8 rounded border border-gray-800 flex flex-col md:flex-row items-center justify-around">
                        <div className="mb-6 md:mb-0">
                             <h3 className="text-white font-serif text-xl mb-4">Location Popularity</h3>
                             <p className="text-xs text-gray-500 mb-6 max-w-[200px]">Distribution of appointments across our global offices.</p>
                             <ul className="space-y-3">
                                 {analytics.locations.map((loc: any, i: number) => (
                                     <li key={i} className="flex items-center text-sm text-gray-300">
                                         <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: ['#D4AF37', '#F6E27F', '#AA8C2C', '#E63946'][i] }}></span>
                                         <span className="flex-1">{loc.name}</span>
                                         <span className="font-bold text-gold ml-4">{loc.count}</span>
                                     </li>
                                 ))}
                             </ul>
                        </div>
                        <DonutChart data={analytics.locations} />
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-900 border-b border-gray-800">
                  <tr>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Date & Time</th>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Client Details</th>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Item Type</th>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Location</th>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Status</th>
                    <th className="p-6 text-gray-400 font-normal text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {appointments.length === 0 ? (
                    <tr><td colSpan={6} className="p-12 text-center text-gray-500">No appointments found.</td></tr>
                  ) : (
                    appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-900/30 transition-colors group">
                        <td className="p-6 text-white">
                            <div className="font-medium">{new Date(appt.dateTime).toLocaleDateString()}</div>
                            <div className="text-xs text-gold mt-1">{new Date(appt.dateTime).toLocaleTimeString()}</div>
                        </td>
                        <td className="p-6 text-white">
                            <div className="font-bold font-serif text-lg">{appt.name}</div>
                            <div className="text-xs text-gray-500">{appt.email}</div>
                            <div className="text-xs text-gray-500">{appt.phone}</div>
                        </td>
                        <td className="p-6 text-gray-300">
                            <span className="bg-gray-900 px-3 py-1 rounded text-xs border border-gray-800">{appt.itemType}</span>
                        </td>
                        <td className="p-6 text-gray-400 text-sm">{appt.location}</td>
                        <td className="p-6">
                            <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${
                                appt.status === 'CONFIRMED' ? 'bg-green-900/30 text-green-400 border border-green-900' : 
                                appt.status === 'COMPLETED' ? 'bg-blue-900/30 text-blue-400 border border-blue-900' :
                                'bg-yellow-900/30 text-yellow-400 border border-yellow-900'
                            }`}>
                                {appt.status}
                            </span>
                        </td>
                        <td className="p-6">
                            <button 
                                onClick={() => handleStatusUpdate(appt.id, AppointmentStatus.COMPLETED)}
                                className="opacity-0 group-hover:opacity-100 text-gold hover:text-white text-xs border border-gold hover:bg-gold hover:text-black px-4 py-2 transition-all uppercase tracking-wider font-bold"
                            >
                                Complete
                            </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'messages' && (
             <div className="divide-y divide-gray-800">
                {messages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No messages found.</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="p-8 hover:bg-gray-900/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gold font-serif text-xl">
                                        {msg.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{msg.subject}</h4>
                                        <p className="text-gray-400 text-sm">{msg.name} &lt;{msg.email}&gt;</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 border border-gray-800 px-2 py-1 rounded">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="pl-14">
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed bg-gray-900/50 p-4 rounded border-l-2 border-gold">{msg.message}</p>
                                
                                {/* AI Reply Section */}
                                {draftReply && draftReply.id === msg.id ? (
                                    <div className="bg-gray-900 p-6 rounded border border-gray-700 animate-in fade-in slide-in-from-top-2 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                        <div className="flex items-center mb-4 space-x-2">
                                            <SparklesIcon className="w-4 h-4 text-purple-400" />
                                            <span className="text-xs uppercase font-bold text-purple-400 tracking-widest">AI Drafted Response</span>
                                        </div>
                                        <textarea 
                                            className="w-full bg-black text-gray-300 p-4 text-sm border border-gray-700 focus:border-gold outline-none min-h-[100px]" 
                                            defaultValue={draftReply.text}
                                        />
                                        <div className="flex justify-end mt-4 space-x-4">
                                            <button onClick={() => setDraftReply(null)} className="text-xs text-gray-400 hover:text-white px-4 py-2 uppercase tracking-wider font-bold">Discard</button>
                                            <button className="bg-gold text-black text-xs font-bold px-6 py-2 uppercase hover:bg-white tracking-widest transition-colors">Send Email</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleGenerateAiReply(msg)}
                                        disabled={generatingReply === msg.id}
                                        className="flex items-center space-x-2 text-xs text-gray-400 hover:text-gold border border-gray-700 hover:border-gold px-4 py-2 rounded transition-all uppercase tracking-widest font-bold"
                                    >
                                        {generatingReply === msg.id ? (
                                            <span className="animate-pulse">Analyzing...</span>
                                        ) : (
                                            <>
                                                <SparklesIcon className="w-3 h-3" />
                                                <span>Draft Reply with AI</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;