export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  content: any; // JSON content
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateLandingPageDto {
  title: string;
  slug: string;
  published?: boolean;
  content: any;
  userId: string;
}

export interface UpdateLandingPageDto {
  title?: string;
  slug?: string;
  published?: boolean;
  content?: any;
}
