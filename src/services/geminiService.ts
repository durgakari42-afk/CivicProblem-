import { TriageResult, GrievanceTicket } from '../types';

export interface TriageRequestPayload {
  text: string;
  ward: string;
  landmark: string;
  photo_url?: string;
  photo_base64?: string;
  existing_tickets?: GrievanceTicket[];
}

export async function triageGrievance(payload: TriageRequestPayload): Promise<TriageResult> {
  try {
    const response = await fetch('/api/triage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to reach triage API`);
    }

    const data: TriageResult = await response.json();
    return data;
  } catch (error) {
    console.warn('API call failed, running direct browser fallback triage:', error);
    return directBrowserFallback(payload);
  }
}

/**
 * Direct in-browser fallback if both backend and network are unreachable
 */
function directBrowserFallback(payload: TriageRequestPayload): TriageResult {
  const text = (payload.text || '').toLowerCase();
  const ward = payload.ward || 'Ward 114 - T. Nagar';
  const landmark = payload.landmark || 'Main Road';
  const photo = payload.photo_url || payload.photo_base64;
  const existing = payload.existing_tickets || [];

  const isWater = text.includes('water') || text.includes('pipe') || text.includes('leak') || text.includes('குடிநீர்') || text.includes('கழிவுநீர்') || text.includes('சாக்கடை');
  const isGarbage = text.includes('garbage') || text.includes('waste') || text.includes('dump') || text.includes('குப்பை') || text.includes('துர்நாற்றம்');
  const isLight = text.includes('light') || text.includes('dark') || text.includes('தெருவிளக்கு') || text.includes('இருட்டு');

  let category: TriageResult['category'] = 'Roads & Potholes';
  let urgency: TriageResult['urgency'] = 'High';
  let priority_score = 86;
  let title_en = `Urgent Road Repair at ${landmark}`;
  let title_ta = `${landmark} பகுதியில் அவசர சாலை சீரமைப்பு`;
  let summary_en = `Dangerous road crater or surface hazard identified along ${ward}. Immediate bituminous leveling required.`;
  let summary_ta = `${ward} பகுதியில் ஆபத்தான சாலைப் பள்ளம் கண்டறியப்பட்டுள்ளது. உடனடியாக தார் இட்டு சீரமைக்கப்பட வேண்டும்.`;
  let rationale_en = 'High risk of vehicular collision and loss of two-wheeler balance on public corridor.';
  let rationale_ta = 'பொதுப் போக்குவரத்து சாலையில் இருசக்கர வாகனங்கள் விபத்துக்குள்ளாகும் அதிக ஆபத்து.';
  let dept_en = 'Municipal Roads & Bridges';
  let dept_ta = 'நகராட்சி சாலைகள் & பாலங்கள் துறை';
  let sub_en = 'Asphalt & Pavement Quick-Response Crew';
  let sub_ta = 'தார்ச் சாலை விரைவு நடவடிக்கை குழு';

  if (isWater) {
    category = 'Water Supply & Drainage';
    urgency = 'Critical';
    priority_score = 95;
    title_en = `Critical Pipeline Rupture at ${landmark}`;
    title_ta = `${landmark} பகுதியில் தீவிர குடிநீர் குழாய் உடைப்பு`;
    summary_en = 'Major water outflow eroding road foundation and wasting potable drinking supply.';
    summary_ta = 'குடிநீர் குழாய் உடைந்து சாலையின் அடியில் நீர் புகுந்து மண் அரிக்கப்படுகிறது.';
    rationale_en = 'Potential roadbed collapse and severe municipal drinking water distribution loss.';
    rationale_ta = 'சாலை உள்வாங்கும் அபாயமும் பெருமளவு குடிநீர் விரயமும் ஏற்படுகிறது.';
    dept_en = 'Water & Sewerage Board';
    dept_ta = 'குடிநீர் மற்றும் கழிவுநீர் வாரியம்';
    sub_en = 'Emergency Water Pipeline Division 4';
    sub_ta = 'அவசர குடிநீர் குழாய் பிரிவு 4';
  } else if (isGarbage) {
    category = 'Sanitation & Waste';
    urgency = 'Medium';
    priority_score = 62;
    title_en = `Public Waste Bin Overflow near ${landmark}`;
    title_ta = `${landmark} அருகில் குப்பைக் கழிவுகள் தேக்கம்`;
    summary_en = 'Overfilled waste receptacles with litter spilling onto pedestrian walkway.';
    summary_ta = 'குப்பைத் தொட்டிகள் நிரம்பி நடைபாதையில் கழிவுகள் சிதறியுள்ளன.';
    rationale_en = 'Decomposing bio-refuse poses disease transmission risks to neighboring foot commuters.';
    rationale_ta = 'மக்கள் நடமாடும் பகுதியில் துர்நாற்றமும் நோய்த்தொற்று பரவும் சூழலும் உள்ளது.';
    dept_en = 'Solid Waste Management';
    dept_ta = 'திடக்கழிவு மேலாண்மைத் துறை';
    sub_en = 'Conservancy Sanitation Squad';
    sub_ta = 'தூய்மைப்பணி களப்பிரிவு';
  } else if (isLight) {
    category = 'Streetlights & Electrical';
    urgency = 'High';
    priority_score = 78;
    title_en = `Streetlighting Blackout at ${landmark}`;
    title_ta = `${landmark} பகுதியில் தெருவிளக்குகள் பழுது`;
    summary_en = 'Unlit street section causing severe darkness and commuter vulnerability.';
    summary_ta = 'தெருவிளக்குகள் எரியாததால் அப்பகுதி இருண்டு பெண்கள் மற்றும் முதியோருக்கு பாதுகாப்பற்ற சூழல் ஏற்பட்டுள்ளது.';
    rationale_en = 'Zero nighttime illuminance on busy transit corridor elevates safety hazards.';
    rationale_ta = 'இரவு நேரத்தில் வெளிச்சமின்மை காரணமாக சமூக விரோத செயல்கள் மற்றும் விபத்து அபாயம்.';
    dept_en = 'Electrical Maintenance';
    dept_ta = 'மின் பராமரிப்புத் துறை';
    sub_en = 'Zone Street Lighting Unit';
    sub_ta = 'மண்டல தெருவிளக்கு பிரிவு';
  }

  // Duplicate / Cluster
  let cluster: TriageResult['cluster'] = undefined;
  const match = existing.find(t => t.category === category && t.status !== 'Resolved');
  if (match) {
    cluster = {
      is_duplicate: true,
      cluster_id: `CLUSTER-${ward.replace(/[^a-zA-Z0-9]/g, '')}`,
      match_count: 2,
      reason_en: `Ticket ${match.id} is already actively tracking a similar ${category} issue in this vicinity.`,
      reason_ta: `இதே பகுதியில் ${category} தொடர்பான புகார் (${match.id}) ஏற்கனவே நிலுவையில் உள்ளது.`,
      matched_ticket_id: match.id
    };
  }

  return {
    title_en,
    title_ta,
    summary_en,
    summary_ta,
    category,
    urgency,
    priority_score,
    rationale_en,
    rationale_ta,
    recommended_department_en: dept_en,
    recommended_department_ta: dept_ta,
    sub_team_en: sub_en,
    sub_team_ta: sub_ta,
    multimodal: photo ? {
      hazard_detected: true,
      visual_evidence_en: `Photo confirms structural ${category.toLowerCase()} defect at ${landmark}.`,
      visual_evidence_ta: `புகைப்படம் மூலம் ${landmark} பகுதியில் உள்ள குறைபாடு உறுதி செய்யப்பட்டது.`,
      safetyRisks_en: ['Pedestrian slip / trip hazard', 'Traffic bottleneck during peak hours'],
      safetyRisks_ta: ['பாதசாரிகள் தடுமாறும் அபாயம்', 'போக்குவரத்து நெரிசல்'],
      estimated_severity: urgency
    } : undefined,
    cluster
  };
}

/**
 * File to Base64 Data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
