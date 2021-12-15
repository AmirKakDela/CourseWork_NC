import Input from 'antd/lib/input';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './searchPage.scss';
import {SearchOutlined} from '@ant-design/icons';
import Genre from "../../Genre/Genre";
import AlbumCard from "../../AlbumCard/AlbumCard";
import {getSearchResult} from "../../../redux/Actions/thunkSearchAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../../redux/Reducers/rootReducer';
import debounce from 'lodash.debounce';
import ArtistCard from "../../ArtistCard/ArtistCard";
import {useSearchParams} from 'react-router-dom';

const SearchPage = () => {
    const dispatch = useDispatch();
    const searchResult = useSelector((state: RootState) => state.search.searchResult);
    const searchError = useSelector((state: RootState) => state.search.error)

    const [searchQuery, setSearchQuery] = useSearchParams();
    const searchString = searchQuery.get('query');

    const [queryValue, setQueryValue] = useState(searchString || '');

    const debouncedGetSearch = useCallback(
        debounce(queryValue => {
            dispatch(getSearchResult(queryValue))
            setSearchQuery({query: queryValue})
        }, 250),

        [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQueryValue(e.target.value);
        debouncedGetSearch(e.target.value);
    }

    useEffect(() => {
        if (searchString !== null && queryValue.trim()) {
            dispatch(getSearchResult(queryValue));
        }
    }, [])

    return (
        <>
            {
                searchError
                    ? <h1 className="search__title">{searchError}</h1>
                    : <div className="search">
                    <Input placeholder="Исполнитель, трек или плейлист" allowClear
                           prefix={<SearchOutlined style={{fontSize: '22px', marginRight: 5}}/>}
                           className="search__input"
                           value={queryValue}
                           onChange={handleChange}
                    />
                    {!queryValue ? <div className="search__content">
                            <h2 className="search__title">Топ жанров</h2>
                            <div className="search__genres-row">
                                <Genre genreName={'Hip-hop'}/>
                                <Genre genreName={'Pop'}/>
                                <Genre genreName={'Dance'}/>
                            </div>
                            <h2 className="search__title">Популярные плейлисты и альбомы</h2>
                            <div className="search__other">
                                <AlbumCard/>
                                <AlbumCard/>
                                <AlbumCard/>
                                <AlbumCard/>
                                <AlbumCard/>
                            </div>
                        </div> :

                        <div className="search__content">
                            <h2 className="search__title">Треки</h2>
                            <div className="search__songs">

                                {searchResult.songs && searchResult.songs.map(song => {
                                    // todo: вместо парагрфа будем возвращать комопонент песни
                                    return <div className="song" key={song._id}>{song.artist} - {song.name}</div>
                                })}

                            </div>
                            <h2 className="search__title">Исполнители</h2>
                            {searchResult.artists.length ? <div className="search__genres-row">
                                {searchResult.artists.map(art => {
                                    return (<ArtistCard key={art._id} artist={art}/>)
                                })}

                            </div>: null}
                            <h2 className="search__title">Плейлисты</h2>
                            <div className="search__other">

                            </div>
                        </div>}
                </div>
            }
        </>
    );
};

export default SearchPage;
