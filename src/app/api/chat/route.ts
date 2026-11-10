import { handleChat, handleChatStatus } from '@/features/chat/server/handler';

export const runtime = 'nodejs';

export function GET() {
  return handleChatStatus();
}

export function POST(request: Request) {
  return handleChat(request);
}
