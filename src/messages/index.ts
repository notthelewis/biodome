// Export the parsed message types directly from their respective files.
import { IParsedHeader } from "./header";
import { IParsedDoor } from "./door";

export type ParsedMessage = IParsedHeader | IParsedDoor;

import { header } from "./header";
import { door } from "./door";

export const inbound_messages = {
    header,
    door,
};
