import * as React from 'react';
import { ChatBox, createEchoAdapter } from '@mui/x-chat';
import type { ChatConversation, ChatMessage, ChatUser } from '@mui/x-chat/types';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';

const members: ChatUser[] = [
  { id: 'user', displayName: 'Alex', role: 'user' },
  { id: 'assistant', displayName: 'Product assistant', role: 'assistant' },
];

const initialConversations: ChatConversation[] = [
  {
    id: 'renewals',
    title: 'Renewal analysis',
    subtitle: 'Product assistant',
    participants: members,
    lastMessageAt: '2026-01-12T10:02:00Z',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 'message-1',
    conversationId: 'renewals',
    role: 'user',
    author: members[0],
    createdAt: '2026-01-12T10:00:00Z',
    status: 'read',
    parts: [{ type: 'text', text: 'Compare renewal risk by segment.' }],
  },
  {
    id: 'message-2',
    conversationId: 'renewals',
    role: 'assistant',
    author: members[1],
    createdAt: '2026-01-12T10:01:00Z',
    status: 'read',
    parts: [
      {
        type: 'text',
        text: 'I found three segments with elevated churn risk and can attach the rows used for the summary.',
      },
    ],
  },
];

const code = `
<ChatBox
  adapter={adapter}
  initialConversations={initialConversations}
  initialMessages={initialMessages}
  initialActiveConversationId="renewals"
/>`;

export default function XChatDemo() {
  const adapter = React.useMemo(
    () =>
      createEchoAdapter({
        respond: () => 'I can summarize that dashboard and suggest the next chart to inspect.',
        delayMs: 450,
      }),
    [],
  );

  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2 }}>
        <ChatBox
          adapter={adapter}
          members={members}
          initialConversations={initialConversations}
          initialMessages={initialMessages}
          initialActiveConversationId="renewals"
          initialComposerValue="Which segment should we inspect next?"
          variant="compact"
          density="compact"
          features={{
            attachments: false,
            conversationList: false,
            helperText: false,
            suggestions: false,
          }}
          sx={(theme) => ({
            height: 360,
            maxWidth: 420,
            mx: 'auto',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            bgcolor: '#FFF',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        />
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
