export function verifyIsDigit(value: string) {
    if (/^[0-9]+$/.test(value)) return true

    return false
}