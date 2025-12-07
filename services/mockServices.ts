import { Appointment, AppointmentStatus, Message, MessageStatus } from '../types';

// Constants for local storage keys
const APPOINTMENTS_KEY = 'puretrust_appointments';
const MESSAGES_KEY = 'puretrust_messages';

// --- Helper Functions ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStored = <T>(key: string): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setStored = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- Mock Supabase Service ---
export const supabaseService = {
  
  // Appointments
  async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<{ error: null | string }> {
    await delay(800); // Simulate network latency
    const appointments = getStored<Appointment>(APPOINTMENTS_KEY);
    
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: AppointmentStatus.PENDING,
    };
    
    appointments.unshift(newAppointment);
    setStored(APPOINTMENTS_KEY, appointments);
    
    // Simulate triggering an email
    await emailService.sendEmail({
      to: data.email,
      subject: 'Appointment Confirmation - PureTrust Gold',
      body: `Dear ${data.name},\n\nYour appointment request for ${new Date(data.dateTime).toLocaleString()} has been received.`
    });

    return { error: null };
  },

  async getAppointments(): Promise<{ data: Appointment[], error: null | string }> {
    await delay(500);
    return { data: getStored<Appointment>(APPOINTMENTS_KEY), error: null };
  },

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
    await delay(300);
    const appointments = getStored<Appointment>(APPOINTMENTS_KEY);
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index].status = status;
      setStored(APPOINTMENTS_KEY, appointments);
    }
  },

  // Messages (Contact Form)
  async sendMessage(data: Omit<Message, 'id' | 'createdAt' | 'status'>): Promise<{ error: null | string }> {
    await delay(800);
    const messages = getStored<Message>(MESSAGES_KEY);
    
    const newMessage: Message = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: MessageStatus.UNREAD,
    };
    
    messages.unshift(newMessage);
    setStored(MESSAGES_KEY, messages);

    return { error: null };
  },

  async getMessages(): Promise<{ data: Message[], error: null | string }> {
    await delay(500);
    return { data: getStored<Message>(MESSAGES_KEY), error: null };
  },
  
  async markMessageRead(id: string): Promise<void> {
    const messages = getStored<Message>(MESSAGES_KEY);
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages[index].status = MessageStatus.READ;
      setStored(MESSAGES_KEY, messages);
    }
  },

  // Analytics Service
  async getAnalytics(): Promise<any> {
    await delay(600);
    // Mock analytics data - ensuring it returns robust data
    const appts = getStored<Appointment>(APPOINTMENTS_KEY);
    const msgs = getStored<Message>(MESSAGES_KEY);
    
    return {
        appointmentsOverTime: [12, 19, 15, 25, 32, 28, 40], // Last 7 days
        locations: [
            { name: 'New York', count: 145 },
            { name: 'Toronto', count: 89 },
            { name: 'San Juan', count: 67 },
            { name: 'Mexico City', count: 45 }
        ],
        statusDistribution: [
            { status: 'Completed', count: 210 },
            { status: 'Pending', count: appts.filter(a => a.status === 'PENDING').length + 45 },
            { status: 'Confirmed', count: 32 },
            { status: 'Cancelled', count: 12 }
        ],
        totalRevenue: 4520000, // Mock revenue
        totalAppointments: 346 + appts.length,
        messageVolume: 128 + msgs.length
    };
  }
};

// --- Mock Nodemailer Service ---
export const emailService = {
  async sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
    await delay(1000);
    console.log(`%c[Mock Nodemailer] Email Sent`, 'color: #06D6A0; font-weight: bold;');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    return true;
  }
};

// --- Mock AI Service (Gemini Integration Point) ---
import { GoogleGenAI } from "@google/genai";

export const aiService = {
  async generateReply(customerMessage: string, context: string = "polite customer service"): Promise<string> {
    if (process.env.API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Draft a professional, luxury-brand email reply to this customer inquiry: "${customerMessage}". Context: ${context}. Keep it under 100 words.`,
            });
            return response.text || "Could not generate response.";
        } catch (e) {
            console.error("AI Error", e);
            return "Simulation: AI service unavailable (No API Key).";
        }
    }

    await delay(1500);
    return `Dear Customer,\n\nThank you for reaching out to PureTrust Gold regarding "${customerMessage.substring(0, 20)}...". We value your inquiry and one of our senior assayers will review your request immediately.\n\nBest regards,\nThe PureTrust Team`;
  }
};