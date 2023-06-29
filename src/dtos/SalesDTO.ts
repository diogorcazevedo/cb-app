import {UserDTO} from "@dtos/UserDTO";

export type SalesDTO = {
    id: string;
    name: string;
    total: string;
    user: UserDTO;
}