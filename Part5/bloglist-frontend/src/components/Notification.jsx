const Notification = ({ message, isError }) => {
    if (message === '') {
        return null
    }


    console.log('isError: ' + isError)

    return (
        <div id="notification" className={isError ? 'error' : ''}>
            {message}
        </div>
    )
}

export default Notification