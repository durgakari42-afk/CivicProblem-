import { GrievanceTicket, SamplePreset } from '../types';

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'preset-pothole',
    label_en: 'Dangerous Pothole',
    label_ta: 'ஆபத்தான சாலைப் பள்ளம்',
    icon: 'AlertTriangle',
    text_en: 'Deep crater-sized pothole on South Usman Road right near the main bus stop. Multiple two-wheelers skidded during the evening rain and traffic is backed up for 500 meters.',
    text_ta: 'தெற்கு உஸ்மான் சாலையில் பேருந்து நிறுத்தம் அருகில் மிக ஆழமான பள்ளம் உள்ளது. மாலை மழையின் போது பல இருசக்கர வாகனங்கள் சறுக்கி விழுந்து விபத்துக்குள்ளாகின. போக்குவரத்து நெரிசல் அதிகரித்துள்ளது.',
    ward: 'Ward 114 - T. Nagar',
    ward_ta: 'வார்டு 114 - தி. நகர்',
    landmark: 'Near Ranganathan St Intersection, Usman Rd',
    landmark_ta: 'ரங்கநாதன் தெரு சந்திப்பு அருகில், உஸ்மான் சாலை',
    photo_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'preset-garbage',
    label_en: 'Overflowing Garbage Dump',
    label_ta: 'குப்பைக் குவியல் & துர்நாற்றம்',
    icon: 'Trash2',
    text_en: 'Three municipal garbage bins overflowing onto the pedestrian pathway for the past 4 days. Severe stench, stray animals tearing bags, blocking entrance to the local primary school.',
    text_ta: 'கடந்த 4 நாட்களாக பாதசாரிகள் நடைபாதையில் மூன்று நகராட்சி குப்பைத் தொட்டிகள் நிரம்பி வழிகின்றன. கடுமையான துர்நாற்றம் வீசுகிறது, தெரு நாய்கள் குப்பையைக் கிளறி பள்ளிக்கூட வாசலை அடைக்கின்றன.',
    ward: 'Ward 172 - Adyar',
    ward_ta: 'வார்டு 172 - அடையாறு',
    landmark: 'Behind Adyar Depot, 4th Cross Road',
    landmark_ta: 'அடையாறு பணிமனை பின்புறம், 4வது குறுக்குத் தெரு',
    photo_url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'preset-streetlight',
    label_en: 'Dark Streetlight Cluster',
    label_ta: 'பழுதடைந்த தெருவிளக்குகள்',
    icon: 'ZapOff',
    text_en: 'Five consecutive sodium streetlights are completely non-functional on 2nd Avenue for a stretch of 300 meters. The street is pitch dark at night creating serious safety concerns for women commuters.',
    text_ta: '2வது அவென்யூவில் 300 மீட்டர் தூரத்திற்கு அடுத்தடுத்து 5 தெருவிளக்குகள் எரியவில்லை. இரவு நேரத்தில் அப்பகுதி இருண்டு காணப்படுவதால் பணிக்குச் செல்லும் பெண்கள் அச்சமடைகின்றனர்.',
    ward: 'Ward 102 - Anna Nagar',
    ward_ta: 'வார்டு 102 - அண்ணா நகர்',
    landmark: 'Opposite Tower Park, 2nd Avenue',
    landmark_ta: 'டவர் பூங்கா எதிரில், 2வது அவென்யூ',
    photo_url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'preset-water',
    label_en: 'Water Main Pipe Burst',
    label_ta: 'குடிநீர் குழாய் உடைப்பு',
    icon: 'Droplets',
    text_en: 'Potable water main pipeline ruptured under the pavement. Clean drinking water is gushing onto the road at high pressure, flooding neighboring shops and eroding the asphalt foundation.',
    text_ta: 'நடைபாதைக்கு கீழே செல்லும் முக்கிய குடிநீர் குழாய் உடைந்து நன்னீர் அதிக அழுத்தத்துடன் சாலையில் பீறிட்டுப் பாய்கிறது. கடைகளில் தண்ணீர் புகுந்து சாலையின் கீழ் அஸ்திவாரம் அரிக்கப்படுகிறது.',
    ward: 'Ward 125 - Mylapore',
    ward_ta: 'வார்டு 125 - மயிலாப்பூர்',
    landmark: 'Luz Church Road near Tank junction',
    landmark_ta: 'லஸ் சர்ச் சாலை, தெப்பக்குளம் சந்திப்பு அருகில்',
    photo_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'preset-road',
    label_en: 'Damaged Road Crater',
    label_ta: 'சேதமடைந்த சாலை விரிசல்',
    icon: 'Construction',
    text_en: 'Post-monsoon asphalt subsidence caused a 4-foot sunken trench across the main arterial lane. Vehicles are forced into sudden oncoming traffic lanes, causing near-fatal near-miss collisions.',
    text_ta: 'மழைக்குப் பிறகு ஏற்பட்ட நிலச்சரிவினால் பிரதான சாலையில் 4 அடி அகலத்திற்குப் பெரும் பள்ளம் ஏற்பட்டுள்ளது. வாகனங்கள் எதிர்திசையில் செல்ல நேரிடுவதால் கடும் விபத்து அபாயம் உள்ளது.',
    ward: 'Ward 138 - Velachery',
    ward_ta: 'வார்டு 138 - வேளச்சேரி',
    landmark: 'Velachery Bypass Road near Lake View Point',
    landmark_ta: 'வேளச்சேரி பைபாஸ் சாலை, ஏரிக்கரை பார்வை முனையம்',
    photo_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_TICKETS: GrievanceTicket[] = [
  {
    id: 'CR-2026-101',
    raw_text: 'Major water pipeline burst at Luz Church Road Mylapore with clean potable water gushing and flooding roadway.',
    title_en: 'High-Pressure Potable Water Main Burst at Luz Junction',
    title_ta: 'லஸ் சந்திப்பில் அதிக அழுத்த குடிநீர் பிரதான குழாய் உடைப்பு',
    summary_en: 'Potable water pipeline fractured beneath pavement, causing roadway erosion and drinking water wastage.',
    summary_ta: 'நடைபாதை அடியில் குடிநீர் குழாய் உடைந்து சாலையில் வெள்ளப்பெருக்கு மற்றும் நீர் விரயம் ஏற்பட்டுள்ளது.',
    category: 'Water Supply & Drainage',
    urgency: 'Critical',
    priority_score: 96,
    rationale_en: 'Active potable water wastage exceeding 1,200 liters/hr coupled with structural asphalt foundation liquefaction along a busy public transit arterial.',
    rationale_ta: 'மணிக்கு 1,200 லிட்டருக்கு மேல் குடிநீர் வீணாவதோடு, போக்குவரத்து நிறைந்த பிரதான சாலையில் தார் அஸ்திவாரம் சேதமடையும் அபாயம் உள்ளது.',
    department_en: 'Water & Sewerage Board',
    department_ta: 'குடிநீர் மற்றும் கழிவுநீர் வாரியம்',
    sub_team_en: 'Emergency Water Pipeline Division 4',
    sub_team_ta: 'அவசர குடிநீர் குழாய் பிரிவு 4',
    assigned_crew_en: 'Field Team Delta (Mylapore Unit)',
    assigned_crew_ta: 'களப்பணி பிரிவு டெல்டா (மயிலாப்பூர் பிரிவு)',
    status: 'In Progress',
    ward: 'Ward 125 - Mylapore',
    ward_ta: 'வார்டு 125 - மயிலாப்பூர்',
    landmark: 'Luz Church Road near Tank Junction',
    landmark_ta: 'லஸ் சர்ச் சாலை, தெப்பக்குளம் சந்திப்பு அருகில்',
    lat: 13.0338,
    lng: 80.2676,
    created_at: '2026-11-20T08:30:00.000Z',
    updated_at: '2026-11-21T10:15:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
    multimodal: {
      hazard_detected: true,
      visual_evidence_en: 'Subsurface geyser discharging clear potable water across dual asphalt lanes; sub-base hollow detected.',
      visual_evidence_ta: 'இரட்டைத் தார்ச் சாலையில் பீறிட்டுப் பாயும் குடிநீர் ஊற்று; சாலையின் கீழ் உள்குழிவு கண்டறியப்பட்டுள்ளது.',
      safetyRisks_en: [
        'Roadbed cave-in risk under heavy bus loads',
        'Severe drinking water supply loss to 400 households',
        'Pedestrian hydroplaning and slip hazard'
      ],
      safetyRisks_ta: [
        'பேருந்துகள் செல்லும்போது சாலை திடீரென உள்வாங்கும் அபாயம்',
        '400 குடியிருப்புகளுக்கான குடிநீர் விநியோகம் துண்டிக்கப்படும் சூழல்',
        'இருசக்கர வாகனங்கள் மற்றும் பாதசாரிகள் சறுக்கி விழும் ஆபத்து'
      ],
      estimated_severity: 'Critical'
    },
    upvotes: 38,
    has_upvoted: true,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-20T08:30:00.000Z',
        note_en: 'Citizen reported sudden water geyser near temple tank via CivicResolve mobile portal.',
        note_ta: 'கோவில் குளம் அருகே திடீரென தண்ணீர் பீறிட்டுப் பாய்வதாக குடிமகன் சிவிக்ரிசால்வ் மூலம் பதிவு செய்தார்.',
        actor: 'Citizen S. Sundaram'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-20T08:30:03.000Z',
        note_en: 'Gemini 2.5 Flash identified critical drinking water pipeline hazard. Priority Score assigned: 96/100.',
        note_ta: 'ஜெமினி 2.5 ஃப்ளாஷ் அதிதீவிர குடிநீர் குழாய் ஆபத்தைக் கண்டறிந்தது. முன்னுரிமை மதிப்பெண்: 96/100.',
        actor: 'Gemini AI Engine'
      },
      {
        status: 'Assigned to Department',
        timestamp: '2026-11-20T09:10:00.000Z',
        note_en: 'Auto-routed to Chennai Metro Water Emergency Division 4; supervisor notified.',
        note_ta: 'சென்னை மெட்ரோ குடிநீர் அவசரப் பிரிவு 4-க்கு மாற்றப்பட்டு மேற்பார்வையாளருக்கு தகவல் அனுப்பப்பட்டது.',
        actor: 'Municipal Dispatcher'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-21T07:45:00.000Z',
        note_en: 'Excavation backhoe deployed on site; shut-off valve isolated; replacement ductile iron pipe delivered.',
        note_ta: 'ஜேசிபி மூலம் தோண்டும் பணி துவங்கியது; வால்வு அடைக்கப்பட்டு புதிய மாற்று இரும்புக் குழாய் கொண்டுவரப்பட்டது.',
        actor: 'Supervisor K. Ramanathan'
      }
    ]
  },
  {
    id: 'CR-2026-102',
    raw_text: 'Deep crater pothole on South Usman Road bus stop causing traffic jams and bike accidents.',
    title_en: 'Hazardous Asphalt Crater Pothole on South Usman Road',
    title_ta: 'தெற்கு உஸ்மான் சாலையில் ஆபத்தான ஆழமான பள்ளம்',
    summary_en: '3-meter wide deep pothole in primary transit corridor causing vehicle underbody damage and near accidents.',
    summary_ta: 'முக்கிய போக்குவரத்து பாதையில் 3 மீட்டர் அகல பள்ளம் ஏற்பட்டு வாகனங்கள் சேதமும் விபத்துகளும் ஏற்படுகின்றன.',
    category: 'Roads & Potholes',
    urgency: 'High',
    priority_score: 87,
    rationale_en: 'Pothole depth exceeding 14cm located directly in the deceleration lane of a major bus terminus corridor.',
    rationale_ta: 'பேருந்து நிறுத்தம் வரும் பிரதான வழித்தடத்தில் 14 செ.மீட்டருக்கும் அதிக ஆழமுள்ள பள்ளம் விபத்து அபாயத்தை ஏற்படுத்துகிறது.',
    department_en: 'Municipal Roads & Bridges',
    department_ta: 'நகராட்சி சாலைகள் & பாலங்கள் துறை',
    sub_team_en: 'Asphalt & Pavement Quick-Response Crew',
    sub_team_ta: 'தார்ச் சாலை விரைவு நடவடிக்கை குழு',
    assigned_crew_en: 'Zone 10 Road Repair Unit 2',
    assigned_crew_ta: 'மண்டலம் 10 சாலை சீரமைப்பு பிரிவு 2',
    status: 'Assigned to Department',
    ward: 'Ward 114 - T. Nagar',
    ward_ta: 'வார்டு 114 - தி. நகர்',
    landmark: 'Opposite GRT Jewellers, South Usman Road',
    landmark_ta: 'ஜிஆர்டி எதிரில், தெற்கு உஸ்மான் சாலை',
    lat: 13.0418,
    lng: 80.2341,
    created_at: '2026-11-20T14:15:00.000Z',
    updated_at: '2026-11-21T09:30:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    multimodal: {
      hazard_detected: true,
      visual_evidence_en: 'Jagged edge crater with exposed aggregate; water ponding obscuring depth to night drivers.',
      visual_evidence_ta: 'கூர்மையான தார் விளிம்புகள் மற்றும் நீர் தேங்கியுள்ளதால் இரவில் பள்ளத்தின் ஆழம் தெரியாத நிலை.',
      safetyRisks_en: [
        'Two-wheeler skid causing head injury risk',
        'Bus axle damage resulting in lane choke'
      ],
      safetyRisks_ta: [
        'இருசக்கர வாகனங்கள் சறுக்கி தலைக்காயம் ஏற்படும் அபாயம்',
        'பேருந்து அச்சு முறிந்து போக்குவரத்து முற்றிலும் முடங்கும் அபாயம்'
      ],
      estimated_severity: 'High'
    },
    upvotes: 46,
    has_upvoted: false,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-20T14:15:00.000Z',
        note_en: 'Logged via voice-to-text intake in Tamil by resident.',
        note_ta: 'குடியிருப்பாளர் மூலம் தமிழில் குரல் வழி பதிவு செய்யப்பட்டது.',
        actor: 'Citizen Priya M.'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-20T14:15:02.000Z',
        note_en: 'Gemini detected high-frequency traffic corridor. Priority boosted to 87.',
        note_ta: 'அதிக போக்குவரத்து பகுதி என ஜெமினி கண்டறிந்து முன்னுரிமை 87-ஆக உயர்த்தப்பட்டது.',
        actor: 'Gemini AI Engine'
      },
      {
        status: 'Assigned to Department',
        timestamp: '2026-11-21T09:30:00.000Z',
        note_en: 'Dispatched to Night-shift Bitumen Paving Squad for cold-mix filling.',
        note_ta: 'இரவு நேர தார் போடும் குழுவிற்கு சீரமைக்க பணி ஆணை பிறப்பிக்கப்பட்டது.',
        actor: 'Zone 10 Road Engineer'
      }
    ]
  },
  {
    id: 'CR-2026-103',
    raw_text: 'Four municipal waste bins overflowing into street blocking sidewalk at Adyar 4th cross road.',
    title_en: 'Severe Waste Bin Overflow & Pedestrian Blockade',
    title_ta: 'அடையாற்றில் குப்பைத் தொட்டி நிரம்பி வழிதல் மற்றும் நடைபாதை அடைப்பு',
    summary_en: 'Multiple solid waste bins overflowing for 4 consecutive days with animal scavengers scattering garbage.',
    summary_ta: 'தொடர்ந்து 4 நாட்களாக குப்பைத் தொட்டிகள் அள்ளப்படாமல் விலங்குகள் கழிவுகளை சிதறடித்துள்ளன.',
    category: 'Sanitation & Waste',
    urgency: 'Medium',
    priority_score: 58,
    rationale_en: 'Sanitation hazard with bio-waste leachate near a nursery school, causing vector disease concerns.',
    rationale_ta: 'மழலையர் பள்ளி அருகில் உள்ளதால் கொசு மற்றும் நோய்த்தொற்று பரவும் சுகாதார சீர்கேடு.',
    department_en: 'Solid Waste Management',
    department_ta: 'திடக்கழிவு மேலாண்மைத் துறை',
    sub_team_en: 'Urvaser SWM Conservancy Ward 172',
    sub_team_ta: 'தூய்மைப்பணி பிரிவு வார்டு 172',
    assigned_crew_en: 'Compactor Truck Unit 14',
    assigned_crew_ta: 'குப்பை அள்ளும் கனரக வாகனம் 14',
    status: 'AI Triaged & Routed',
    ward: 'Ward 172 - Adyar',
    ward_ta: 'வார்டு 172 - அடையாறு',
    landmark: 'Behind Adyar Bus Depot, 4th Cross Road',
    landmark_ta: 'அடையாறு பணிமனை பின்புறம், 4வது குறுக்குத் தெரு',
    lat: 13.0064,
    lng: 80.2575,
    created_at: '2026-11-21T06:00:00.000Z',
    updated_at: '2026-11-21T06:00:04.000Z',
    photo_url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80',
    multimodal: {
      hazard_detected: true,
      visual_evidence_en: 'Plastic and food waste spillover extending 4 meters beyond bin perimeter onto walking curb.',
      visual_evidence_ta: 'தொட்டியைத் தாண்டி 4 மீட்டர் தூரத்திற்கு நடைபாதையில் பரவியுள்ள நெகிழி மற்றும் உணவுக் கழிவுகள்.',
      safetyRisks_en: [
        'Vector-borne bacterial contamination risk',
        'Pedestrians forced onto motorized traffic lane'
      ],
      safetyRisks_ta: [
        'கொசுக்கள் மூலம் பரவும் காய்ச்சல் மற்றும் தொற்றுநோய் அபாயம்',
        'பாதசாரிகள் சாலையில் இறங்கி நடக்க நேரிடுவதால் வாகன மோதல் அபாயம்'
      ],
      estimated_severity: 'Medium'
    },
    upvotes: 21,
    has_upvoted: false,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-21T06:00:00.000Z',
        note_en: 'Citizen reported via photo intake.',
        note_ta: 'குடிமகன் புகைப்படத்துடன் புகார் பதிவு செய்தார்.',
        actor: 'Citizen A. Karthik'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-21T06:00:04.000Z',
        note_en: 'Gemini detected solid waste backlog; scheduled for morning clearance run.',
        note_ta: 'ஜெமினி திடக்கழிவு தேக்கத்தைக் கண்டறிந்து காலை வாகனப் பிரிவிற்கு பரிந்துரைத்தது.',
        actor: 'Gemini AI Engine'
      }
    ]
  },
  {
    id: 'CR-2026-104',
    raw_text: 'Completely dark streetlights cluster on 2nd Avenue Anna Nagar across 300 meters near tower park.',
    title_en: '300m Complete Blackout Corridor on Anna Nagar 2nd Avenue',
    title_ta: 'அண்ணா நகர் 2வது அவென்யூவில் 300 மீ தொலைவிற்கு முழு தெருவிளக்கு மின்தடை',
    summary_en: '5 consecutive feeder-pillar streetlights inactive, creating complete darkness and safety vulnerability.',
    summary_ta: '5 தெருவிளக்குகள் எரியாததால் அப்பகுதி முழுவதும் இருண்டு பெண்கள் மற்றும் முதியோருக்கு பாதுகாப்பற்ற சூழல் நிலவுகிறது.',
    category: 'Streetlights & Electrical',
    urgency: 'High',
    priority_score: 79,
    rationale_en: 'Substantial dark corridor adjacent to public recreational park and bus feeder route.',
    rationale_ta: 'பொது பூங்கா மற்றும் பேருந்து நிறுத்தம் அருகில் தொடர்ந்து 300 மீட்டர் தூரம் இருட்டாக இருப்பதால் பாதுகாப்பு அபாயம்.',
    department_en: 'Electrical Maintenance',
    department_ta: 'மின் பராமரிப்புத் துறை',
    sub_team_en: 'Zone 8 Street Lighting Operations',
    sub_team_ta: 'மண்டலம் 8 தெருவிளக்கு பராமரிப்பு பிரிவு',
    assigned_crew_en: 'TANGEDCO Mobile Hydraulic Lifter #3',
    assigned_crew_ta: 'ஹைட்ராலிக் மின்தூக்கி வாகனக் குழு #3',
    status: 'In Progress',
    ward: 'Ward 102 - Anna Nagar',
    ward_ta: 'வார்டு 102 - அண்ணா நகர்',
    landmark: 'Opposite Tower Park, 2nd Avenue',
    landmark_ta: 'டவர் பூங்கா எதிரில், 2வது அவென்யூ',
    lat: 13.0850,
    lng: 80.2101,
    created_at: '2026-11-19T19:40:00.000Z',
    updated_at: '2026-11-21T08:20:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    multimodal: {
      hazard_detected: true,
      visual_evidence_en: 'Unilluminated luminaire poles over unlit pedestrian sidewalks and intersections.',
      visual_evidence_ta: 'நடைபாதை மற்றும் சந்திப்புப் பகுதிகளில் எரியாத தெருவிளக்கு கம்பங்கள்.',
      safetyRisks_en: [
        'Heightened risk of street crime and harassment',
        'Poor pedestrian visibility to high-speed vehicular turns'
      ],
      safetyRisks_ta: [
        'இரவு நேரக் குற்றங்கள் மற்றும் அசம்பாவிதங்கள் நிகழும் அபாயம்',
        'வாகன ஓட்டிகளுக்கு பாதசாரிகள் தென்படாமல் மோதும் ஆபத்து'
      ],
      estimated_severity: 'High'
    },
    upvotes: 52,
    has_upvoted: true,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-19T19:40:00.000Z',
        note_en: 'Resident Association representative filed ticket.',
        note_ta: 'குடியிருப்போர் நலச் சங்கப் பிரதிநிதி புகார் அளித்தார்.',
        actor: 'Citizen R. Meenakshi'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-19T19:40:03.000Z',
        note_en: 'Gemini flagged public safety risk on main thoroughfare. Priority: 79.',
        note_ta: 'ஜெமினி பொதுப் பாதுகாப்பு அபாயத்தைக் குறித்து முன்னுரிமை 79 என நிர்ணயித்தது.',
        actor: 'Gemini AI Engine'
      },
      {
        status: 'Assigned to Department',
        timestamp: '2026-11-20T10:00:00.000Z',
        note_en: 'Assigned to Electrical maintenance team for fuse & cable inspection.',
        note_ta: 'மின் வயர் மற்றும் ஃப்யூஸ் பரிசோதனைக்காக மின்துறைக்கு ஒதுக்கப்பட்டது.',
        actor: 'Zone 8 Duty Officer'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-21T08:20:00.000Z',
        note_en: 'Hydraulic truck on site; shorted MCB breaker replaced, 3 of 5 luminaires restored.',
        note_ta: 'ஹைட்ராலிக் வாகனம் மூலம் பழுது பார்க்கும் பணி தீவிரம்; 3 விளக்குகள் எரிய வைக்கப்பட்டுள்ளன.',
        actor: 'Lineman S. Balan'
      }
    ]
  },
  {
    id: 'CR-2026-105',
    raw_text: 'Fallen neem tree branch partially blocking two-wheeler lane on Luz Church road corner.',
    title_en: 'Overhanging Broken Tree Limb Blocking Bike Lane',
    title_ta: 'லஸ் சர்ச் சாலையில் இருசக்கர வாகன பாதையை அடைக்கும் மரக்கிளை',
    summary_en: 'Heavy storm-damaged branch hanging dangerously low over commuter lane.',
    summary_ta: 'மழைக் காற்றில் முறிந்த மரக்கிளை தாழ்வாகத் தொங்கி இருசக்கர வாகன ஓட்டிகளுக்கு இடையூறாக உள்ளது.',
    category: 'Public Safety / Other',
    urgency: 'Medium',
    priority_score: 48,
    rationale_en: 'Obstructing single motorcycle lane; no live high-tension electrical cables involved.',
    rationale_ta: 'மோட்டார் சைக்கிள் பாதையை அடைத்துள்ளது; மின் கம்பிகள் பாதிக்கப்படவில்லை.',
    department_en: 'Public Health & Safety',
    department_ta: 'பொது சுகாதாரம் & பாதுகாப்புத் துறை',
    sub_team_en: 'Parks & Arboriculture Tree Clearance Squad',
    sub_team_ta: 'பூங்கா மற்றும் மர வெட்டுதல் மீட்புக் குழு',
    assigned_crew_en: 'Mylapore Arborist Crew 1',
    assigned_crew_ta: 'மயிலாப்பூர் மரப் பராமரிப்புப் பிரிவு 1',
    status: 'Resolved',
    ward: 'Ward 125 - Mylapore',
    ward_ta: 'வார்டு 125 - மயிலாப்பூர்',
    landmark: 'Near Luz Corner Post Office',
    landmark_ta: 'லஸ் கார்னர் தபால் நிலையம் அருகில்',
    lat: 13.0360,
    lng: 80.2640,
    created_at: '2026-11-18T11:00:00.000Z',
    updated_at: '2026-11-19T16:00:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    resolution_proof_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    resolution_notes_en: 'Branch safely trimmed with chainsaw, logs loaded into municipal truck, road surface swept clean.',
    resolution_notes_ta: 'மரக்கிளை நவீன ரம்பம் கொண்டு அகற்றப்பட்டு, மரம் லாரியில் ஏற்றப்பட்டது. சாலை முழுமையாக தூய்மை செய்யப்பட்டது.',
    upvotes: 12,
    has_upvoted: false,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-18T11:00:00.000Z',
        note_en: 'Reported by local merchant.',
        note_ta: 'உள்ளூர் வியாபாரி புகார் பதிவு செய்தார்.',
        actor: 'Citizen V. Govind'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-18T11:00:02.000Z',
        note_en: 'Triaged as Parks & Arboriculture assignment.',
        note_ta: 'பூங்கா மற்றும் மர மேலாண்மைப் பிரிவுக்கு பரிந்துரைக்கப்பட்டது.',
        actor: 'Gemini AI Engine'
      },
      {
        status: 'Assigned to Department',
        timestamp: '2026-11-18T13:30:00.000Z',
        note_en: 'Dispatched to Arborist Unit 1.',
        note_ta: 'மரப்பராமரிப்பு பிரிவு 1-க்கு பணி ஆணை வழங்கப்பட்டது.',
        actor: 'Municipal Dispatcher'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-19T14:00:00.000Z',
        note_en: 'Tree trimming team on site.',
        note_ta: 'மரத்தை வெட்டி அகற்றும் பணி துவங்கியது.',
        actor: 'Field Arborist Unit'
      },
      {
        status: 'Resolved',
        timestamp: '2026-11-19T16:00:00.000Z',
        note_en: 'Obstruction fully removed and pathway cleared. Photo proof uploaded.',
        note_ta: 'மரக்கிளை முழுமையாக அகற்றப்பட்டு சாலை சீரமைக்கப்பட்டது. ஆதாரப் படம் பதிவேற்றப்பட்டது.',
        actor: 'Supervisor M. Elango'
      }
    ]
  },
  {
    id: 'CR-2026-106',
    raw_text: 'Open sewer inspection chamber with missing concrete slab cover on Kilpauk Garden road.',
    title_en: 'Uncovered Open Manhole Chamber on Kilpauk Garden Road',
    title_ta: 'கீழ்ப்பாக்கம் கார்டன் சாலையில் மூடியில்லாத திறந்த கழிவுநீர் தொட்டி',
    summary_en: 'Cast iron cover broken and dropped into manhole; open pit poses deadly fall risk in rain.',
    summary_ta: 'கழிவுநீர் தொட்டியின் மூடி உடைந்து உள்ளே விழுந்ததால் பாதசாரிகளுக்கு உயிராபத்து விளைவிக்கும் குழி ஏற்பட்டுள்ளது.',
    category: 'Water Supply & Drainage',
    urgency: 'Critical',
    priority_score: 98,
    rationale_en: 'Open vertical drop over 8 feet depth on pedestrian sidewalk with no barricade or warning signage.',
    rationale_ta: 'எந்தவித எச்சரிக்கை பலகையும் இன்றி நடைபாதையில் 8 அடி ஆழமுள்ள திறந்த கழிவுநீர் தொட்டி உயிராபத்தை ஏற்படுத்துகிறது.',
    department_en: 'Water & Sewerage Board',
    department_ta: 'குடிநீர் மற்றும் கழிவுநீர் வாரியம்',
    sub_team_en: 'Drainage Rapid Hazard Containment',
    sub_team_ta: 'கழிவுநீர் அவசர பாதுகாப்புப் பிரிவு',
    assigned_crew_en: 'Metrowater Rapid Response Unit 6',
    assigned_crew_ta: 'மெட்ரோ குடிநீர் விரைவு மீட்புக் குழு 6',
    status: 'In Progress',
    ward: 'Ward 88 - Kilpauk',
    ward_ta: 'வார்டு 88 - கீழ்ப்பாக்கம்',
    landmark: 'Kilpauk Garden Road, Near Bhavans School',
    landmark_ta: 'கீழ்ப்பாக்கம் கார்டன் சாலை, பவன்ஸ் பள்ளி அருகில்',
    lat: 13.0827,
    lng: 80.2390,
    created_at: '2026-11-21T07:10:00.000Z',
    updated_at: '2026-11-21T09:00:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
    multimodal: {
      hazard_detected: true,
      visual_evidence_en: 'Unguarded square manhole opening directly in line with school pedestrian path.',
      visual_evidence_ta: 'பள்ளிக்குச் செல்லும் நடைபாதையில் நேராக உள்ள திறந்த கழிவுநீர் தொட்டி.',
      safetyRisks_en: [
        'Fatal drowning or fall trauma risk for school children',
        'Methane gas emission in crowded neighborhood'
      ],
      safetyRisks_ta: [
        'பள்ளிச் சிறுவர்கள் தவறி விழுந்து உயிரிழக்கும் அதிதீவிர ஆபத்து',
        'மக்கள் நடமாட்டம் உள்ள பகுதியில் மீத்தேன் வாயு வெளியேற்றம்'
      ],
      estimated_severity: 'Critical'
    },
    upvotes: 64,
    has_upvoted: true,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-21T07:10:00.000Z',
        note_en: 'Urgent citizen report with camera capture.',
        note_ta: 'குடிமகன் உடனடி எச்சரிக்கை புகாரைப் படத்துடன் அளித்தார்.',
        actor: 'Citizen T. Natarajan'
      },
      {
        status: 'AI Triaged & Routed',
        timestamp: '2026-11-21T07:10:02.000Z',
        note_en: 'Gemini detected lethal fall hazard. Automated Priority Score: 98/100.',
        note_ta: 'ஜெமினி உயிராபத்து ஏற்படுத்தும் குழியைக் கண்டறிந்தது. முன்னுரிமை: 98/100.',
        actor: 'Gemini AI Engine'
      },
      {
        status: 'Assigned to Department',
        timestamp: '2026-11-21T07:25:00.000Z',
        note_en: 'Emergency barricading team deployed immediately with reinforced composite cover.',
        note_ta: 'உடனடி பாதுகாப்பு தடுப்புகள் மற்றும் புதிய கான்கிரீட் மூடியுடன் குழு விரைந்தது.',
        actor: 'Central Operations Desk'
      },
      {
        status: 'In Progress',
        timestamp: '2026-11-21T09:00:00.000Z',
        note_en: 'Warning cones and barricades installed; heavy-duty SFRC cover being fitted.',
        note_ta: 'எச்சரிக்கை தடுப்புகள் வைக்கப்பட்டு புதிய கனரக மூடி பொருத்தும் பணி நடக்கிறது.',
        actor: 'Supervisor J. Saravanan'
      }
    ]
  },
  {
    id: 'CR-2026-107',
    raw_text: 'Cracked paving stones on pedestrian walkway near Velachery station causing elderly falls.',
    title_en: 'Damaged Tactile Pavement Pavers at Velachery Station',
    title_ta: 'வேளச்சேரி ரயில் நிலையம் அருகில் உடைந்த நடைபாதை கற்கள்',
    summary_en: 'Multiple broken paving blocks along the transit walkway causing tripping hazards for commuters.',
    summary_ta: 'நடைபாதைக் கற்கள் பெயர்ந்து உள்ளதால் முதியவர்கள் மற்றும் பொதுமக்கள் தடுமாறி விழும் சூழல் உள்ளது.',
    category: 'Roads & Potholes',
    urgency: 'Low',
    priority_score: 32,
    rationale_en: 'Localized surface unevenness on pedestrian sidewalk without vehicular collision risk.',
    rationale_ta: 'வாகன விபத்து அபாயம் இல்லாத சிறிய அளவிலான நடைபாதை சீரமைப்பு குறைபாடு.',
    department_en: 'Municipal Roads & Bridges',
    department_ta: 'நகராட்சி சாலைகள் & பாலங்கள் துறை',
    sub_team_en: 'Sidewalk & Pedestrian Infrastructure',
    sub_team_ta: 'நடைபாதை மற்றும் பாதசாரி கட்டமைப்பு பிரிவு',
    status: 'Submitted',
    ward: 'Ward 138 - Velachery',
    ward_ta: 'வார்டு 138 - வேளச்சேரி',
    landmark: 'Velachery MRTS Station Entrance',
    landmark_ta: 'வேளச்சேரி பறக்கும் ரயில் நிலைய வாசல்',
    lat: 12.9774,
    lng: 80.2198,
    created_at: '2026-11-21T11:20:00.000Z',
    updated_at: '2026-11-21T11:20:00.000Z',
    photo_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    upvotes: 5,
    has_upvoted: false,
    timeline: [
      {
        status: 'Submitted',
        timestamp: '2026-11-21T11:20:00.000Z',
        note_en: 'Reported by commuter via web portal.',
        note_ta: 'பயணி இணையதளம் வாயிலாக புகார் செய்தார்.',
        actor: 'Citizen D. Jayashree'
      }
    ]
  }
];

