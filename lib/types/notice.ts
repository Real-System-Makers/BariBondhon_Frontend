export enum NoticeType {
  MAINTENANCE = 'Maintenance',
  URGENT = 'Urgent',
  INFORMATION = 'Information',
  MEETING = 'Meeting',
}

export interface Notice {
  _id: string;
  title: string;
  details: string;
  type: NoticeType;
  isUrgent: boolean;
  house: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoticeDto {
  title: string;
  details: string;
  type: NoticeType;
  isUrgent?: boolean;
}

