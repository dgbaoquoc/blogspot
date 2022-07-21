import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { Message } from '@/constant/schemas';
import { trpc } from '@/utils/trpc';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from '../page';

interface IMessageItem {
  message: Message;
  session: Session;
}

const MessageItem: React.FC<IMessageItem> = ({ message, session }) => {
  const baseStyles =
    'mb-4 text-md w-7/12 p-4 text-gray-700 border border-gray-700 rounded-md';

  const liStyles =
    message.sender.name === session.user?.name
      ? baseStyles
      : baseStyles.concat(' self-end bg-gray-700 text-white');

  return (
    <li className={liStyles}>
      <div className="flex">
        <time>
          {message.sentAt.toLocaleTimeString('en-AU', {
            timeStyle: 'short',
          })}{' '}
          - {message.sender.name}
        </time>
      </div>
      {message.message}
    </li>
  );
};

const Room: NextPageWithLayout = () => {
  const { query } = useRouter();
  const roomId = query.roomId as string;
  const { data: session } = useSession();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutateAsync: sendMessage } = trpc.useMutation(['room.send-message']);

  trpc.useSubscription(
    [
      'room.onSendMessage',
      {
        roomId,
      },
    ],
    {
      onNext: (message) => {
        setMessages((m) => {
          return [...m, message];
        });
      },
    }
  );

  if (!session) {
    return (
      <div>
        <button className="btn-primary" onClick={() => signIn()}>
          Login
        </button>
      </div>
    );
  }

  const submitMessage = () => {
    sendMessage({
      roomId,
      message,
    });

    setMessage('');
  };

  return (
    <div className="sm:w-3/4 lg:w-1/2 w-full mx-auto mb-4">
      <h1 className="text-red-300">
        Welcome to room: <span className="text-blue-300">{roomId}</span>
      </h1>
      <div className="mb-12">
        <ul className="flex flex-col">
          {messages.map((m) => {
            return <MessageItem key={m.id} message={m} session={session} />;
          })}
        </ul>
      </div>
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage();
        }}
      >
        <textarea
          className="black p-2.5 w-full text-gray-700 bg-gray-50 rounded-md border border-gray-700 mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.code === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submitMessage();
            }
          }}
          placeholder="What do you want to say"
        />

        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Room;

Room.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
