import React, { Component } from 'react'

export class CategoryCarouselItem extends Component {
    render() {
        const { images } = this.props
        return (
            <Button
                className="carousel_item"
                value="meat"
                data-button-key="meat"
                onClick={this.categoryClick}
            >
                <img
                    className="carousel_image"
                    style={carousel_image_style}
                    src="https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
                />
                <span className="carousel_caption">Meat</span>
            </Button>
        )
    }
}

export default CategoryCarouselItem
