
export function parseJSON(jsonString: string) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return {};
    }
}