import { UINT8 } from "token-types";

export const door = {
    door_id: UINT8,
    command: UINT8,
};

export interface IParsedDoor {
    door_id: number;
    command: number;
}
