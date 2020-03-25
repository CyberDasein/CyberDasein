import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../redux/actions';
import Post from './Post';

export default () => {
    const dispach = useDispatch()
    const posts = useSelector((state)=> {
        return state.posts.fetchedPosts
    })
    const loading = useSelector(state => state.app.loading)

    if (loading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    if(!posts.length) {
        return <button 
        onClick={() => dispach(fetchPosts())}
        className="btn btn-primary">Загрузить</button>
    } 
    return posts.map(post => <Post post={post} key={post.id}/>)
}