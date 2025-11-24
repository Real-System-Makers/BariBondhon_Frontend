export enum MaintenanceStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}

export enum MaintenanceIssueType {
  WATER = 'water',
  ELECTRICITY = 'electricity',
  LIFT = 'lift',
  OTHERS = 'others',
}

export interface MaintenanceReply {
  message: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  senderRole: string;
  createdAt: string;
}

export interface MaintenanceStatusHistory {
  status: MaintenanceStatus;
  changedAt: string;
  changedBy?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface MaintenanceRequest {
  _id: string;
  tenant: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  flat: {
    _id: string;
    name: string;
  };
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  house: string;
  issueType: MaintenanceIssueType;
  description: string;
  status: MaintenanceStatus;
  replies: MaintenanceReply[];
  statusHistory: MaintenanceStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceStats {
  pending: number;
  in_progress: number;
  resolved: number;
  total: number;
}

export interface CreateMaintenanceRequestDto {
  issueType: MaintenanceIssueType;
  description: string;
}

export interface UpdateStatusDto {
  status: MaintenanceStatus;
}

export interface AddReplyDto {
  message: string;
}

