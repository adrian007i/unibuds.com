const formatDate = (date) => {
    const msg_date = new Date(date);
    const today = new Date();
    const days_diff = parseInt((today - msg_date) / (1000 * 60 * 60 * 24), 10);

    if (days_diff !== 0)
        return `${days_diff} day${days_diff > 1 ? 's' : ''} ago`;
    else
        return msg_date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}



export default formatDate;