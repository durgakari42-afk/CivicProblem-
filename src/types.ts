export type Language = 'en' | 'ta';

export type Category = 
  | 'Roads & Potholes'
  | 'Sanitation & Waste'
  | 'Streetlights & Electrical'
  | 'Water Supply & Drainage'
  | 'Public Safety / Other';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type TicketStatus = 
  | 'Submitted' 
  | 'AI Triaged & Routed' 
  | 'Assigned to Department' 
  | 'In Progress' 
  | 'Resolved';

export interface TimelineEvent {
  status: TicketStatus;
  timestamp: string;
  note_en: string;
  note_ta: string;
  actor: string;
}

export interface MultimodalAnalysis {
  hazard_detected: boolean;
  visual_evidence_en: string;
  visual_evidence_ta: string;
  safety_risks_en?: string[];
  safetyRisks_en?: string[];
  safety_risks_ta?: string[];
  safetyRisks_ta?: string[];
  estimated_severity: UrgencyLevel;
}

export interface ClusterWarning {
  is_duplicate: boolean;
  cluster_id?: string;
  match_count?: number;
  reason_en?: string;
  reason_ta?: string;
  matched_ticket_id?: string;
}

export interface TriageResult {
  title_en: string;
  title_ta: string;
  summary_en: string;
  summary_ta: string;
  category: Category;
  urgency: UrgencyLevel;
  priority_score: number; // 1 - 100
  rationale_en: string;
  rationale_ta: string;
  recommended_department_en: string;
  recommended_department_ta: string;
  sub_team_en: string;
  sub_team_ta: string;
  multimodal?: MultimodalAnalysis;
  cluster?: ClusterWarning;
}

export interface GrievanceTicket {
  id: string; // e.g., "CR-2026-101"
  raw_text: string;
  title_en: string;
  title_ta: string;
  summary_en: string;
  summary_ta: string;
  category: Category;
  urgency: UrgencyLevel;
  priority_score: number; // 1 - 100
  rationale_en: string;
  rationale_ta: string;
  department_en: string;
  department_ta: string;
  sub_team_en: string;
  sub_team_ta: string;
  assigned_crew_en?: string;
  assigned_crew_ta?: string;
  status: TicketStatus;
  ward: string; // e.g. "Ward 114 - T. Nagar"
  ward_ta: string;
  landmark: string;
  landmark_ta: string;
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
  photo_url?: string;
  multimodal?: MultimodalAnalysis;
  cluster?: ClusterWarning;
  upvotes: number;
  has_upvoted?: boolean;
  timeline: TimelineEvent[];
  resolution_proof_url?: string;
  resolution_notes_en?: string;
  resolution_notes_ta?: string;
}

export interface SamplePreset {
  id: string;
  label_en: string;
  label_ta: string;
  icon: string;
  text_en: string;
  text_ta: string;
  ward: string;
  ward_ta: string;
  landmark: string;
  landmark_ta: string;
  photo_url: string;
}
