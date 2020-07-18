import React from 'react'
import Carousel from 'nuka-carousel';
import { 
    MdRadioButtonChecked,
    MdRadioButtonUnchecked
} from "react-icons/md";
import {
    AiOutlineLeft,
    AiFillCaretLeft,
    AiOutlineArrowLeft,
    AiFillLeftCircle,
    AiOutlineLeftCircle,
    AiOutlineDoubleLeft,
    AiOutlineLeftSquare,
    AiFillLeftSquare,
    AiOutlineBackward,
    AiOutlineStepBackward
} from 'react-icons/ai'
import {
    BsSquareFill,
    BsSquare,
    BsCircleFill,
    BsCircle
} from 'react-icons/bs'
import {
    FiArrowLeftCircle
} from 'react-icons/fi'
import {
    FaArrowCircleLeft,
    FaArrowLeft
} from 'react-icons/fa'
import {
    IoIosArrowBack,
    IoMdArrowDropleftCircle,
} from 'react-icons/io'

const arrowTypes = {
    'basic': AiOutlineLeft,
    'caret': AiFillCaretLeft,
    'arrow': AiOutlineArrowLeft,
    'circle': AiOutlineLeftCircle,
    'circle-filled': AiFillLeftCircle,
    'double': AiOutlineDoubleLeft,
    'square': AiOutlineLeftSquare,
    'square-filled': AiFillLeftSquare,
    'triangles': AiOutlineBackward,
    'step': AiOutlineStepBackward,
    'fi-circle': FiArrowLeftCircle,
    'fa-circle': FaArrowCircleLeft,
    'fa-arrow': FaArrowLeft,
    'io-basic': IoIosArrowBack,
    'io-circle': IoMdArrowDropleftCircle
}

const dotTypes = {
    'radio': {
        normal: MdRadioButtonUnchecked,
        active: MdRadioButtonChecked,
        normalStyles: {
            opacity: 1
        }
    },
    'circle': {
        normal: BsCircle,
        active: BsCircleFill
    },
    'circle-filled': {
        normal: BsCircleFill,
        active: BsCircleFill,
        normalStyles: {
            opacity: 0.5
        }
    },
    'square': {
        normal: BsSquare,
        active: BsSquareFill
    },
    'square-filled': {
        normal: BsSquareFill,
        active: BsSquareFill,
        normalStyles: {
            opacity: 0.5
        }
    }
}

const btnStyles = {
    cursor: 'pointer'
}

const defaultProps = {};

class SpeclessCarousel extends React.Component {

    state = {
        slideIndex: this.props.slideIndex || 0,
    }

    afterSlide = (slideIndex) => {
        this.setState({slideIndex});
        if (this.props.onSlideChange) {
            this.props.onSlideChange(slideIndex);
        }
    }

    nextSlide = () => {
        let count = 0;
        const next = this.state.slideIndex + 1;
        if (this.props.children) {
            count = this.props.children.length - 1;
        }
        if (next <= count ) {
            this.setState({
                slideIndex: next
            })
        }
    }

    prevSlide = () => {
        const prev = this.state.slideIndex - 1;
        if (prev >= 0) {
            this.setState({
                slideIndex: prev
            })
        }
    }

