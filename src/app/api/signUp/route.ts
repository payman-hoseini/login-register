import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`/API/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        email : body.email,
        country : body.country,
        phone : body.phone,
        password: body.password,
        agreeRisk: body.agreeRisk,
        agreeTnC: body.agreeTnC,
        newsletter: body.newsletter || false,
      })
    });

    if (!res.ok) {
      const errorData = await res.json()
      const errormessage = JSON.stringify(errorData)
      return NextResponse.json({ error: errormessage  }, { status: res.status });
    }
    return res;
    }
    catch(error) {
        console.error('Registration error!', error);
        return NextResponse.json({ error: 'An error has occurred.' }, { status: 500 });
    }
}