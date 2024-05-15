import { UserRegister } from "./user-register";

export interface UserCreateDetailsProps {
    onSave: (newUser: UserRegister) => void;
}