export const WARDS_LIST = [
  { id: 'Ward 114 - T. Nagar', name_en: 'Ward 114 - T. Nagar', name_ta: 'வார்டு 114 - தி. நகர்', lat: 13.0418, lng: 80.2341 },
  { id: 'Ward 172 - Adyar', name_en: 'Ward 172 - Adyar', name_ta: 'வார்டு 172 - அடையாறு', lat: 13.0064, lng: 80.2575 },
  { id: 'Ward 102 - Anna Nagar', name_en: 'Ward 102 - Anna Nagar', name_ta: 'வார்டு 102 - அண்ணா நகர்', lat: 13.0850, lng: 80.2101 },
  { id: 'Ward 125 - Mylapore', name_en: 'Ward 125 - Mylapore', name_ta: 'வார்டு 125 - மயிலாப்பூர்', lat: 13.0338, lng: 80.2676 },
  { id: 'Ward 88 - Kilpauk', name_en: 'Ward 88 - Kilpauk', name_ta: 'வார்டு 88 - கீழ்ப்பாக்கம்', lat: 13.0827, lng: 80.2390 },
  { id: 'Ward 138 - Velachery', name_en: 'Ward 138 - Velachery', name_ta: 'வார்டு 138 - வேளச்சேரி', lat: 12.9774, lng: 80.2198 },
  { id: 'Ward 110 - Kodambakkam', name_en: 'Ward 110 - Kodambakkam', name_ta: 'வார்டு 110 - கோடம்பாக்கம்', lat: 13.0520, lng: 80.2250 },
  { id: 'Ward 116 - Royapettah', name_en: 'Ward 116 - Royapettah', name_ta: 'வார்டு 116 - ராயப்பேட்டை', lat: 13.0550, lng: 80.2620 }
];

