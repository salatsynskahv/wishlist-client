export function formatLinks(input) {
    if(!input) {
        return ;
    }

    const regLinks = new RegExp("(?<!ref=)https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)\n");
    // const regSkipATag = new RegExp("<a\\s*.*>\\s*.*<\\/a>");
    // let arrayResultLinks, arrayResultSkipATag;
    // const arrayResultSkipATag = regSkipATag.exec(input);
    // while ((arrayResultLinks = regLinks.exec(input)) != null) {

    // }
    const result = input && input.replace(regLinks, (match) => {
        return '<a href="' + match + '">' + match.slice(0,30) + '...</a>'
    });
    return result;
}