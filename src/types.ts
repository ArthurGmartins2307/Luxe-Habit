export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image_url: string;
  description: string;
  is_featured: boolean;
  type: string;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  property_id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

export type PropertyFormData = Omit<Property, 'id' | 'created_at'>;
export type InquiryFormData = Omit<Inquiry, 'id' | 'created_at'>;
