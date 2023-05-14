export function classes(obj) {
    return Object.keys(obj)
        .filter(x => obj[x])
        .join(' ');
}
