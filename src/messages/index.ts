// Export the parsed message types directly from their respective files.
export { IParsedHeader } from "./header";
export { IParsedDoor } from "./door";

import { header } from "./header";
import { door } from "./door";

export const inbound_messages = {
    header,
    door,
};
