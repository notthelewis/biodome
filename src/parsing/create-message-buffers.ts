import { inbound_messages } from "../messages/index";

export type MessageBuffer = {
    /** The position to write the next byte */
    offset: number;
    /** The buffer for this message */
    buf: Buffer;
};

/** An object containing one each message type as it's keys, and each
 * key has a MessageBuffer as it's value.
 */
export type ClientMessageBuffers = {
    [Property in keyof typeof inbound_messages]: MessageBuffer;
};

/**
 * Creates an uninitialized buffer for every message type. This function will
 * Iterate every key on every message type, calculate it's transferred size in
 * bytes, create an uninitialized MessageBuffer object of that size, then set
 * the MessageBuffer's offset to 0.
 *
 * This is so that all of the space to hold every message type is allocated 1
 * time per client, upon first connection. This reduces allocs and deletes
 * massively when compared with creating a new buffer for every message sent
 * by a client.
 *
 * When a message has finished parsing, i.e. when its offset has reached the
 * length of its buffer, set the offset to zero so that the next instance of
 * that message type simply overwrites the previous.
 *
 */
export function create_buffers(): ClientMessageBuffers {
    // @ts-ignore
    let to_return: ClientMessageBuffers = {};

    // Iterate each message type
    for (const m of Object.keys(inbound_messages)) {
        let len = 0;

        // @ts-ignore
        // Iterate each message field
        for (const p of Object.values(inbound_messages[m])) {
            // Accounts for the fields that contains an array(e.g [UINT8, 6])
            if (Array.isArray(p)) {
                for (let i = 0; i < p[1]; i++) {
                    len += p[0].len;
                }
            } else {
                //@ts-ignore
                len += p.len;
            }
        }

        // @ts-ignore
        to_return[m] = { offset: 0, buf: Buffer.allocUnsafe(len) };
    }

    return to_return;
}
