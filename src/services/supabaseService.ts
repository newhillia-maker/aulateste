import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initial: string;
}

export const userService = {
  async getUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as UserProfile[];
  },

  async createUser(user: Omit<UserProfile, 'id'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  async updateUser(id: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  async deleteUser(id: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export interface Vessel {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  speed: string;
  status: string;
  color_class: string;
}

export const vesselService = {
  async getVessels() {
    const { data, error } = await supabase
      .from('vessels')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as Vessel[];
  }
};
