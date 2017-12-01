import * as React from 'react';

class ArticleItem extends React.Component<CustomInterfaces.ArticleInterface> {
    render() {
        return (
            <div className="post-content">
                <div className="post-container">
                    <img className="profile-photo-md pull-left" src="http://placehold.it/300x300" alt="user"/>
                    <div className="post-detail">
                        <div className="user-info">
                            <h5>
                                <a className="profile-link" href="#">{this.props.title}</a>
                            </h5>
                            <p className="text-muted"> by {this.props.author}</p>
                        </div>
                        <div className="line-divider"/>
                        <div className="post-text">
                            <p>{this.props.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleItem;