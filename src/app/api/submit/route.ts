import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL;

// --- Rate limiting (in-memory) ---
const submissions = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;
  const timestamps = (submissions.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return true;
}

// --- Idempotency (in-memory) ---
const processedKeys = new Map<string, number>();

function isProcessed(key: string): boolean {
  const now = Date.now();
  // Clean old entries
  for (const [k, t] of processedKeys) {
    if (now - t > 10 * 60 * 1000) processedKeys.delete(k);
  }
  if (processedKeys.has(key)) return true;
  processedKeys.set(key, now);
  return false;
}

// --- IP detection ---
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

// --- Input sanitization ---
function sanitizeString(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item =>
        typeof item === 'object' && item !== null
          ? sanitizeData(item as Record<string, unknown>)
          : typeof item === 'string'
            ? sanitizeString(item)
            : item
      );
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

// --- Validation ---
function validateStudentId(studentId: string): boolean {
  return /^\d{7}$/.test(studentId);
}

function validateTeamSize(size: unknown): boolean {
  const validSizes = [1, 3, 4, 5];
  return validSizes.includes(Number(size));
}

function validateEventData(data: Record<string, unknown>): string | null {
  if (!data.projectName) return 'プロジェクト名は必須です';
  if (!data.leaderName) return 'リーダー名は必須です';
  if (!data.leaderEmail) return 'リーダーのメールアドレスは必須です';

  const teamSize = Number(data.teamSize);
  if (!validateTeamSize(teamSize)) {
    return 'チーム人数は1、3、4、5のいずれかで指定してください';
  }

  const members = data.members as Array<Record<string, unknown>> | undefined;
  if (teamSize > 1) {
    if (!members || !Array.isArray(members)) {
      return 'メンバー情報が必要です';
    }
    if (members.length !== teamSize) {
      return `チーム人数(${teamSize})とメンバー数(${members.length})が一致しません`;
    }
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (!member.name) return `メンバー${i + 1}の氏名は必須です`;
      if (member.studentId && !validateStudentId(String(member.studentId))) {
        return `メンバー${i + 1}の学籍番号は7桁の数字で入力してください`;
      }
    }
  }

  return null;
}

function validatePersonalData(data: Record<string, unknown>): string | null {
  if (!data.name) return '氏名は必須です';
  if (!data.leaderName) return 'リーダー名は必須です';
  if (!data.leaderEmail) return 'リーダーのメールアドレスは必須です';
  if (data.studentId && !validateStudentId(String(data.studentId))) {
    return '学籍番号は7桁の数字で入力してください';
  }
  return null;
}

// --- CORS headers ---
function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Idempotency-Key',
  };
}

// --- OPTIONS handler (CORS preflight) ---
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// --- POST handler ---
export async function POST(request: NextRequest) {
  const headers = corsHeaders();

  try {
    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      console.log(`[${new Date().toISOString()}] Rate limit exceeded for IP`);
      return NextResponse.json(
        { ok: false, error: 'リクエスト数の上限に達しました。しばらく待ってから再度お試しください。' },
        { status: 429, headers }
      );
    }

    // Idempotency check
    const idempotencyKey = request.headers.get('x-idempotency-key');
    if (idempotencyKey && isProcessed(idempotencyKey)) {
      console.log(`[${new Date().toISOString()}] Duplicate idempotency key detected`);
      return NextResponse.json(
        { ok: false, error: 'この申し込みは既に処理されています。' },
        { status: 409, headers }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { ok: false, error: 'リクエストの形式が正しくありません。' },
        { status: 400, headers }
      );
    }

    // Sanitize inputs
    const sanitizedData = sanitizeData(data) as Record<string, unknown>;

    // Validate based on type
    let validationError: string | null = null;
    if (type === 'event') {
      validationError = validateEventData(sanitizedData);
    } else if (type === 'personal') {
      validationError = validatePersonalData(sanitizedData);
    } else {
      return NextResponse.json(
        { ok: false, error: '不明なリクエストタイプです。' },
        { status: 400, headers }
      );
    }

    if (validationError) {
      return NextResponse.json(
        { ok: false, error: validationError },
        { status: 400, headers }
      );
    }

    console.log(`[${new Date().toISOString()}] Submission attempt: type=${type}`);

    // Dev mode: mock success
    if (!GAS_WEBAPP_URL) {
      console.warn('GAS_WEBAPP_URL not configured. Using mock mode.');
      return NextResponse.json(
        { ok: true, warning: 'GAS Web App not configured (mock mode)' },
        { headers }
      );
    }

    // Forward to GAS
    const gasResponse = await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data: sanitizedData }),
    });

    if (!gasResponse.ok) {
      const errorText = await gasResponse.text();
      console.error(`GAS Web App responded with status ${gasResponse.status}:`, errorText);
      return NextResponse.json(
        { ok: false, error: 'バックエンドサービスに接続できませんでした。しばらく待ってから再度お試しください。' },
        { status: 502, headers }
      );
    }

    const result = await gasResponse.json();
    return NextResponse.json(result, { headers });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${new Date().toISOString()}] Submit API Error:`, message);
    return NextResponse.json(
      { ok: false, error: 'サーバーエラーが発生しました。しばらく待ってから再度お試しください。' },
      { status: 500, headers }
    );
  }
}

// --- GET handler (retrieve teams) ---
export async function GET(request: NextRequest) {
  const headers = corsHeaders();

  try {
    if (!GAS_WEBAPP_URL) {
      console.warn('GAS_WEBAPP_URL not configured. Returning empty list.');
      return NextResponse.json([], { headers });
    }

    const gasResponse = await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'get_teams' }),
    });

    if (!gasResponse.ok) {
      console.error(`GAS Web App responded with status ${gasResponse.status}`);
      return NextResponse.json([], { headers });
    }

    const result = await gasResponse.json();
    return NextResponse.json(result.data || [], { headers });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Submit GET API Error:', message);
    return NextResponse.json([], { headers });
  }
}
