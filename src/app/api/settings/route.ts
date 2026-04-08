import { NextResponse } from 'next/server';

const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL;
const DEV_MODE = process.env.DEV_MODE === '1';

// --- In-memory cache (60 seconds) ---
let cachedSettings: Record<string, unknown> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function getCachedSettings(): Record<string, unknown> | null {
  if (cachedSettings && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedSettings;
  }
  return null;
}

function setCachedSettings(settings: Record<string, unknown>): void {
  cachedSettings = settings;
  cacheTimestamp = Date.now();
}

export async function GET() {
  // DEV_MODE=1: return permissive dates
  if (DEV_MODE) {
    console.log('Development mode (DEV_MODE=1): Bypassing application period restrictions');
    return NextResponse.json({
      enabled: true,
      isDevelopment: true,
      eventApplicationStart: '2000-01-01T00:00:00.000Z',
      eventApplicationEnd: '2099-12-31T23:59:59.000Z',
      teamRegistrationEnd: '2099-12-31T23:59:59.000Z',
      submissionDeadline: '2099-12-31T23:59:59.000Z',
    });
  }

  // Non-production without GAS URL: return mock settings
  if (process.env.NODE_ENV !== 'production' && !GAS_WEBAPP_URL) {
    console.log('Development environment without GAS_WEBAPP_URL: Returning mock settings.');
    return NextResponse.json({
      enabled: true,
      isDevelopment: false,
      eventApplicationStart: '2026-01-01T00:00:00.000Z',
      eventApplicationEnd: '2026-12-31T23:59:59.000Z',
      teamRegistrationEnd: '2026-12-31T23:59:59.000Z',
      submissionDeadline: '2026-12-31T23:59:59.000Z',
    });
  }

  // Check in-memory cache
  const cached = getCachedSettings();
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    if (!GAS_WEBAPP_URL) {
      return NextResponse.json({ enabled: false });
    }

    // Fetch settings from GAS Web App
    const response = await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'get_settings' }),
    });

    if (!response.ok) {
      console.error(`GAS Web App responded with status ${response.status}`);
      return NextResponse.json({ enabled: false });
    }

    const result = await response.json();
    const settings = result.data || { enabled: false };

    // Normalize date fields to ISO 8601
    const dateFields = [
      'eventApplicationStart',
      'eventApplicationEnd',
      'teamRegistrationEnd',
      'submissionDeadline',
    ];
    for (const field of dateFields) {
      if (settings[field]) {
        settings[field] = new Date(settings[field]).toISOString();
      }
    }

    settings.isDevelopment = false;

    // Cache the result
    setCachedSettings(settings);

    return NextResponse.json(settings);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Settings API Error:', message);
    return NextResponse.json({ enabled: false });
  }
}
