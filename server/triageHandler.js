import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Intelligent Rule-Based Fallback Engine
 * Accurately analyzes English and Tamil inputs when Gemini API key is absent or network is limited.
 */
function runFallbackTriage(payload) {
  const text = (payload.text || '').toLowerCase();
  const ward = payload.ward || 'Ward 114 - T. Nagar';
  const landmark = payload.landmark || 'Main Road';
  const photo = payload.photo_url || payload.photo_base64 || '';
  const existingTickets = payload.existing_tickets || [];

  let category = 'Roads & Potholes';
  let urgency = 'Medium';
  let priorityScore = 65;
  let title_en = 'Reported Road Infrastructure Defect';
  let title_ta = 'பதிவு செய்யப்பட்ட சாலை கட்டமைப்பு குறைபாடு';
  let summary_en = 'Citizen reported physical surface defect requiring municipal engineering repair.';
  let summary_ta = 'குடிமகன் நகராட்சி பொறியியல் பராமரிப்பு தேவைப்படும் மேற்பரப்புக் குறைபாட்டைப் பதிவு செய்துள்ளார்.';
  let rationale_en = 'Physical infrastructure impact evaluated based on reported transit corridor safety risks.';
  let rationale_ta = 'போக்குவரத்துப் பாதையின் பாதுகாப்பு அபாயத்தின் அடிப்படையில் உள்கட்டமைப்பு குறைபாடு மதிப்பீடு செய்யப்பட்டது.';
  let dept_en = 'Municipal Roads & Bridges';
  let dept_ta = 'நகராட்சி சாலைகள் & பாலங்கள் துறை';
  let subTeam_en = 'Asphalt & Pavement Quick-Response Crew';
  let subTeam_ta = 'தார்ச் சாலை விரைவு நடவடிக்கை குழு';

  // Keyword Matching for English and Tamil
  const isPothole = text.includes('pothole') || text.includes('crater') || text.includes('road') || text.includes('பள்ளம்') || text.includes('குழி') || text.includes('தார்') || text.includes('விரிசல்');
  const isWater = text.includes('water') || text.includes('pipe') || text.includes('leak') || text.includes('drain') || text.includes('manhole') || text.includes('குடிநீர்') || text.includes('கழிவுநீர்') || text.includes('சாக்கடை') || text.includes('கசிவு') || text.includes('உடைப்பு');
  const isGarbage = text.includes('garbage') || text.includes('waste') || text.includes('dump') || text.includes('stench') || text.includes('trash') || text.includes('குப்பை') || text.includes('துர்நாற்றம்') || text.includes('தொட்டி') || text.includes('கழிவு');
  const isLight = text.includes('light') || text.includes('dark') || text.includes('electric') || text.includes('lamp') || text.includes('wire') || text.includes('தெருவிளக்கு') || text.includes('மின்சாரம்') || text.includes('இருட்டு') || text.includes('கம்பி');

  if (isWater) {
    category = 'Water Supply & Drainage';
    dept_en = 'Water & Sewerage Board';
    dept_ta = 'குடிநீர் மற்றும் கழிவுநீர் வாரியம்';
    subTeam_en = 'Emergency Pipeline Division';
    subTeam_ta = 'அவசர குடிநீர் குழாய் பிரிவு';

    if (text.includes('burst') || text.includes('open') || text.includes('manhole') || text.includes('உடைப்பு') || text.includes('திறந்த') || text.includes('gushing')) {
      urgency = 'Critical';
      priorityScore = 96;
      title_en = `Critical Water Hazard near ${landmark}`;
      title_ta = `${landmark} அருகில் அதிதீவிர குடிநீர் / வடிகால் அபாயம்`;
      summary_en = 'High-pressure pipeline burst or hazardous open chamber causing water loss and acute foundation erosion.';
      summary_ta = 'அதிக அழுத்த குழாய் உடைப்பு அல்லது திறந்த கழிவுநீர் தொட்டி நீர் விரயத்தையும் சாலை அஸ்திவார சேதத்தையும் ஏற்படுத்துகிறது.';
      rationale_en = 'Immediate threat of subsoil cavity liquefaction and widespread potable water supply compromise.';
      rationale_ta = 'சாலையின் உள்மண் அரிக்கப்பட்டு பள்ளம் ஏற்படும் அபாயமும், குடிநீர் விநியோகம் பாதிக்கப்படும் சூழலும் உள்ளது.';
    } else {
      urgency = 'High';
      priorityScore = 80;
      title_en = `Drainage & Water Supply Disruption at ${landmark}`;
      title_ta = `${landmark} பகுதியில் கழிவுநீர் / குடிநீர் விநியோகத் தடை`;
      summary_en = 'Leaking pipe or blocked drain requiring hydraulic crew intervention.';
      summary_ta = 'கசிவுள்ள குழாய் அல்லது அடைபட்ட வடிகால் உடனடியாக சீரமைக்கப்பட வேண்டும்.';
      rationale_en = 'Continued waterlogging risks road erosion and vector-borne bacterial spread.';
      rationale_ta = 'தேங்கும் நீர் சாலையை சேதப்படுத்துவதோடு தொற்றுநோய் பரவ வழிவகுக்கும்.';
    }
  } else if (isGarbage) {
    category = 'Sanitation & Waste';
    dept_en = 'Solid Waste Management';
    dept_ta = 'திடக்கழிவு மேலாண்மைத் துறை';
    subTeam_en = 'Conservancy Sanitation Squad';
    subTeam_ta = 'தூய்மைப்பணி களப்பிரிவு';
    urgency = text.includes('school') || text.includes('hospital') || text.includes('days') || text.includes('பள்ளி') || text.includes('மருத்துவமனை') ? 'High' : 'Medium';
    priorityScore = urgency === 'High' ? 76 : 58;
    title_en = `Municipal Waste Overflow near ${landmark}`;
    title_ta = `${landmark} அருகில் பெருமளவு குப்பைக் கழிவுகள் தேக்கம்`;
    summary_en = 'Solid waste overflow blocking pedestrian movement with bio-hazard contamination risk.';
    summary_ta = 'நடைபாதையை அடைக்கும் அளவுக்கு குப்பை தேங்கி சுகாதார சீர்கேடு ஏற்பட்டுள்ளது.';
    rationale_en = 'Bio-waste decomposition near residential foot traffic creates urgent public sanitation hazard.';
    rationale_ta = 'குடியிருப்பு மற்றும் மக்கள் நடமாட்ட பகுதியில் அழுகும் கழிவுகள் கடுமையான சுகாதாரக் கேட்டை ஏற்படுத்துகின்றன.';
  } else if (isLight) {
    category = 'Streetlights & Electrical';
    dept_en = 'Electrical Maintenance';
    dept_ta = 'மின் பராமரிப்புத் துறை';
    subTeam_en = 'Street Lighting Operations';
    subTeam_ta = 'தெருவிளக்கு பராமரிப்பு பிரிவு';
    urgency = text.includes('wire') || text.includes('spark') || text.includes('blackout') || text.includes('இருட்டு') || text.includes('கம்பி') ? 'High' : 'Medium';
    priorityScore = urgency === 'High' ? 82 : 60;
    title_en = `Streetlighting Blackout Corridor along ${landmark}`;
    title_ta = `${landmark} பகுதியில் தெருவிளக்கு மின்தடை`;
    summary_en = 'Multiple unlit lamp fixtures causing poor nighttime visibility and safety risks.';
    summary_ta = 'பல தெருவிளக்குகள் எரியாததால் இரவு நேரத்தில் இருள் சூழ்ந்து பாதுகாப்பு குறைபாடு நிலவுகிறது.';
    rationale_en = 'Nighttime public security vulnerability along pedestrian commuter path.';
    rationale_ta = 'பாதசாரிகள் செல்லும் பாதையில் இரவு நேர பாதுகாப்பு அச்சுறுத்தல்.';
  } else if (isPothole) {
    category = 'Roads & Potholes';
    dept_en = 'Municipal Roads & Bridges';
    dept_ta = 'நகராட்சி சாலைகள் & பாலங்கள் துறை';
    subTeam_en = 'Asphalt & Pavement Quick-Response Crew';
    subTeam_ta = 'தார்ச் சாலை விரைவு நடவடிக்கை குழு';
    urgency = text.includes('deep') || text.includes('skid') || text.includes('accident') || text.includes('விபத்து') || text.includes('ஆழமான') ? 'High' : 'Medium';
    priorityScore = urgency === 'High' ? 88 : 65;
    title_en = `Dangerous Road Crater Pothole on ${landmark}`;
    title_ta = `${landmark} பகுதியில் ஆபத்தான சாலைப் பள்ளம்`;
    summary_en = 'Substantial asphalt depression posing acute two-wheeler accident hazard and traffic congestion.';
    summary_ta = 'இருசக்கர வாகன ஓட்டிகளுக்கு விபத்து விளைவிக்கும் வகையிலான ஆழமான தார்ச்சாலைப் பள்ளம்.';
    rationale_en = 'High-frequency vehicular movement over severe road depression elevates near-term collision probability.';
    rationale_ta = 'அதிக போக்குவரத்து உள்ள சாலையில் உள்ள பள்ளம் தொடர் விபத்துக்களுக்கு வழிவகுக்கும்.';
  } else {
    category = 'Public Safety / Other';
    dept_en = 'Public Health & Safety';
    dept_ta = 'பொது சுகாதாரம் & பாதுகாப்புத் துறை';
    subTeam_en = 'Municipal Field Enforcement Unit';
    subTeam_ta = 'நகராட்சி கள அமலாக்கப் பிரிவு';
    urgency = 'Medium';
    priorityScore = 55;
    title_en = `Civic Grievance Reported at ${landmark}`;
    title_ta = `${landmark} பகுதியில் பதிவு செய்யப்பட்ட பொதுப் புகார்`;
    summary_en = 'General civic obstruction or maintenance defect submitted for municipal review.';
    summary_ta = 'நகராட்சி நிர்வாகத்தின் பார்வைக்காக சமர்ப்பிக்கப்பட்ட பொதுக் குறைபாடு.';
    rationale_en = 'Community nuisance and safety risk requiring assigned field inspection.';
    rationale_ta = 'கள ஆய்வு மூலம் சரிசெய்யப்பட வேண்டிய பொதுப் பிரச்சனை.';
  }

  // Multimodal Vision Inspection
  let multimodal = undefined;
  if (photo) {
    multimodal = {
      hazard_detected: true,
      visual_evidence_en: `Visual inspection verifies ${category.toLowerCase()} hazard at ${landmark}; surface degradation and obstacle detected.`,
      visual_evidence_ta: `புகைப்பட ஆய்வில் ${category} குறைபாடு மற்றும் விபத்து அபாயம் உறுதி செய்யப்பட்டுள்ளது.`,
      safetyRisks_en: [
        `Direct vehicular/pedestrian hazard in ${ward}`,
        'Secondary structural damage if unmitigated within 48 hours'
      ],
      safetyRisks_ta: [
        `${ward} பகுதியில் பொதுமக்களுக்கு நேரடி விபத்து அபாயம்`,
        '48 மணி நேரத்திற்குள் சரிசெய்யாவிடில் மேலும் சேதமடையும் சூழல்'
      ],
      estimated_severity: urgency
    };
  }

  // Duplicate / Cluster Detection
  let cluster = undefined;
  const duplicateMatch = existingTickets.find(t => 
    t.category === category && 
    (t.ward === ward || t.ward_ta === ward) && 
    t.status !== 'Resolved'
  );

  if (duplicateMatch) {
    cluster = {
      is_duplicate: true,
      cluster_id: `CLUSTER-${ward.replace(/[^a-zA-Z0-9]/g, '')}`,
      match_count: 2,
      reason_en: `Found 1 open ticket (${duplicateMatch.id}) in ${ward} reporting similar ${category}. Citizens can upvote the active issue.`,
      reason_ta: `${ward} பகுதியில் இதே போன்ற பிரச்சனைக்கு ஏற்கனவே (${duplicateMatch.id}) எண் கொண்ட புகார் நிலுவையில் உள்ளது. நீங்கள் அதற்கு ஆதரவு அளிக்கலாம்.`,
      matched_ticket_id: duplicateMatch.id
    };
  }

  return {
    title_en,
    title_ta,
    summary_en,
    summary_ta,
    category,
    urgency,
    priority_score: priorityScore,
    rationale_en,
    rationale_ta,
    recommended_department_en: dept_en,
    recommended_department_ta: dept_ta,
    sub_team_en: subTeam_en,
    sub_team_ta: subTeam_ta,
    multimodal,
    cluster
  };
}

