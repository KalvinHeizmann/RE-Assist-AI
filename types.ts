

export type Email = {
  id: string;
  sender: string;
  subject:string;
  body: string;
  timestamp: string;
  read: boolean;
  label?: string;
};

export type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
};

export enum DealStage {
  Active = 'Active',
  Pending = 'Pending',
  ConditionalOffers = 'Conditional Offers',
  FirmDeals = 'Firm Deals',
  Closed = 'Closed',
  PaidOut = 'Paid Out',
}

export type Agent = {
  initials: string;
  avatarUrl?: string;
  color: string;
};

export type Deal = {
  id:string;
  propertyAddress: string;
  value: number;
  commission: number;
  projectedCloseDate: string;
  stage: DealStage;
  agents: Agent[];
  notes?: string[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  source: 'local' | 'fub' | 'gcal';
};

export type IntegrationStatus = {
  gmail: {
    connected: boolean;
    userEmail: string | null;
  };
  followUpBoss: {
    connected: boolean;
    apiKey: string | null;
  };
  monday: {
    connected: boolean;
    apiKey: string | null;
  };
  googleCalendar: {
    connected: boolean;
  };
  googleDrive: {
    connected: boolean;
  };
};

export type DataState = {
  emails: Email[];
  tasks: Task[];
  deals: Deal[];
  events: CalendarEvent[];
  fubEvents: CalendarEvent[];
  gcalEvents: CalendarEvent[];
  integrations: IntegrationStatus;
  gmailError: string | null;
  gmailLoading: boolean;
};

export type DataAction =
  | { type: 'SET_EMAIL_LABEL'; payload: { emailId: string; label: string } }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: { taskId: string } }
  | { type: 'UPDATE_DEAL_STAGE'; payload: { dealId: string; newStage: DealStage } }
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'SET_GMAIL_CONNECTION'; payload: { connected: boolean; userEmail: string | null } }
  | { type: 'SET_FUB_CONNECTION'; payload: { connected: boolean; apiKey: string | null } }
  | { type: 'UPDATE_DEAL_NOTE'; payload: { dealId: string; note: string } }
  | { type: 'RESET_DATA' }
  | { type: 'SET_MONDAY_CONNECTION'; payload: { connected: boolean; apiKey: string | null } }
  | { type: 'SET_GCAL_CONNECTION'; payload: { connected: boolean } }
  | { type: 'SET_GDRIVE_CONNECTION'; payload: { connected: boolean } }
  | { type: 'SET_EMAILS'; payload: Email[] }
  | { type: 'SET_GMAIL_FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_GMAIL_FETCH_ERROR' }
  | { type: 'SET_GMAIL_LOADING'; payload: boolean };