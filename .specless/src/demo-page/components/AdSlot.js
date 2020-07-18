import React from 'react';
import standardSlot from './../slots/standard.html';
import safeframeSlot from './../slots/safeframe.html';
import '../../vendor/safeframe/js/lib/base.js';
import '../../vendor/safeframe/js/host/host.js';
import '../../vendor/safeframe/js/lib/boot.js';
import '../../vendor/safeframe/js/ext/ext.js';

const speclessTag = ``

class AdSlotComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.safeframe) {
            const $sf = window.$sf;
            const id = `safeframe-${this.props.id}`;
            const conf = new $sf.host.Config({
                renderFile: safeframeSlot + window.location.search,
                positions: {
                    [this.props.id] : {
                        id: this.props.id,
                        dest: id,
                        w: this.props.width,
                        h: this.props.height
                    }
                }
            })
            const posMeta = new $sf.host.PosMeta(null,"rmx", {});
            const pos = new $sf.host.Position(this.props.id, speclessTag);
            $sf.host.render(pos);
        }
    }

    render() {

        const frameProps = {
            style: {
                border: 'none',
            },
            src: standardSlot + window.location.search + '&placementRoot=' + window.location.href.split('/assets/')[0],
            width: this.props.width,
            height: this.props.height,
            border: 'none'
        }

        if (this.props.unfriendly) {
            frameProps.sandbox = 'allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-top-navigation allow-top-navigation-by-user-activation'
        }

        return (
            <div className="ad-slot-wrapper">
                <div
                    id={this.props.id}
                    className="ad-slot"
                    style={{
                        border: 'none',
                        width: this.props.width,
                        height: this.props.height,
                        margin: '0 auto'
                }}>
                    {(this.props.safeframe) ? (
                        <div id={`safeframe-${this.props.id}`}/>
                    ) : (
                        <iframe {...frameProps}/>
                    )}
                </div>
            </div>
        )
    }
}

export const AdSlot = AdSlotComponent;