import { useState } from "react";

const data = {
  northStar: "Every person in the UK can see a credible path between where they are and where they want to be — and knows their next step",
  outcomes: [
    {
      id: "out1",
      type: "Leading",
      label: "Engagement Quality",
      text: "Citizens leave each interaction with greater clarity about their skills, options, or next step",
      metric: "Post-session self-reported clarity score + return visit rate + session depth",
      color: "#1d6fa4",
    },
    {
      id: "out2",
      type: "Lagging",
      label: "Economic Impact",
      text: "Citizens make faster, more confident career decisions after engaging with the service",
      metric: "% completing a career decision action (application, training enrolment, pivot) within 90 days",
      color: "#0A2540",
    },
  ],
  opportunities: [
    {
      id: "opp1",
      label: "Opportunity 1",
      text: "People can't accurately articulate what skills they have",
      subtext: "Especially those without traditional CVs — carers, ex-military, graduates",
      subOpportunities: [
        { id: "sub1a", text: "People with no work history have no starting point at all" },
        { id: "sub1b", text: "People undervalue or can't name informal and caring experience as skills" },
        { id: "sub1c", text: "People use vague language that employers don't recognise or search for" },
      ],
      solutions: [
        {
          id: "sol1a",
          text: "Skills Mirror — conversational tool that interviews life experience and reflects back a SSC-mapped skills profile",
          assumption: "People will trust an AI reflection of their skills enough to act on it",
          experiment: "Run 20-question prototype with 10 users. Does output feel accurate? Would they share it with an employer? Score self-reported vs tool-generated alignment.",
        },
        {
          id: "sol1b",
          text: "CV or work history parser — import existing document, extract and structure against SSC taxonomy automatically",
          assumption: "A CV contains enough signal to derive a meaningful structured skills profile without a conversation",
          experiment: "Parse 20 real CVs. Does structured output match >80% of skills a human assessor would identify?",
        },
      ],
    },
    {
      id: "opp2",
      label: "Opportunity 2",
      text: "Career pivots feel vague, risky, and impossible to plan",
      subtext: "People don't know how far they actually are from a target role or what the real gap is",
      subOpportunities: [
        { id: "sub2a", text: "No visibility of which specific skills are missing vs already held" },
        { id: "sub2b", text: "Retraining options feel like a gamble with no evidence of payoff" },
        { id: "sub2c", text: "Local job availability is unknown when considering a pivot" },
      ],
      solutions: [
        {
          id: "sol2a",
          text: "Career Distance Calculator — shows skill overlap between current and target occupation using SSC profiles, with specific gap breakdown",
          assumption: "Seeing a concrete skills gap feels motivating and actionable, not discouraging",
          experiment: "Show 10 users their distance to 3 target roles. Measure intent-to-act before and after. Does it feel credible?",
        },
        {
          id: "sol2b",
          text: "Retraining ROI tool — maps a qualification to skills it develops vs skills still missing for a target role",
          assumption: "Citizens will change retraining decisions if shown evidence of skills coverage vs cost",
          experiment: "Test with 5 common Level 3 courses. Do users feel better equipped to decide vs a control group browsing Find a Course?",
        },
      ],
    },
    {
      id: "opp3",
      label: "Opportunity 3",
      text: "People don't know what support exists or when to access it",
      subtext: "Entry point to services is confusing — especially at major life transition moments",
      subOpportunities: [
        { id: "sub3a", text: "Different life events need completely different journeys but land on the same generic page" },
        { id: "sub3b", text: "People who disengage don't receive relevant prompts to return" },
      ],
      solutions: [
        {
          id: "sol3a",
          text: "Life Event Career Companion — context-aware entry point wrapping tools and support around the specific situation (redundancy, maternity return, ex-military, long-term carer)",
          assumption: "Framing the service around a life event rather than a job search task meaningfully increases engagement",
          experiment: "Map 5 life event journeys. Test with real users in each situation — does the path feel relevant vs generic job search?",
        },
        {
          id: "sol3b",
          text: "Re-engagement nudge system — proactive outreach to dropped-off users surfacing the most relevant next action based on profile stage",
          assumption: "Users who dropped off are reachable and will return if the nudge feels personally relevant",
          experiment: "A/B test nudge on chatbot drop-off cohort. Measure return rate and subsequent session depth vs control.",
        },
      ],
    },
    {
      id: "opp4",
      label: "Opportunity 4",
      text: "Interview preparation is generic and doesn't reflect the actual role",
      subtext: "Standard tools don't account for the specific JD, sector, or employer type",
      subOpportunities: [
        { id: "sub4a", text: "Generic questions don't reflect what a specific employer is actually assessing" },
        { id: "sub4b", text: "Feedback doesn't help users understand what 'good' looks like in their sector" },
      ],
      solutions: [
        {
          id: "sol4a",
          text: "JD-aware Interview Simulator — paste a job description, get questions mapped to the SSC skills profile of that role with calibrated feedback",
          assumption: "JD-specific questions feel meaningfully more useful than generic ones — enough to change preparation behaviour",
          experiment: "Compare user-rated relevance of JD-aware vs generic questions across 3 sectors. Does it feel like the real thing?",
        },
        {
          id: "sol4b",
          text: "Sector-specific feedback calibration — different scoring rubrics for creative, technical, and public sector interviews",
          assumption: "What 'good' looks like varies enough between sectors that generic feedback actively misleads candidates",
          experiment: "Shadow real interviews in 2 sectors. Map themes against SSC core skills. Does automated feedback match what real interviewers care about?",
        },
      ],
    },
    {
      id: "opp5",
      label: "Opportunity 5",
      text: "Citizens and employers operate on fundamentally different information",
      subtext: "Citizens retrain for skills nobody is hiring; employers can't find people with the right skills",
      subOpportunities: [
        { id: "sub5a", text: "Citizens have no forward-looking view of which skills will be in demand locally" },
        { id: "sub5b", text: "Employers (especially SMEs) write vague JDs that attract the wrong candidates" },
      ],
      solutions: [
        {
          id: "sol5a",
          text: "Local skills demand signal — 'employers in your area are hiring for X in the next 6 months' — forward-looking, SSC-mapped, location-personalised",
          assumption: "Forward-looking demand signals will change retraining intent if citizens trust the source",
          experiment: "Show 20 users a forward demand signal for their area. Does it change stated retraining intent? Does it feel trustworthy?",
        },
        {
          id: "sol5b",
          text: "Employer JD quality tool — helps SMEs write skills-first job descriptions in SSC language to improve candidate matching",
          assumption: "SSC-aligned JDs will generate more relevant applicants than unstructured ones",
          experiment: "Rewrite 10 live JDs. Does the SSC-aligned version improve application-to-interview conversion rate?",
        },
      ],
    },
    {
      id: "opp6",
      label: "Opportunity 6 · Youth Focus",
      text: "Young people are disengaged from employment — and employers think they lack skills",
      subtext: "A two-sided perception gap rooted in structural failure, not individual failing — Milburn Report, May 2026",
      isYouth: true,
      subOpportunities: [
        { id: "sub6a", text: "Young people have never had a job and don't know where to start — 6 in 10 NEETs have never worked" },
        { id: "sub6b", text: "Mental health and anxiety make traditional job search tools feel overwhelming or alienating" },
        { id: "sub6c", text: "Young carers have substantial invisible skills with no language to articulate them to employers" },
        { id: "sub6d", text: "Employers perceive young people as lacking skills — but the real gap is in communication of skills, not the skills themselves" },
        { id: "sub6e", text: "Entry-level roles have declined, making the first job structurally harder to access regardless of attitude" },
      ],
      solutions: [
        {
          id: "sol6a",
          text: "First Steps Journey — a zero-pressure, conversational onboarding designed for someone who has never worked. No CV required. Explores interests, strengths, and values before anything else",
          assumption: "Young NEETs will engage longer with a tool that doesn't ask for work history upfront or feel like a form",
          experiment: "A/B test: standard chatbot entry vs First Steps framing with 16-24 year old users. Measure session length, return rate, and self-reported comfort score.",
        },
        {
          id: "sol6b",
          text: "Youth Skills Translator — specifically maps informal youth experience (volunteering, sport, gaming, caring, side projects) to SSC-recognised skills and employer language",
          assumption: "Young people have more employer-relevant skills than they or employers realise — the gap is in translation, not substance",
          experiment: "Run with 20 young people aged 16-24. Do employers rate the output profiles as credible? Do young people feel the output represents them accurately?",
        },
        {
          id: "sol6c",
          text: "Employer perception bridge — shows employers what SSC skills a young applicant actually has, not just what their CV says. Reframes the conversation from 'experience' to 'capability'",
          assumption: "Employers will change hiring decisions when shown structured skills evidence vs a thin CV",
          experiment: "Show 10 SME employers matched skills profiles vs standard CVs for the same candidate. Do they rate the skills-profile candidate as more hireable?",
        },
      ],
    },
  ],
};

