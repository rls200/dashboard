import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColorTag extends React.Component {
    state = {
        displayColorPicker: false,
        background: this.props.addNewTagsData.color
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    handleChange = (color) => {
        this.setState({ background: color.hex });
        this.props.setNewTagsColor(color.hex);
    };

    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '29px',
                    borderRadius: '2px',
                    background: this.state.background,

                },
                text: {
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                },
                swatch: {
                    width: '46px',
                    height: '39px',
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <span style={ styles.text }>Цвет</span>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div className="popover-react-color">
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.background } onChange={ this.handleChange } />
                </div> : null }
            </div>
        )
    }
}

export default ColorTag