export type UserType = "STUDENT" | "COMPANY" | "ADMIN";

export type OfferStatus = "SENT" | "ACCEPTED" | "DECLINED";

export interface UserSession {
  id: string;
  email: string;
  userType: UserType;
  name?: string | null;
}

export interface StudentProfileData {
  id: string;
  userId: string;
  fullName: string | null;
  university: string | null;
  graduationYear: number | null;
  bio: string | null;
  skills: string | null;
  experience: string | null;
  videos?: VideoData[];
}

export interface CompanyProfileData {
  id: string;
  userId: string;
  companyName: string | null;
  industry: string | null;
  websiteUrl: string | null;
  description: string | null;
}

export interface VideoData {
  id: string;
  studentId: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  title: string;
  description: string | null;
  tags: string | null;
  uploadedAt: string | Date;
  student?: {
    id: string;
    fullName: string | null;
    university: string | null;
    graduationYear: number | null;
    bio: string | null;
    skills: string | null;
    experience: string | null;
    user?: {
      id: string;
      email: string;
    };
  };
}

export interface LikeData {
  id: string;
  companyId: string;
  studentId: string;
  createdAt: string | Date;
  student?: StudentProfileData & {
    user?: {
      email: string;
    };
    videos?: VideoData[];
  };
}

export interface OfferData {
  id: string;
  companyId: string;
  studentId: string;
  message: string;
  status: OfferStatus;
  createdAt: string | Date;
  company?: {
    id: string;
    email: string;
    companyProfile?: CompanyProfileData | null;
  };
  student?: {
    id: string;
    email: string;
    studentProfile?: StudentProfileData | null;
  };
  messages?: MessageData[];
}

export interface MessageData {
  id: string;
  offerId: string;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string | Date;
  sender?: {
    id: string;
    email: string;
    userType: UserType;
  };
}
