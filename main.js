import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx'
import { RepeatSinglePost } from "../../components/Banners/SinglePost/RepeatSinglePost";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Filter } from '../../components/Filter/Filter';
import Spinner from '../../components/Spinner';
import VenuesFilter from '../../components/Filter/VenuesFilter';
import OffersFilter from '../../components/Filter/OffersFilter';
import TopBannerSlider from '../../banner_zones/TopBannerSlider1';
import BannerZone1 from '../../banner_zones/BannerZone1';
import BannerZone2 from '../../banner_zones/BannerZone2';
import BannerZone3 from '../../banner_zones/BannerZone3';
import {getCompletedFilterFields} from '../../utils';
import {Button} from '../../components/UI/Button/Button';

import { EVENTS_DATE_OPTIONS, OFFERS_EXPIRY_TIME_OPTIONS, OFFERS_PRICE_OPTIONS, EVENTS_LIMIT, VENUES_LIMIT, OFFERS_LIMIT } from '../../const/common'

const Main = ({ eventStore, venuesStore, offersStore, filterDataStore }) => {
    const history = useHistory();

    const [eventsFilter, setEventsFilter] = useState({ date: null, categoryId: null, tags: null });
    const [venuesFilter, setVenuesFilter] = useState({ categoryId: null, rating: null });
    const [offersFilter, setOffersFilter] = useState({ categoryId: null, expiry_time: null, price: null });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        filterDataStore.getFilterData();
        eventStore.getEventsList({ limit: EVENTS_LIMIT });
        venuesStore.getVenuesList({ limit: VENUES_LIMIT });
        offersStore.getOffersList({ limit: OFFERS_LIMIT });
        setIsMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        isMounted && eventStore.getEventsList({ ...getCompletedFilterFields(eventsFilter), limit: EVENTS_LIMIT });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventsFilter]);

    useEffect(() => {
        isMounted && venuesStore.getVenuesList({ ...getCompletedFilterFields(venuesFilter), limit: VENUES_LIMIT });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [venuesFilter])

    useEffect(() => {
        isMounted && offersStore.getOffersList({ ...getCompletedFilterFields(offersFilter), limit: OFFERS_LIMIT });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offersFilter])

    const changeEventsFilter = (item, field) => {
        setEventsFilter(prevState => ({ ...prevState, [field]: item.id }))
    }

    const changeVenuesFilter = (item, field) => {
        setVenuesFilter(prevState => ({ ...prevState, [field]: item.id }))
    }

    const changeOffersFilter = (item, field) => {
        setOffersFilter(prevState => ({ ...prevState, [field]: item.id }))
    }

    const getTagsIdByName = (tags, original) => {
        const result = [];
        if (tags.indexOf('any tags') === -1) {
            original.forEach(el => {
                if (tags.indexOf(el.name) !== -1) {
                    result.push(el.id)
                }
            });
        }

        return result;
    }

    const { filterCategory, filterTags } = toJS(filterDataStore.filterData);
    const _events = toJS(eventStore)
    const _venues = toJS(venuesStore)
    const _offers = toJS(offersStore)

    return (
        <div>
            <TopBannerSlider />
            <Wrapper>
                {filterCategory?.events ? (
                    <Filter
                        title='Upcoming Events'
                        categoryOnChange={event => changeEventsFilter(event.target.value, 'categoryId')}
                        dateOnChange={event => changeEventsFilter(event.target.value, 'date')}
                        tagsOnChange={event => setEventsFilter(prevState => ({ ...prevState, tags: getTagsIdByName(event.target.value, filterTags.events) }))}
                        dateOption={EVENTS_DATE_OPTIONS}
                        categoryOption={[{ name: 'any category', id: null }, ...filterCategory?.events]}
                        tagsOption={['any tags', ...filterTags?.events.map(el => el.name)]}
                    />
                ) : null}
                {!_events.eventsList || _events.isLoading ? <Spinner /> : (
                    <>
                        {_events.eventsList.length ? (
                            <>
                                <RepeatSinglePost list={_events.eventsList} type='events' />
                                <div className='wrapper-for-many-post-more'>
                                    <Button onClick={() => history.push('/events')}>Load more...</Button>
                                </div>
                            </>
                        ) : <h1>No events</h1>}
                    </>
                )}
                <BannerZone1 />
                {filterCategory?.venues ? (
                    <VenuesFilter
                        title='Venues'
                        categoryOnChange={event => changeVenuesFilter(event.target.value, 'categoryId')}
                        categoryOption={[{ name: 'any category', id: null }, ...filterCategory?.venues]}
                    />
                ) : null}
                {!_venues.venuesList || _venues.isLoading ? <Spinner /> : (
                    <>
                        {_venues?.venuesList.length ? (
                            <>
                                <RepeatSinglePost list={_venues.venuesList} type='venues' />
                                <div className='wrapper-for-many-post-more'>
                                    <Button onClick={() => history.push('/venues')}>Load more...</Button>
                                </div>
                            </>
                        ) : <h1>No venues</h1>}
                    </>
                )}
                <BannerZone2 />
                {filterCategory?.offers ? (
                    <OffersFilter
                        title='Offers'
                        categoryOnChange={event => changeOffersFilter(event.target.value, 'categoryId')}
                        expiryTimeOnChange={event => changeOffersFilter(event.target.value, 'expiry_time')}
                        priceOnChange={event => changeOffersFilter(event.target.value, 'price')}
                        categoryOption={[{ name: 'any category', id: null }, ...filterCategory?.offers]}
                        expiryTimeOption={OFFERS_EXPIRY_TIME_OPTIONS}
                        priceOption={OFFERS_PRICE_OPTIONS}
                    />
                ) : null}
                {!_offers.offersList || _offers.isLoading ? <Spinner /> : (
                    <>
                        {_offers?.offersList.length ? (
                            <>
                                <RepeatSinglePost list={_offers.offersList} type='offers' />
                                <div className='wrapper-for-many-post-more'>
                                    <Button onClick={() => history.push('/offers')}>Load more...</Button>
                                </div>
                            </>
                        ) : <h1>No offers</h1>}
                    </>
                )}
                <BannerZone3 />

            </Wrapper>
        </div>
    )
}

export default inject('eventStore', 'venuesStore', 'offersStore', 'filterDataStore')(observer(Main));