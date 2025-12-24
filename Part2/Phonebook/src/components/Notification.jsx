const Notification = ({ message, isError }) => {

    if (message === null) {
        return null
    }

    let style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (isError) {
        style = {
            ...style,
            color: 'red'
        }
    }


    return (
        <div className="addName" style={style}>
            {message}
        </div>
    )
}

export default Notification