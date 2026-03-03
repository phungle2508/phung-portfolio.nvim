import { NextResponse } from 'next/server';

const ZAI_API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';

export async function POST() {
  const apiKey = process.env.ZAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(ZAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US,en',
      },
      body: JSON.stringify({
        model: 'GLM-4.5-Flash',
        messages: [
          {
            role: 'system',
            content: 'You are a creative bio writer. Write a unique, engaging, and professional bio for a software developer. Keep it concise but interesting, around 2-3 paragraphs. Use markdown formatting with **bold** for emphasis.',
          },
          {
            role: 'user',
            content: 'Write a creative and unique bio for a software developer who loves coding, open source, and building cool projects. Make it different each time.',
          },
        ],
        temperature: 1.0,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Z.ai API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate bio' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedBio = data.choices?.[0]?.message?.content || 'Unable to generate bio';

    return NextResponse.json({ content: generatedBio });
  } catch (error) {
    console.error('Error calling Z.ai API:', error);
    return NextResponse.json(
      { error: 'Failed to generate bio' },
      { status: 500 }
    );
  }
}
