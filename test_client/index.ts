import { build_door, build_header } from "./build_messages";

const door_codes = {
    open_door: 0x01,
    close_door: 0x02,
    lock_door: 0x03,
    unlock_door: 0x04,
};

console.log(build_door(door_codes.close_door));
