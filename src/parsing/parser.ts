import { inbound_messages } from "../messages";
import { BufferTokenizer } from "strtok3/lib/BufferTokenizer";

/**
 * Gets a message schema from it's cannonical name.
 * @param messages - The inbound_message object
 * @param message_name - The type of message.
 */
function get_schema<T, U extends keyof T>(messages: T, message_name: U): T[U] {
    return messages[message_name];
}

/**
 * Parse a buffer into a given message type
 * @param message_type - The type of message to parse
 * @param buffer -  The buffer to parse from
 * @returns A parsed message
 */
export default async function parse(
    message_type: keyof typeof inbound_messages,
    buffer: BufferTokenizer
) {
    const schema = get_schema(inbound_messages, message_type);
    if (!schema) {
        throw new Error(
            `parse::schema::unknown_message_type::${String(message_type)}`
        );
    }

    let to_return: {
        [Property in keyof typeof schema as string]: number | string;
    } = {};

    // Iterate each field of the schema
    for await (const [key, entry] of Object.entries(schema)) {
        // If the entry is an array, read the token at entry[0], entry[1] times,
        // storing it as a string.
        if (Array.isArray(entry)) {
            let temp = "";
            // The @ts-ignores here are used because the object is instantiated
            // with no properties/entries.
            for (let i = 0; i < entry[1]; i++) {
                // @ts-ignore
                temp += await buffer.readToken(entry[0]);
            }
            // @ts-ignore
            to_return[key] = temp;
        } else {
            // @ts-ignore
            to_return[key] = await buffer.readToken(entry);
        }
    }

    return to_return;
}
