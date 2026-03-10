export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  profile_image?: string;
  location?: string;
  city?: string;
  country?: string;
  bio?: string;
  role?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