const STATUS = ["hypothesis", "in discovery", "validated", "deprioritised"];
const STATUS_COLORS = {
  hypothesis: "#94a3b8",
  "in discovery": "#f59e0b",
  validated: "#10b981",
  deprioritised: "#ef4444",
};

function Tag({ status, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: STATUS_COLORS[status] + "22",
      color: STATUS_COLORS[status],
      border: `1px solid ${STATUS_COLORS[status]}55`,
      borderRadius: 4, fontSize: 10,
      fontFamily: "'DM Mono', monospace",
      padding: "2px 7px", cursor: "pointer",
      letterSpacing: 1, textTransform: "uppercase", fontWeight: 600,
    }}>
      {status}
    </button>
  );
}

function SolutionCard({ solution }) {
  const [status, setStatus] = useState("hypothesis");
  const [expanded, setExpanded] = useState(false);
  const cycleStatus = (e) => { e.stopPropagation(); setStatus(STATUS[(STATUS.indexOf(status) + 1) % STATUS.length]); };

  return (
    <div onClick={() => setExpanded(!expanded)} style={{
      background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
      padding: "12px 14px", marginBottom: 8, cursor: "pointer",
      boxShadow: expanded ? "0 4px 16px rgba(10,37,64,0.08)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#1e293b", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55, flex: 1 }}>
          {solution.text}
        </p>
        <Tag status={status} onClick={cycleStatus} />
      </div>
      {!expanded && <p style={{ margin: "6px 0 0", fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>click to expand</p>}
      {expanded && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 6, padding: "9px 12px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#c2410c", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 3 }}>⚠ Assumption</span>
            <p style={{ margin: 0, fontSize: 12, color: "#7c2d12", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{solution.assumption}</p>
          </div>
          <div style={{ background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 6, padding: "9px 12px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 3 }}>🧪 Experiment</span>
            <p style={{ margin: 0, fontSize: 12, color: "#475569", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{solution.experiment}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function OpportunityCard({ opp, index }) {
  const [open, setOpen] = useState(true);
  const [showSubs, setShowSubs] = useState(false);
  const accents = ["#0A2540", "#1d6fa4", "#0d7377", "#c2410c", "#7c3aed", "#b45309"];
  const accent = opp.isYouth ? "#b45309" : accents[index % accents.length];

  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${opp.isYouth ? "#fde68a" : "#e2e8f0"}`,
      borderTop: `3px solid ${accent}`,
      borderRadius: 10, padding: 16,
      flex: "1 1 300px", minWidth: 280, maxWidth: 400,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: accent, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>
          {opp.label}
        </span>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16, padding: 0 }}>
          {open ? "−" : "+"}
        </button>
      </div>

      {opp.isYouth && (
        <span style={{ display: "inline-block", background: "#fef3c7", color: "#92400e", fontSize: 10, fontFamily: "'DM Mono', monospace", padding: "2px 8px", borderRadius: 4, marginBottom: 6, letterSpacing: 1 }}>
          MILBURN REPORT · HIGH PRIORITY
        </span>
      )}

      <p style={{ margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.45 }}>{opp.text}</p>
      <p style={{ margin: "0 0 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{opp.subtext}</p>

      {open && (
        <>
          {opp.subOpportunities && (
            <div style={{ marginBottom: 12 }}>
              <button onClick={() => setShowSubs(!showSubs)} style={{
                background: "none", border: "1px solid #e2e8f0", borderRadius: 6,
                padding: "5px 10px", cursor: "pointer", fontSize: 11,
                fontFamily: "'DM Mono', monospace", color: "#64748b", marginBottom: showSubs ? 8 : 0,
              }}>
                {showSubs ? "▾" : "▸"} {opp.subOpportunities.length} sub-opportunities
              </button>
              {showSubs && (
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {opp.subOpportunities.map(sub => (
                    <div key={sub.id} style={{
                      background: "#f8fafc", borderLeft: `2px solid ${accent}`,
                      borderRadius: "0 6px 6px 0", padding: "7px 10px",
                      fontSize: 12, color: "#475569", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5,
                    }}>
                      {sub.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#94a3b8", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px" }}>
            Solutions
          </p>
          {opp.solutions.map(s => <SolutionCard key={s.id} solution={s} />)}
        </>
      )}
    </div>
  );
}

export default function OST() {
  const [note, setNote] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", padding: "32px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#64748b" }}>
            Jobs & Careers Service · Product Discovery
          </span>
        </div>
        <h1 style={{ margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: "#0A2540", letterSpacing: -0.5 }}>
          Opportunity Solution Tree
        </h1>
        <p style={{ margin: "0 0 28px", color: "#64748b", fontSize: 14 }}>
          Teresa Torres · Continuous Discovery Habits · Click solutions to reveal assumptions + experiments · Click status tags to cycle
        </p>

        {/* North Star */}
        <div style={{ background: "linear-gradient(135deg, #0A2540 0%, #1d4ed8 100%)", borderRadius: 12, padding: "20px 24px", marginBottom: 12, textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#93c5fd", display: "block", marginBottom: 8 }}>
            ★ North Star
          </span>
          <p style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.5, maxWidth: 700, margin: "0 auto" }}>
            {data.northStar}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", height: 20, alignItems: "center" }}>
          <div style={{ width: 2, height: "100%", background: "#cbd5e1" }} />
        </div>

        {/* Dual outcomes */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          {data.outcomes.map(out => (
            <div key={out.id} style={{
              flex: 1, minWidth: 260,
              background: out.color, borderRadius: 10, padding: "16px 20px",
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#93c5fd" }}>
                  {out.type} indicator
                </span>
                <span style={{ background: "#ffffff22", color: "#e2e8f0", fontSize: 10, fontFamily: "'DM Mono', monospace", padding: "1px 7px", borderRadius: 4, letterSpacing: 1 }}>
                  {out.label}
                </span>
              </div>
              <p style={{ margin: "0 0 8px", color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{out.text}</p>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 11, fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>{out.metric}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", height: 20, alignItems: "center", marginBottom: 4 }}>
          <div style={{ width: 2, height: "100%", background: "#cbd5e1" }} />
        </div>

        {/* Torres note */}
        <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 12, color: "#92400e" }}>
          <strong>Torres principle:</strong> Opportunities are user needs discovered through research — not assumed. Cards below are hypotheses until validated. Click sub-opportunities to see the nested problem space.
        </div>

        {/* Opportunity grid */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
          {data.opportunities.map((opp, i) => <OpportunityCard key={opp.id} opp={opp} index={i} />)}
        </div>

        {/* Legend */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 20px", display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Status:</span>
          {STATUS.map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[s] }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569", textTransform: "capitalize" }}>{s}</span>
            </div>
          ))}
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#94a3b8", marginLeft: "auto" }}>Click a status tag on any solution to cycle through</span>
        </div>

        {/* Notes */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 8px" }}>Discovery notes</p>
          <textarea
            value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Add notes from user interviews, emerging opportunities, or decisions made here…"
            style={{ width: "100%", minHeight: 80, border: "1px solid #e2e8f0", borderRadius: 6, padding: "10px 12px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#1e293b", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#f8fafc" }}
          />
        </div>
      </div>
    </div>
  );
}
