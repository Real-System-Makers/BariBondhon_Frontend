export enum NotificationType {
  RENT_GENERATED = 'Rent Generated',
  PAYMENT_DUE = 'Payment Due',
  PAYMENT_OVERDUE = 'Payment Overdue',
  PAYMENT_RECEIVED = 'Payment Received',
  LATE_FEE_APPLIED = 'Late Fee Applied',
  GENERAL = 'General',
}

export enum NotificationPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

export interface Notification {
  _id: string;
  recipient: {
    _id: string;
    name: string;
  };
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  relatedRent?: {
    _id: string;
  };
  relatedBilling?: {
    _id: string;
  };
  isRead: boolean;
  readAt?: string;
  channels: string[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
