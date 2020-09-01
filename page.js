import React from 'react';
import {Wrapper} from "../../components/Wrapper/Wrapper";
import {IconContext} from "react-icons";
import MediaQuery from "react-responsive";
import {EveningWith} from "../EventDetails-old/components/EveningWith";
import Slider from "react-slick";
import {SinglePost} from "../../components/Banners/SinglePost/SinglePost";
import { MdShare } from 'react-icons/md';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaExternalLinkAlt } from 'react-icons/fa';

class VenuesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 1001,
        }
    }
    handleResizePage = () => {
        this.setState({windowWidth: window.innerWidth});
    };

    componentDidMount() {
        this.setState({windowWidth: window.innerWidth});
        window.addEventListener('resize', this.handleResizePage);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResizePage);
    }

    render() {
        const { windowWidth } = this.state;
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: windowWidth < 1000 ? 1 : 2,
            slidesToScroll: 1
        };
        return (
            <div className='event-ticket-container'>
                <div className='event-ticket-header'>
                    <Wrapper innerClasses='event-ticket-_header'>
                        <div className='event-ticket-share'>
                            <IconContext.Provider value={{size: '25px'}}>
                                <MdShare/>
                            </IconContext.Provider>
                            <span>
                                Share event
                            </span>
                        </div>
                        <div className='event-ticket-like'>
                            <IconContext.Provider value={{size: '25px'}}>
                                <IoMdHeartEmpty/>
                            </IconContext.Provider>
                            <span>
                                Add to favourites
                            </span>
                        </div>
                    </Wrapper>
                </div>

                <div className='event-ticket-logo'>
                    <img
                        src='https://cdn.platinumlist.net/upload/event/promo/10133_lt_platinum_04_1600x615-01586383873.jpg'
                        alt=''/>
                </div>

                <Wrapper innerClasses='class-for-wrapper'>
                    <div className='ticket-info'>
                        <span className='ticket-info-title'>LOUIS TOMLINSON WORLD TOUR 2020</span>
                        <span className='ticket-info-info'>More info</span>
                        <span className='ticket-info-description'>
                            Louis Tomlinson will play Coca-Cola Arena as part of his Walls World Tour 2020.

                            As a member of One Direction, Louis has sold over 100 million records. Overall Louis’s solo music has garnered over a billion streams after breaking out as a solo artist to huge success in 2018. The Walls World Tour will see Tomlinson touring for the first time as a solo artist and promises to be a night to remember for fans in Dubai.
                        </span>
                        <div className='event-ticket-location'>
                            <span>Location</span>
                            <div className='event-map-container'>
                                <a href='https://www.google.com/maps?q=25.2037969,55.2658814&z=17'>
                                    <img
                                        className='map-image'
                                        src='https://platinumlist.net/static-map?entity=venue&size=510x240&zoom=11&scale=2&ids=6351'
                                        alt=''/>
                                </a>
                                <div className='event-location-info'>
                                    <span>Coca-Cola Arena</span>
                                    <span>City Walk</span>
                                    <a href=''>
                                        show in google maps
                                        <IconContext.Provider value={{size: '12px'}}>
                                            <FaExternalLinkAlt/>
                                        </IconContext.Provider>
                                    </a>

                                    <MediaQuery maxWidth={1000}>
                                        <EveningWith
                                            image='https://cdn.platinumlist.net/upload/artist/louis_tomlinson_994-mobilemiddle1572183980.png'
                                            name='Louis Tomlinson'
                                            followers={108}/>
                                    </MediaQuery>
                                </div>

                            </div>
                        </div>
                        <div className='comment-for-event'>
                            <span>Comment</span>
                            <div className="fb-comments"
                                 data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                                 data-numposts="5"
                                 data-width="100%"/>
                        </div>

                        <div style={{
                            maxWidth: 770,
                            maxHeight: 500
                        }}>
                            <Slider {...settings} className="slider-arrow-hover bottom-margin">
                                <div className="blog-item item">
                                    <SinglePost
                                        price={250.00}
                                        eventStartDate='Fri 27 Nov'
                                        name='Test name 1'
                                        photoUrl='https://cdn.platinumlist.net/upload/event/iron_maiden_legacy_of_the_beast_tour_2020_may_27_coca_cola_arena_77680-middle1586254417.jpg'/>
                                </div>
                                <div className="blog-item item">
                                    <SinglePost
                                        price={250.00}
                                        eventStartDate='Fri 27 Nov'
                                        name='Test name 2'
                                        photoUrl='https://cdn.platinumlist.net/upload/event/russ_live_in_dubai_2020_nov_27_coca_cola_arena_77744-middle1586254432.jpg'/>
                                </div>
                                <div className="blog-item item">
                                    <SinglePost
                                        price={250.00}
                                        eventStartDate='Fri 27 Nov'
                                        name='Test name 3'
                                        photoUrl='https://cdn.platinumlist.net/upload/event/iron_maiden_legacy_of_the_beast_tour_2020_may_27_coca_cola_arena_77680-middle1586254417.jpg'/>
                                </div>
                                <div className="blog-item item">
                                    <SinglePost
                                        price={250.00}
                                        eventStartDate='Fri 27 Nov'
                                        name='Test name 4'
                                        photoUrl='https://cdn.platinumlist.net/upload/event/iron_maiden_legacy_of_the_beast_tour_2020_may_27_coca_cola_arena_77680-middle1586254417.jpg'/>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div style={{ height: '100%' }}>
                        <MediaQuery minWidth={1000}>
                            <EveningWith
                                image='https://cdn.platinumlist.net/upload/artist/louis_tomlinson_994-mobilemiddle1572183980.png'
                                name='Louis Tomlinson'
                                followers={108}/>
                        </MediaQuery>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

export default VenuesDetails;