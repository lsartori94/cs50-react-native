import React from 'react';

import {SearchBarContext} from './SearchBarContext';
import {SearchBarAnimation} from './SearchBarAnimation';

export default class SearchBoxProvider extends React.Component {
    constructor(props) {
        super(props);

        this.searchBarAnimation = new SearchBarAnimation({
            scrollToOffset: (configScroll) => {
                let tab = configScroll.tab ? configScroll.tab : this.props.currentTab;
                let scrollToOffset = this._handleScroll[tab];
                scrollToOffset && scrollToOffset(configScroll.offset, configScroll.animated)
            }
        });

        this.state = {
            currentTab: null,
            canJumpToTab: true,
            contextProvider: {
                animation: this.searchBarAnimation.animationProps,
                addHandlerScroll: this._addHandlerScroll,
                _canJumpToTab: this._canJumpToTab
            }
        };
    }

    componentWillUnmount() {
        this.searchBarAnimation.destroy();
    }

    _handleScroll = {};

    _addHandlerScroll = (tab, handler) => {
        this._handleScroll[tab] = handler;
    };

    _canJumpToTab = (canJumpToTab) => this.setState({canJumpToTab});

    render() {
        return (
            <SearchBarContext.Provider value={this.state.contextProvider}>
                {this.props.children(this.searchBarAnimation, {
                    canJumpToTab: this.state.canJumpToTab
                })}
            </SearchBarContext.Provider>
        );
    }
}
