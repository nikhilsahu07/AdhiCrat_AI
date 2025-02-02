export const TEMPLATES = {
    public: [
      {
        id: "policy_announcement",
        name: "Policy Announcement",
        prompt:
          "Create a formal policy announcement speech with clear directives and implementation guidelines",
      },
      {
        id: "public_address",
        name: "Public Address",
        prompt:
          "Generate an official public address focusing on government initiatives and public welfare",
      },
      {
        id: "inaugural_speech",
        name: "Inaugural Speech",
        prompt:
          "Develop an inaugural speech highlighting vision, objectives, and strategic plans",
      },
    ],
    private: [
      {
        id: "department_brief",
        name: "Departmental Briefing",
        prompt:
          "Create a comprehensive departmental briefing covering progress, challenges, and action items",
      },
      {
        id: "committee_address",
        name: "Committee Address",
        prompt:
          "Prepare a formal committee address discussing policy implications and recommendations",
      },
      {
        id: "executive_summary",
        name: "Executive Summary",
        prompt:
          "Generate an executive summary presentation with key findings and strategic recommendations",
      },
    ],
};
  
export const AUDIENCE_TYPES = [
    { value: "ministers", label: "Cabinet Ministers" },
    { value: "secretaries", label: "Department Secretaries" },
    { value: "public", label: "General Public" },
    { value: "stakeholders", label: "Stakeholders" },
    { value: "committee", label: "Committee Members" },
    { value: "department", label: "Department Staff" },
  ];