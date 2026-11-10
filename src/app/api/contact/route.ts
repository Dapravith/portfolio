import { handleContact } from '@/features/contact/server/handler';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return handleContact(request);
}