export const MUNICIPAL_CREWS = [
  { id: 'crew-road-1', name_en: 'Bitumen Rapid Response Crew #1', name_ta: 'தார்ச் சாலை விரைவு நடவடிக்கை குழு #1', dept: 'Municipal Roads & Bridges' },
  { id: 'crew-road-2', name_en: 'Zone 10 Road Repair Unit 2', name_ta: 'மண்டலம் 10 சாலை சீரமைப்பு பிரிவு 2', dept: 'Municipal Roads & Bridges' },
  { id: 'crew-swm-1', name_en: 'Compactor Truck Unit 14 (SWM)', name_ta: 'குப்பை அள்ளும் கனரக வாகனம் 14', dept: 'Solid Waste Management' },
  { id: 'crew-swm-2', name_en: 'Conservancy Sanitation Squad B', name_ta: 'துப்புரவு களப்பணி அணி பி', dept: 'Solid Waste Management' },
  { id: 'crew-elec-1', name_en: 'TANGEDCO Mobile Hydraulic Lifter #3', name_ta: 'ஹைட்ராலிக் மின்தூக்கி வாகனக் குழு #3', dept: 'Electrical Maintenance' },
  { id: 'crew-water-1', name_en: 'Emergency Water Pipeline Division 4', name_ta: 'அவசர குடிநீர் குழாய் பிரிவு 4', dept: 'Water & Sewerage Board' },
  { id: 'crew-water-2', name_en: 'Metrowater Rapid Response Unit 6', name_ta: 'மெட்ரோ குடிநீர் விரைவு மீட்புக் குழு 6', dept: 'Water & Sewerage Board' },
  { id: 'crew-health-1', name_en: 'Parks & Arboriculture Clearance Squad', name_ta: 'பூங்கா மற்றும் மர வெட்டுதல் மீட்புக் குழு', dept: 'Public Health & Safety' }
];
