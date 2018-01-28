import React, {Component} from "react";
import CommentBox from "../commentBox/CommentBox";

class App extends Component{
    render(){
        return (
            <CommentBox url="http://localhost:3001/api/comments" postInterval={2000}/>
        )
    }
}

export default App;

