import { User } from "./user";

export interface UserDetailsProps {
    user: User;
    onSave: (updatedUser: User) => void;
    onDelete: (userId: string) => void;
}

