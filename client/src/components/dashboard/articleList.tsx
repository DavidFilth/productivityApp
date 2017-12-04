import ArticleItem from './articleItem'; 
import * as React from 'react';

export interface ArticleListProps {
    articles: Array<CustomInterfaces.ArticleInterface>;
}

class ArticleList extends React.Component<ArticleListProps> {
    render() {
        let articles = this.props.articles.map((val, ind) => (
            <ArticleItem {...val} key={'art' + ind}/>
        ));
        return (
            <div>
                <h4>Articles</h4>
                {articles.length !== 0 ? articles : 'No articles'}
            </div>
        );
    }
}

export default ArticleList;
