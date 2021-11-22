// takes res error and turns it into a readable format
export const resMessage = err => {
    return (err.response && 
    err.response.data && 
    err.response.data.message) || 
    err.message ||
    err.toString()
}