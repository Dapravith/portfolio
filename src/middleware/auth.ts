import { NextRequest, NextResponse } from 'next/server';

export function withAuth(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Verify JWT token
    // const isValid = await verifyToken(token);
    // if (!isValid) {
    //   return NextResponse.json(
    //     { error: 'Invalid token' },
    //     { status: 401 }
    //   );
    // }

    return handler(request);
  };
}
