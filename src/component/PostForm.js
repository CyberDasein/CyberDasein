import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions.js";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }
  submitHandler = event => {
    event.preventDefault();

    const { title } = this.state;

    if (!title.trim()) {
      return this.props.showAlert("вы ввели пустое название");
    }
    const newPost = {
      title,
      id: Date.now().toString()
    };
    this.props.createPost(newPost);
    this.setState({ title: "" });
  };
  changeInputHandler = event => {
    event.persist();
    this.setState(prev => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value
      }
    }));
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && (
          <div class="alert alert-warning" role="alert">
            {this.props.alert}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

const mapDispachToProps = {
  createPost,
  showAlert
};
const mapStateToProps = state => ({
  alert: state.app.alert
});
export default connect(mapStateToProps, mapDispachToProps)(PostForm);
