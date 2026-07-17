export type District = 'ЦАО' | 'КАО' | 'САО' | 'ОАО' | 'ЛАО';

export interface Property {
  id: string;
  title: string;
  district: District;
  address: string;
  price: number;
  rooms: number;
  area: number;
  floor: string;
  image: string;
  type: 'квартира' | 'дом' | 'коммерческая' | 'участок';
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  dealType: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  details: string[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: 'callback' | 'quiz' | 'question' | 'calculator';
  status: 'new' | 'contacted' | 'negotiation' | 'closed_won' | 'closed_lost';
  createdAt: string;
  notes?: string;
  quizResult?: {
    goal: string;
    propertyType: string;
    district: string;
    budget: string;
  };
  calcResult?: {
    propertyValue: number;
    monthlyPayment: number;
    term: number;
  };
}

export interface DistrictInfo {
  id: District;
  fullName: string;
  description: string;
  averagePrice: string;
  advantages: string[];
  popularJKs: string[];
}