    goToSlide = (index) => {
        let count = 0;
        if (this.props.children) {
            count = this.props.children.length - 1;
        }

        let slideIndex = index;

        if (typeof slideIndex === 'string') {
            if (this.props.children) {
                this.props.children.forEach((slide, index) => {
                    if (slide.props.id === slideIndex) {
                        slideIndex = index
                    }
                })
            }
        }
        
        if (slideIndex >= 0 && slideIndex <= count) {
            this.setState({
                slideIndex
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.slideIndex !== prevProps.slideIndex) {
            this.setState({
                slideIndex: this.props.slideIndex
            })
        }
    }

    render() {
        const props = Object.assign({}, defaultProps, this.props);
        const { componentLibrary } = this.props.context;
        const { Layer } = componentLibrary;
        if (props.autoplayInterval) {
            props.autoplayInterval = Number(props.autoplayInterval) * 1000;
        }
        if (props.speed) {
            props.speed = Number(props.speed) * 1000
        }

        props.pauseOnHover = true;
        props.initialSlideHeight = props.height;
        props.width = '100%';

        if (!props.navArrows) {
            props.renderCenterLeftControls = () => {
                return <></>
            }
            props.renderCenterRightControls = () => {
                return <></>
            }
        } else {
            props.renderCenterLeftControls = ({ previousSlide, currentSlide }) => {
                const type = props.navArrowsType || 'basic';
                const Arrow = arrowTypes[type];
                let className = "nav-arrow left";
                if (currentSlide === 0) {
                    className = "nav-arrow left disabled";
                }
                return (
                    <div className={className} onClick={previousSlide}>
                        <Arrow/>
                    </div>
                )
            }
            props.renderCenterRightControls = ({ nextSlide }) => {
                const type = props.navArrowsType || 'basic';
                const Arrow = arrowTypes[type];
                return (
                    <div className="nav-arrow right" onClick={nextSlide}>
                        <Arrow style={{transform: 'rotate(180deg)'}}/>
                    </div>
                )
            }

            props.getControlsContainerStyles = (key) => {
                if (key === 'CenterLeft' || key === 'CenterRight') {
                    let styles = Object.assign(btnStyles, props.navArrowsStyles);
                    styles.fontSize = styles.width;
                    if (!styles.fontSize) {
                        styles.fontSize = 24
                    }
                    styles.lineHeight = styles.fontSize + 'px';
                    delete styles.width;
                    delete styles.height;
                    return styles
                } else if (key === 'BottomCenter') {
                    let styles = Object.assign({}, props.paginationStyles);
                    styles.fontSize = styles.width;
                    if (!styles.fontSize) {
                        styles.fontSize = 12
                    }
                    styles.lineHeight = styles.fontSize + 'px';
                    delete styles.width;
                    delete styles.height;
                    return styles
                }
            }
        }

        if (!props.pagination) {
            props.renderBottomCenterControls = () => {
                return <></>
            }
        } else {
            props.renderBottomCenterControls = ({slideCount, currentSlide, goToSlide}) => {
                const type = props.paginationType || 'circle';
                const dot = dotTypes[type];
                if (this.props.children) {
                    return (
                        <div className="pagination">
                            {this.props.children.map((item, index) => {
                                let Icon = dot.normal;
                                let style = dot.normalStyles;
                                let className = 'inactive';
                                if (index === currentSlide) {
                                    Icon = dot.active;
                                    style = dot.activeStyles;
                                    className = 'active';
                                }
                                return (
                                    <a className= {`pagination-dot ${className}`} onClick={() => goToSlide(index)}>
                                        <Icon style={style}/>
                                    </a>
                                )
                            })}
                        </div>
                    )
                } else {
                    return <></>
                }
            }
        }

        const classes = this.props.context.api.useStyles({
            'carousel': {
                outline: 'none',
                '@global': {
                    '.slider-slide': {
                        outline: 'none'
                    },
                    '.carousel-slide': {
                        userSelect: 'none'
                    },
                    '.pagination-dot': {
                        color: (props) => props.paginationColor || 'rgba(255,255,255,0.65)',
                        '&.active': {
                            color: (props) => props.paginationColorActive || 'rgba(255,255,255,1)',
                        }
                    },
                    '.pagination-dot > svg': {
                        margin: '6px 3px'
                    },
                    '.nav-arrow': {
                        position: 'relative',
                        color: (props) => props.navArrowsColor || 'rgba(255,255,255,0.65)',
                        '&.left': {
                            left: 6,
                            transform: (props) => {
                                let x = 0;
                                let y = 0;
                                if (this.props.navArrowsStyles) {
                                    if (this.props.navArrowsStyles.x) {
                                        x = this.props.navArrowsStyles.x;
                                    }
                                    if (this.props.navArrowsStyles.y) {
                                        y = this.props.navArrowsStyles.y;
                                    }
                                }
                                return `translate(${x}px, ${y}px)`
                            }
                        },
                        '&.right': {
                            right: 6,
                            transform: (props) => {
                                let x = 0;
                                let y = 0;
                                if (this.props.navArrowsStyles) {
                                    if (this.props.navArrowsStyles.x) {
                                        x = -1 * this.props.navArrowsStyles.x;
                                    }
                                    if (this.props.navArrowsStyles.y) {
                                        y = this.props.navArrowsStyles.y;
                                    }
                                }
                                return `translate(${x}px, ${y}px)`
                            }
                        },
                        '&:hover': {
                            color:(props) => props.navArrowsColorHover || 'rgba(255,255,255,1)'
                        }
                    }
                }
            }
        }, this.props);

        delete props.context;
        delete props.style;

        return (
            <Carousel {...props} className={classes.carousel} slideIndex={this.state.slideIndex} pauseOnHover={true} afterSlide={this.afterSlide}>
                {this.props.children}
            </Carousel>
        )
    }
}

export default SpeclessCarousel