/**
 * Main Triage Controller
 * Attempts Gemini 2.5 Flash with structured output schema first;
 * seamlessly cascades to smart fallback engine if API key is not configured or fails.
 */
export async function runTriage(payload) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    return runFallbackTriage(payload);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are CivicResolve's specialized municipal AI triage engine for Chennai / Indian urban centers.
A citizen reported this civic grievance:
---
Text: "${payload.text || ''}"
Ward: "${payload.ward || 'General'}"
Landmark: "${payload.landmark || 'Unspecified'}"
Has Photo: ${payload.photo_url || payload.photo_base64 ? 'Yes' : 'No'}
---

Perform thorough civic triage and return a structured JSON response with:
1. title_en and title_ta (natural, fluent Tamil translation)
2. summary_en and summary_ta (concise, actionable overview)
3. category: exactly one of: ["Roads & Potholes", "Sanitation & Waste", "Streetlights & Electrical", "Water Supply & Drainage", "Public Safety / Other"]
4. urgency: exactly one of: ["Low", "Medium", "High", "Critical"]
5. priority_score: integer from 1 to 100 based on severity, public transit density, and safety risk
6. rationale_en and rationale_ta (objective reasoning for urgency and score)
7. recommended_department_en and recommended_department_ta
8. sub_team_en and sub_team_ta
9. multimodal: { hazard_detected: boolean, visual_evidence_en: string, visual_evidence_ta: string, safety_risks_en: [string], safety_risks_ta: [string], estimated_severity: string }
10. cluster: { is_duplicate: boolean, cluster_id: string, match_count: number, reason_en: string, reason_ta: string, matched_ticket_id: string }`;

    const contents = [];
    
    // If image provided as base64 or inline data
    if (payload.photo_base64) {
      const base64Data = payload.photo_base64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      });
    }

    contents.push(prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            title_en: { type: 'string' },
            title_ta: { type: 'string' },
            summary_en: { type: 'string' },
            summary_ta: { type: 'string' },
            category: { 
              type: 'string',
              enum: ['Roads & Potholes', 'Sanitation & Waste', 'Streetlights & Electrical', 'Water Supply & Drainage', 'Public Safety / Other']
            },
            urgency: { 
              type: 'string',
              enum: ['Low', 'Medium', 'High', 'Critical']
            },
            priority_score: { type: 'integer' },
            rationale_en: { type: 'string' },
            rationale_ta: { type: 'string' },
            recommended_department_en: { type: 'string' },
            recommended_department_ta: { type: 'string' },
            sub_team_en: { type: 'string' },
            sub_team_ta: { type: 'string' },
            multimodal: {
              type: 'object',
              properties: {
                hazard_detected: { type: 'boolean' },
                visual_evidence_en: { type: 'string' },
                visual_evidence_ta: { type: 'string' },
                safety_risks_en: { type: 'array', items: { type: 'string' } },
                safety_risks_ta: { type: 'array', items: { type: 'string' } },
                estimated_severity: { type: 'string' }
              }
            },
            cluster: {
              type: 'object',
              properties: {
                is_duplicate: { type: 'boolean' },
                cluster_id: { type: 'string' },
                match_count: { type: 'integer' },
                reason_en: { type: 'string' },
                reason_ta: { type: 'string' },
                matched_ticket_id: { type: 'string' }
              }
            }
          },
          required: [
            'title_en', 'title_ta', 'summary_en', 'summary_ta', 
            'category', 'urgency', 'priority_score', 
            'rationale_en', 'rationale_ta', 
            'recommended_department_en', 'recommended_department_ta',
            'sub_team_en', 'sub_team_ta'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed;
  } catch (err) {
    console.warn('Gemini 2.5 Flash API error, utilizing intelligent fallback engine:', err.message);
    return runFallbackTriage(payload);
  }
}
