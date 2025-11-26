export interface Lead {
  id: string;
  customerEmail: string;
  customerName: string | null;
  submittedAt: Date;
  pageId: string;
}

export interface CreateLeadDto {
  customerEmail: string;
  customerName?: string;
  pageId: string;
}

export interface UpdateLeadDto {
  customerEmail?: string;
  customerName?: string;
}
