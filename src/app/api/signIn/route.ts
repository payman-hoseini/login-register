import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { method, email, phone, password } = body;

    const payload: Record<string, string> = { password };
    if (method === 'email') {
      payload.email = email;
    } else if (method === 'phone') {
      payload.phone = phone;
    } else {
      return NextResponse.json(
        { error: 'Invalid login method.' },
        { status: 400 }
      );
    }

    const res = await fetch('API/user/signIn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Login failed.' }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    console.error('Login error!', err);
    const message =
    err instanceof Error
      ? err.message
      : 'An unexpected error occurred.';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}