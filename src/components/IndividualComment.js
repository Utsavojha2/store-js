import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Avatar } from '@material-ui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

const IndividualComment = ({timestamp,name,comment}) => {
    dayjs.extend(relativeTime);
    const time = new Date(timestamp?.toDate());

    return (
        <div className="commentSection__individualComment">
            <Avatar src="" alt="" />
            <div className="commentSection__info">
                <div className="commentNameTime">
                    <p>{name}</p>
                    <p>{timestamp ? dayjs(time).fromNow() : null}</p>
                </div>
                <p>{comment}</p>
                <div className="comment__likes">
                    <ThumbUpAltIcon/>
                    <ThumbDownIcon />
                    <p>REPLY</p>
                </div>
            </div>
        </div> 
    )
}

export default IndividualComment

