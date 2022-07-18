export const hexStrToUint8Array = (str: string): Uint8Array => {
    return new Uint8Array(Buffer.from(str, "hex"))
}

export const uint8ArrayToHex = (buffer: Uint8Array): string => {
    return Buffer.from(buffer).toString('hex');
}

export function bigIntToUint8Array(num: bigint) {
    const b = new ArrayBuffer(8)
    new DataView(b).setBigUint64(0, num);
    return new Uint8Array(b);
}

export const base64ToArrayBuffer = (base64: string): Uint8Array => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
};
