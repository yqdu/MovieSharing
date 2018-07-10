import React from 'react';

class Category extends React.Component {
    render() {
        return (
            <div className="dropdown navbar-brand js-scroll-trigger">
                <a href="#" id="drop1" data-toggle="dropdown" className="dropdown-toggle" role="button">Category 
                    <b className="caret"></b>
                </a>
                <ul role="menu" className="dropdown-menu text-center" aria-labelledby="drop1">
                    {this.props.categoryList.map((x) => 
                        <li role="presentation" key={x}><a href={`/MovieByCategory/`+x} role="menuitem">{x}</a></li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Category;