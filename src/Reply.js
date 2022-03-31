import dayjs from "dayjs";

function Reply(props) {

    return (
        <div>
            <label>{props.obj.description}</label><br/>
            <small>Por {props.obj.user.firstName} {props.obj.user.lastName} - {dayjs(props.obj.createdOn).format('DD/MMMM/YYYY - h:mm:ss A')}</small><br/>
        </div>
    )
}

export default Reply;