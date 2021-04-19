import React, {useState, useEffect} from 'react'
import './CommentSection.css'
import {useSelector} from 'react-redux';
import {currentProduct} from '../features/productSlice';
import {getUser} from '../features/userSlice';
import { Avatar } from '@material-ui/core'
import {db} from '../firebase';
import firebase from 'firebase';
import IndividualComment from './IndividualComment';

const CommentSection = () => {
    const {name} = useSelector(currentProduct);
    const user = useSelector(getUser);
    const [comments,setComments] = useState([]);
    console.log(comments);
    const [focus,setFocus] = useState(false);
    const [term,setTerm] = useState('');
    const inputTerm = term.trim();

    useEffect(() => {
        db.collection('products')
        .doc(name)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        })
    }, [name])


    const makeComment = (e) => {
        e.preventDefault();
        
        if(inputTerm){
            db.collection('products')
            .doc(name)
            .collection('comments')
            .add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                name : user.displayName,
                comment : inputTerm
            })
           setTerm("");
        }
    }

    return (
        <div className="commentSection">
             <hr />
             <h4> 
                 Customer Reviews
                 {comments.length ? <span className="number">{comments.length} Comments</span> : <span className="number">No Comments</span>}
                 {!user && <small className="comment__info">You need to log in to comment<sup>*</sup></small>}
            </h4>
             <div className={`commentSection__input ${focus ? 'input__focus' : ''}`}>
                 <form onSubmit={makeComment}>
                    <Avatar src="" alt="" />
                    <input disabled={!user} onFocus={() => {user && setFocus(true)}} onChange={e => setTerm(e.target.value)} value={term} type="text" placeholder="Add a public comment" />
                 </form>
             </div>
             <div className={`commentSection__btn ${!focus ? 'commentSection__btnHidden' : ''}`}>
                 <button onClick={() => {
                     setFocus(false);
                     setTerm('');
                 }} className="cancel">Cancel</button>
                 <button onClick={makeComment} disabled={!inputTerm} className={`submit ${!term ? 'disabled__btn' : ''}`}>Comment</button>
             </div>
             <div className="commentSection__comments">
                 {comments.map(({id, data}) => {
                    return <IndividualComment key={id} {...data} />
                 })}
             </div>
        </div>
    )
}

export default CommentSection
