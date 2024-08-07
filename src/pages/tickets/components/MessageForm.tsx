import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface MessageFormProps {
    onSave: (messageContent: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSave }) => {
    const [messageContent, setMessageContent] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(messageContent);
        setMessageContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-t">
            <input
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Digite sua mensagem"
                className="flex-grow p-2 border rounded-lg"
            />
            <Button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</Button>
        </form>
    );
};

export default MessageForm;
