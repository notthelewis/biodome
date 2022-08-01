import { UINT8, UINT16_BE, UINT24_BE } from "token-types";

export const header = {
    requester_id: [UINT8, 4],
    message_type: UINT16_BE,
    packet_length: UINT24_BE,
};

export interface IParsedHeader {
    requester_id: string;
    message_type: number;
    packet_length: number;
}
