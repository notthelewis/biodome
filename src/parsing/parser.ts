import { inbound_messages } from "../messages";
import { BufferTokenizer } from "strtok3/lib/BufferTokenizer";

function get_schema<T, U extends keyof T>(messages: T, message_name: U): T[U] {
    return messages[message_name];
}

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

    for await (const [key, entry] of Object.entries(schema)) {
        if (Array.isArray(entry)) {
            let temp = "";
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
