import React, {Component} from "react";
import CommentList from "../commentList/CommentList";
import style from "../../style";
import CommentForm from "../commentForm/CommentForm";
import axios from "axios";

class CommentBox extends Component{

    constructor(props){
        super(props);
        this.state  = {data:[]};

        this.loadCommentFromServer = this.loadCommentFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }

    loadCommentFromServer(){
        axios.get(this.props.url)
            .then(res => {
                this.setState({data:res.data})
            })
    }

    handleCommentSubmit(comment){
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        this.setState({data:newComments});
        axios.post(this.props.url, comment)
            .then(res => {
                this.setState({data: comments})
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleCommentUpdate(id, comment){
        let url = this.props.url + "/" + id;
        axios.put(url, comment)
            .catch(err => {
                console.log(err);
            })
    }
    handleCommentDelete(id){
        let url = this.props.url + "/" + id;
        axios.delete(url)
            .then(res =>{
                console.log("comment deleted")
            })
            .catch( err => {
                console.log(err);
            })

    }

    componentDidMount(){
        this.loadCommentFromServer();
        //setInterval(this.loadCommentFromServer, this.props.pollInterval)
    }

    render(){
        return (
            <div style={style.commentBox}>
                <h2>Comments:</h2>
                <CommentList data={this.state.data}
                             onCommentUpdate={ this.handleCommentUpdate }
                             onCommentDelete={ this.handleCommentDelete }/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }

}

export default CommentBox;
