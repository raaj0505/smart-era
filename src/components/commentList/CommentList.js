import React, {Component} from "react";
import Comment from "../comment/Comment";
import style from "../../style";

class CommentList extends Component{

    render(){
        let commentNodes = this.props.data.map(comment => {
            return (
                <Comment
                    author={comment.author}
                    key={comment["_id"]}
                    uniqueId = {comment["_id"]}
                    onCommentUpdate = {this.props.onCommentUpdate}
                    onCommentDelete = {this.props.onCommentDelete}>
                    {comment.text}
                </Comment>
            )
        });

        return (<div style={style.commentList}> {commentNodes} </div>
        )
    }
}

export default CommentList;
