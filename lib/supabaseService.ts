import { supabase } from './supabase'
import { Appointment, AppointmentStatus, Message, MessageStatus } from '@/types'

export const supabaseService = {
  // Appointments
  async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'> & { photoFile?: File }): Promise<{ error: null | string; data?: Appointment }> {
    try {
      let photoUrl: string | undefined = undefined

      // Upload photo if provided
      if (data.photoFile) {
        const fileExt = data.photoFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
        const filePath = `appointments/${fileName}`

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('appointment-photos')
          .upload(filePath, data.photoFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          return { error: uploadError.message }
        }

        const { data: { publicUrl } } = supabase.storage
          .from('appointment-photos')
          .getPublicUrl(filePath)

        photoUrl = publicUrl
      }

      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
          item_type: data.itemType,
          date_time: data.dateTime,
          notes: data.notes,
          photo_url: photoUrl,
          status: AppointmentStatus.PENDING,
        })
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      return {
        error: null,
        data: {
          id: appointment.id,
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          location: appointment.location,
          itemType: appointment.item_type,
          dateTime: appointment.date_time,
          notes: appointment.notes,
          photoUrl: appointment.photo_url,
          status: appointment.status,
          createdAt: appointment.created_at,
        }
      }
    } catch (error: any) {
      return { error: error.message || 'Failed to create appointment' }
    }
  },

  async getAppointments(): Promise<{ data: Appointment[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error: error.message }
      }

      return {
        data: data?.map((appt: any) => ({
          id: appt.id,
          name: appt.name,
          email: appt.email,
          phone: appt.phone,
          location: appt.location,
          itemType: appt.item_type,
          dateTime: appt.date_time,
          notes: appt.notes,
          photoUrl: appt.photo_url,
          status: appt.status,
          createdAt: appt.created_at,
        })) || [],
        error: null
      }
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to fetch appointments' }
    }
  },

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error: any) {
      return { error: error.message || 'Failed to update appointment' }
    }
  },

  // Messages
  async sendMessage(data: Omit<Message, 'id' | 'createdAt' | 'status'>): Promise<{ error: null | string }> {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          status: MessageStatus.UNREAD,
        })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error: any) {
      return { error: error.message || 'Failed to send message' }
    }
  },

  async getMessages(): Promise<{ data: Message[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return { data: null, error: error.message }
      }

      return {
        data: data?.map((msg: any) => ({
          id: msg.id,
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          status: msg.status,
          createdAt: msg.created_at,
        })) || [],
        error: null
      }
    } catch (error: any) {
      return { data: null, error: error.message || 'Failed to fetch messages' }
    }
  },

  async markMessageRead(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: MessageStatus.READ })
        .eq('id', id)

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error: any) {
      return { error: error.message || 'Failed to mark message as read' }
    }
  },

  // Analytics
  async getAnalytics(): Promise<any> {
    try {
      const [appointmentsResult, messagesResult] = await Promise.all([
        this.getAppointments(),
        this.getMessages(),
      ])

      const appointments = appointmentsResult.data || []
      const messages = messagesResult.data || []

      // Calculate last 7 days appointments
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date.toISOString().split('T')[0]
      })

      const appointmentsOverTime = last7Days.map(date => {
        return appointments.filter((apt: Appointment) => {
          const aptDate = new Date(apt.dateTime).toISOString().split('T')[0]
          return aptDate === date
        }).length
      })

      // Location distribution
      const locationCounts: Record<string, number> = {}
      appointments.forEach((apt: Appointment) => {
        locationCounts[apt.location] = (locationCounts[apt.location] || 0) + 1
      })

      const locations = Object.entries(locationCounts).map(([name, count]) => ({
        name,
        count,
      }))

      // Status distribution
      const statusCounts: Record<string, number> = {}
      appointments.forEach((apt: Appointment) => {
        statusCounts[apt.status] = (statusCounts[apt.status] || 0) + 1
      })

      const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
      }))

      // Mock revenue calculation (in real app, this would come from transactions)
      const totalRevenue = appointments.length * 15000 // Mock average transaction

      return {
        appointmentsOverTime,
        locations,
        statusDistribution,
        totalRevenue,
        totalAppointments: appointments.length,
        messageVolume: messages.length,
      }
    } catch (error: any) {
      console.error('Analytics error:', error)
      return {
        appointmentsOverTime: [0, 0, 0, 0, 0, 0, 0],
        locations: [],
        statusDistribution: [],
        totalRevenue: 0,
        totalAppointments: 0,
        messageVolume: 0,
      }
    }
  },
}

