import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context.js";
import './reviews.css';

function Reviews() {
    const { store } = useContext(Context);
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [text, setText] = useState("");
    const [rate, setRate] = useState(1);
    const [creationOpened, setCreationOpened] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const getReviews = async () => {
            const revs = await store.getReviews();
            if (revs) {
                setReviews(revs);
                setFilteredReviews(revs);
            }
        };

        getReviews();
    }, [store]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleCreate = async () => {
        const response = await store.createReview(store.user.username, text, rate);
        if (response) {
            setCreationOpened(false);
            const updatedReviews = await store.getReviews();
            setReviews(updatedReviews);
            setFilteredReviews(updatedReviews);
        }
    };

    const cancelSearch = () => {
        setSearchValue('');
        setFilteredReviews(reviews);
    };

    const search = () => {
        if (searchValue.trim() === '') {
            setFilteredReviews(reviews);
        } else {
            const lowerSearchValue = searchValue.toLowerCase();
            const filtered = reviews.filter((r) => r.text.toLowerCase().includes(lowerSearchValue));
            setFilteredReviews(filtered);
        }
    };

    const handleFilter = () => {
        const sorted = [...reviews].sort((a, b) => a.text.localeCompare(b.text));
        setFilteredReviews(sorted);
    };

    const handleFilterR = () => {
        const sorted = [...reviews].sort((a, b) => b.text.localeCompare(a.text));
        setFilteredReviews(sorted);
    };

    return (
        <div className='reviews'>
            {!creationOpened && store.isAuth && (
                <>
                    <button
                        className='createReviewBtn'
                        onClick={() => setCreationOpened(true)}
                    >
                        Create Review
                    </button>
                    <input
                        value={searchValue}
                        type='text'
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search reviews...'
                    />
                    <button onClick={search}>
                        Search
                    </button>
                    <button onClick={cancelSearch}>
                        Cancel
                    </button>
                    <button onClick={handleFilter}>
                        A-Z
                    </button>
                    <button onClick={handleFilterR}>
                        Z-A
                    </button>
                </>
            )}
            <ul className='reviewsList'>
                {filteredReviews && filteredReviews.map((review, index) => (
                    <li
                        key={`${review.text}-${index}`}
                        className='review'
                    >
                        <p>{review.username}: {review.rate} ({formatDate(parseInt(review.date))})</p>
                        <p>{review.text}</p>
                    </li>
                ))}
            </ul>
            {creationOpened && (
                <div
                    className='backgroundModal'
                    onClick={() => setCreationOpened(false)}
                >
                    <div className='modalCreate' onClick={(e) => e.stopPropagation()}>
                        <textarea
                            className='reviewInput'
                            value={text}
                            maxLength={500}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <input
                            type='number'
                            max={5}
                            min={1}
                            className='inputRate'
                            value={rate}
                            onChange={(e) => setRate(parseInt(e.target.value))}
                        />
                        <button
                            className='create'
                            onClick={handleCreate}
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default observer(Reviews);
