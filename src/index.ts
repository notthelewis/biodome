import parse from "./parsing/parser";
import { BufferTokenizer } from "strtok3/lib/BufferTokenizer";
import { fromBuffer } from "strtok3";

const header = Buffer.from([
    0x00,
    0x01,
    0x02,
    0x03, // requester_id
    0x00,
    0x01, // message_type
    0x00,
    0x00,
    0x00, // packet_length
]);

const headerTokens = fromBuffer(header);
parse("header", headerTokens).then((parsed) => {
    console.log(parsed);
});
