export const getDateTime = () => {
    const timestamp = Date.now();
    const dateObject = new Date(timestamp);
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const formattedDate = `${year}-${month}-${date} ${hour}:${minute}:${seconds}`;
    return formattedDate;
}