

import { DataState, DealStage, Email } from './types';

export const MOCK_GMAIL_DATA: Email[] = [
  { id: 'gmail-1', sender: 'Zillow Premier Agent', subject: 'New Lead: Michael asking about 123 Main St', body: 'You have a new lead interested in 123 Main St. Contact Michael Scott at (555) 123-4567 or michael.scott@example.com to schedule a showing.', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), read: false },
  { id: 'gmail-2', sender: 'Jane Smith', subject: 'Question about 456 Oak Ave listing', body: 'Hi, I saw your listing for 456 Oak Avenue and it looks lovely. Can you tell me what year the roof was last replaced? Thanks, Jane', timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(), read: false },
  { id: 'gmail-3', sender: 'Secure Title Co.', subject: 'Closing Documents for 789 Pine Ln (Miller)', body: 'Please find the closing disclosure for the Miller transaction at 789 Pine Lane attached. Please review and confirm receipt.', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), read: true },
  { id: 'gmail-4', sender: 'Open House Reminder', subject: 'Your Open House at 321 Elm Circle is this Saturday', body: 'Just a friendly reminder about your upcoming open house at 321 Elm Circle this Saturday from 1 PM to 4 PM. We have promoted it on all major platforms.', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), read: true },
  { id: 'gmail-5', sender: 'Mark Johnson', subject: 'Offer Submission for 456 Oak Ave', body: 'Hello, Following our conversation, we\'d like to formally submit our offer for 456 Oak Avenue. The offer document is attached. We are very excited about the possibility of this being our new home. Regards, Mark', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), read: false },
  { id: 'gmail-6', sender: 'Realtor.com', subject: 'You have a new connection request', body: 'A new potential client, Sarah Brown, would like to connect with you to discuss her home buying needs. You can reach her at sarah.b@example.com.', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), read: true },
  { id: 'gmail-7', sender: 'Bob Vance, Vance Refrigeration', subject: 'Referral for you', body: 'Hi, my colleague is looking to sell his house and I mentioned you were the best in the business. His name is Dwight Schrute, expect a call from him soon.', timestamp: new Date(Date.now() - 3600000 * 15).toISOString(), read: false },
  { id: 'gmail-8', sender: 'MortgagePro Lenders', subject: 'Update on Miller Loan Application', body: 'Good news! The appraisal for 789 Pine Ln came in at value. We are on track for a smooth closing next week.', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), read: true },
  { id: 'gmail-9', sender: 'Kevin Malone', subject: 'Viewing tomorrow?', body: 'Hey! Is 2pm still good for the showing at 123 Main St tomorrow? Just wanted to double check.', timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), read: false },
  { id: 'gmail-10', sender: 'Angela Martin', subject: 'Feedback for 321 Elm Circle Open House', body: 'Thank you for the open house. We thought the home was well-presented, but the yard was a bit smaller than we had hoped. We will continue our search.', timestamp: new Date(Date.now() - 3600000 * 25).toISOString(), read: true },
  { id: 'gmail-11', sender: 'Pro Home Inspections', subject: 'Inspection Report for 456 Oak Ave', body: 'The inspection report for your client Mark Johnson is complete and attached. Overall the property is in good condition with a few minor items noted.', timestamp: new Date(Date.now() - 3600000 * 28).toISOString(), read: true },
  { id: 'gmail-12', sender: 'Local Real Estate Board', subject: 'Weekly Newsletter & Updates', body: 'This week\'s newsletter includes updates on market trends, upcoming networking events, and new continuing education course offerings. Click here to read more.', timestamp: new Date(Date.now() - 3600000 * 30).toISOString(), read: true },
  { id: 'gmail-13', sender: 'Pam Halpert', subject: 'Thank you!', body: 'Thank you so much for helping us find our dream home! We are so excited to move in. We will definitely recommend you to all of our friends.', timestamp: new Date(Date.now() - 3600000 * 33).toISOString(), read: true },
  { id: 'gmail-14', sender: 'Staging Professionals Inc.', subject: 'Invoice for 321 Elm Circle', body: 'Hi, please see the attached invoice for the staging services provided at 321 Elm Circle. Payment is due within 15 days. Thank you!', timestamp: new Date(Date.now() - 3600000 * 36).toISOString(), read: true },
  { id: 'gmail-15', sender: 'Redfin', subject: 'Your listing at 123 Main St was viewed 58 times this week', body: 'Great engagement on your listing! Keep the momentum going by sharing it on your social media channels.', timestamp: new Date(Date.now() - 3600000 * 40).toISOString(), read: true },
];

