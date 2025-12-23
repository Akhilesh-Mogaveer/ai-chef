// Google Generative AI for real AI analysis
const GEMINI_API_KEY = 'AIzaSyBc4_4UjZBST7GnWj8Y4fn2YY1e-O0WL_Y';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface AIAnalysis {
  category: 'maintenance' | 'it' | 'academic' | 'safety' | 'other';
  priority: 'low' | 'medium' | 'high';
  severity: string;
  summary: string;
  recommendations: string[];
}

export async function analyzeIssueWithAI(
  title: string,
  description: string,
  location: string
): Promise<AIAnalysis> {
  try {
    const prompt = `You are a campus facility management AI expert. Analyze the following campus issue report and provide insights.

ISSUE REPORT:
Title: ${title}
Description: ${description}
Location: ${location}

Please provide a JSON response with:
1. category: One of [maintenance, it, academic, safety, other]
2. priority: One of [low, medium, high]
3. severity: A brief severity assessment (Critical/High/Medium/Low)
4. summary: A one-sentence summary of the issue
5. recommendations: An array of 2-3 action items to resolve this issue

Respond ONLY with valid JSON, no markdown or extra text.`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const analysis = JSON.parse(responseText);

    return {
      category: analysis.category || 'other',
      priority: analysis.priority || 'medium',
      severity: analysis.severity || 'Medium',
      summary: analysis.summary || 'Issue requires attention',
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : [],
    };
  } catch (error) {
    console.error('Error analyzing issue with AI:', error);
    // Fallback response if API fails
    return {
      category: 'other',
      priority: 'medium',
      severity: 'Medium',
      summary: 'Issue requires attention',
      recommendations: [
        'Document the issue with photos if possible',
        'Contact facility management',
        'Follow up on resolution status',
      ],
    };
  }
}
