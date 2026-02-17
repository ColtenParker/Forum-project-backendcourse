const notFound = (req, res, next) => {
    return res.status(404).json({ error: 'Route not found, check your request URL' });
};
export default notFound;
