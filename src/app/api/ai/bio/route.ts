import { NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const styles = ['cyberpunk', 'humorous', 'poetic', 'startup pitch', 'mysterious hacker'];

export async function POST() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  const style = styles[Math.floor(Math.random() * styles.length)];

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'x-ai/grok-4.1-fast',
        messages: [
          {
            role: 'system',
            content: `You are a creative bio writer. Write a unique, engaging, and professional bio for a software developer in a **${style}** tone. Keep it concise but interesting, around 2-3 paragraphs. Use markdown formatting with **bold** for emphasis.`,
          },
          {
            role: 'user',
            content: 'Write a creative and unique bio for a software developer who loves coding, open source, and building cool projects.',
          },
        ],
        temperature: 1.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate bio' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedBio = data.choices?.[0]?.message?.content || 'Unable to generate bio';

    return NextResponse.json({ content: generatedBio });
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return NextResponse.json(
      { error: 'Failed to generate bio' },
      { status: 500 }
    );
  }
}
