const formatDate = (date) => {
    const msgDate = new Date(date);
    const today = new Date();
    const daysDiff = parseInt((today - msgDate) / (1000 * 60 * 60 * 24), 10);

    if (daysDiff !== 0)
        return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
    else
        return msgDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}



export default formatDate;