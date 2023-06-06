const Restaurant = (props) => {
    return(
        <div>
            <p>{props.name}</p>
            <img src={props.pic} alt="" height='50pt' width='50pt'></img>
        </div>
    )
}

export default Restaurant