export const MOCK_DATA: DataState = {
  emails: [
    {
      id: 'email-1',
      sender: 'John Doe',
      subject: 'Inquiry about 123 Maple St',
      body: 'Hi, I saw your listing for 123 Maple St and I\'m very interested. Could we schedule a viewing sometime this week? Thanks, John',
      timestamp: '2024-07-30T10:00:00Z',
      read: false,
    },
    {
      id: 'email-2',
      sender: 'Jane Smith',
      subject: 'Offer for 456 Oak Ave',
      body: 'Hello, we would like to submit an offer for the property at 456 Oak Ave. Please find the attached documents. Best, Jane',
      timestamp: '2024-07-30T09:30:00Z',
      read: true,
      label: 'Offer Received',
    },
     {
      id: 'email-3',
      sender: 'Title Company',
      subject: 'Closing documents for 789 Pine Ln',
      body: 'Hi, please review the attached closing disclosure for the 789 Pine Ln transaction. Let us know if you have any questions.',
      timestamp: '2024-07-29T15:00:00Z',
      read: true,
      label: 'Closing Info',
    },
     {
      id: 'email-4',
      sender: 'Mortgage Lender',
      subject: 'FW: Pre-approval letter for Mark Johnson',
      body: 'Please see the attached pre-approval letter for our mutual client, Mark Johnson. He is approved for up to $500,000.',
      timestamp: '2024-07-29T11:45:00Z',
      read: false,
    }
  ],
  tasks: [
    { id: 'task-1', title: 'Follow up with John Doe re: 123 Maple St', dueDate: '2024-08-01', completed: false, priority: 'High' },
    { id: 'task-2', title: 'Review offer for 456 Oak Ave', dueDate: '2024-08-01', completed: false, priority: 'High' },
    { id: 'task-3', title: 'Send closing docs for 789 Pine Ln to client', dueDate: '2024-08-01', completed: true, priority: 'Medium' },
    { id: 'task-4', title: 'Schedule photographers for new listing at 321 Elm Circle', dueDate: '2024-08-02', completed: false, priority: 'Medium' },
    { id: 'task-5', title: 'Prepare for open house at 321 Elm Circle', dueDate: '2024-08-04', completed: false, priority: 'Low' },
  ],
  deals: [
    {
      id: 'deal-1',
      propertyAddress: '123 Active Lane',
      value: 750000,
      commission: 18750,
      projectedCloseDate: '2024-08-15',
      stage: DealStage.Active,
      agents: [{ initials: 'RE', color: 'bg-blue-300' }, { initials: 'P', color: 'bg-green-300' }]
    },
    {
      id: 'deal-2',
      propertyAddress: '456 Pending Drive',
      value: 500000,
      commission: 12500,
      projectedCloseDate: '2024-08-20',
      stage: DealStage.Pending,
      agents: [{ initials: 'RE', color: 'bg-blue-300' }]
    },
    {
      id: 'deal-3',
      propertyAddress: '789 Conditional Blvd',
      value: 1200000,
      commission: 30000,
      projectedCloseDate: '2024-09-01',
      stage: DealStage.ConditionalOffers,
      agents: [{ initials: 'P', color: 'bg-green-300' }]
    },
    {
      id: 'deal-4',
      propertyAddress: '101 Firm St',
      value: 620000,
      commission: 15500,
      projectedCloseDate: '2024-08-10',
      stage: DealStage.FirmDeals,
      agents: [{ initials: 'RE', color: 'bg-blue-300' }, { initials: 'A', color: 'bg-yellow-300' }]
    },
    {
      id: 'deal-5',
      propertyAddress: '212 Closed Circle',
      value: 890000,
      commission: 22250,
      projectedCloseDate: '2024-07-25',
      stage: DealStage.Closed,
      agents: [{ initials: 'RE', color: 'bg-blue-300' }]
    },
  ],
  events: [
    { id: 'event-1', title: 'Showing at 123 Maple St', date: '2024-08-01', time: '14:00', source: 'local' },
    { id: 'event-2', title: 'Closing for 789 Pine Ln', date: '2024-08-05', time: '10:00', source: 'local' },
    { id: 'event-3', title: 'Team Meeting', date: '2024-08-01', time: '09:00', source: 'local' },
  ],
  fubEvents: [
    { id: 'fub-1', title: 'FUB Lead Follow Up', date: '2024-08-01', time: '11:00', source: 'fub' },
  ],
  gcalEvents: [
    { id: 'gcal-1', title: 'Dentist Appointment', date: '2024-08-02', time: '15:00', source: 'gcal' },
  ],
  integrations: {
    gmail: { connected: false, userEmail: null },
    followUpBoss: { connected: false, apiKey: null },
    monday: { connected: false, apiKey: null },
    googleCalendar: { connected: false },
    googleDrive: { connected: false },
  },
  gmailError: null,
  gmailLoading: false,
};
