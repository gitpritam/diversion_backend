export const prompt = (user_idea: string) => {
  return `You are a senior software architect and cloud solutions expert.

A user wants to build the following project:

${user_idea}

Your task is to generate a complete structured project analysis in JSON format only.

Return strictly valid JSON. Do not include explanation or markdown.

The JSON must follow this exact structure:

{
  "project_name": "",
  "srs": {
    "overview": "",
    "target_users": "",
    "functional_requirements": [],
    "non_functional_requirements": []
  },
  "system_design": {
    "architecture_type": "monolith | microservices | serverless",
    "components": [
      {
        "id": "",
        "name": "",
        "description": "",
        "type": "frontend | backend | database | cache | queue | external_service"
      }
    ],
    "connections": [
      {
        "source": "",
        "target": "",
        "interaction": ""
      }
    ]
  },
  "workflow": {
    "steps": [
      {
        "id": "",
        "name": "",
        "description": ""
      }
    ],
    "transitions": [
      {
        "from": "",
        "to": ""
      }
    ]
  },
  "cloud_estimation": {
    "recommended_provider": "AWS | GCP | Azure",
    "estimated_monthly_users": 0,
    "services": [
      {
        "service_name": "",
        "purpose": "",
        "estimated_monthly_cost_usd": 0
      }
    ],
    "total_estimated_monthly_cost_usd": 0
  }
}

Rules:
- Keep architecture realistic.
- Estimate cloud costs based on 10,000 monthly active users.
- Keep cost numbers reasonable (approximate real-world).
- All IDs must be unique and usable for graph rendering.
- Do not add extra fields.
- Output must be pure JSON.`;
};

export const prompt2 = (user_idea: string) => {
  return `You are a senior software architect and cloud solutions expert.

A user wants to build the following project:

${user_idea}

Your task is to generate a complete structured project analysis in JSON format only.

Return strictly valid JSON. Do not include explanation or markdown.

The JSON must follow this exact structure:

{
  "projectName": "",
  "architecture": {
    "nodes": [
      {
        "id": "",
        "label": "",
        "type": "frontend | backend | database | cache | queue | cloud | external",
        "service": "",
        "provider": ""
      }
    ],
    "edges": [
      {
        "source": "",
        "target": ""
      }
    ]
  },
  "cloudEstimation": {
    "Compute": "",
    "Database": "",
    "Storage": "",
    "OtherServices": "",
    "EstimatedMonthlyCost": ""
  }
}

Rules:
- Keep architecture realistic.
- Estimate cloud costs based on 10,000 monthly active users.
- Keep cost numbers reasonable (approximate real-world).
- All IDs must be unique and usable for graph rendering.
- Do not add extra fields.
- Output must be pure JSON.`;
};
