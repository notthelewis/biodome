import { create_buffers } from "../../src/parsing/create-message-buffers";

describe("Valid tests", () => {
    it("Should create a valid MessageBuffer object for the header", () => {
        let bufs = create_buffers();
        expect(bufs.header.buf.length).toBe(9);
        expect(bufs.header.offset).toBe(0);
    });
});
