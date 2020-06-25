module.exports = {
    // Trim a specified array
    trimArray: function(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    },
    // Format bytes so it looks cool
    formatBytes: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    },
    pages: function(arr, itemsPerPage, page = 1) {
        const maxPages = Math.ceil(arr.length / itemsPerPage);
        if (page < 1 || page > maxPages) return null;
        return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    },
};