import React from "react";
import { Message } from "@/interfaces/ticket-interfaces/ticket-interfaces";

interface MessageListProps {
    messages: Message[];
    userId: number;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
    return (
        <div className="flex-grow overflow-auto p-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`mb-4 p-4 rounded-lg shadow-md max-w-lg ${message.senderId === userId ? "bg-blue-100 ml-auto" : "bg-gray-100 mr-auto"
                        }`}
                >
                    <div>{message.message}</div>
                    <div className="text-gray-600 text-sm">Enviada por: UserID {message.senderId}, {new Date(message.timestamp).toLocaleString()}</div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
