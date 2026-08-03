import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Dealer = () => {
    const [dealer, setDealer] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const get_dealer = async () => {
        const res = await fetch(`/djangoapp/dealer/${id}`);
        const retobj = await res.json();
        if (retobj.status === 200) {
            setDealer(retobj.dealer);
        }
    };

    const get_reviews = async () => {
        const res = await fetch(`/djangoapp/reviews/dealer/${id}`);
        const retobj = await res.json();
        if (retobj.status === 200) {
            setReviews(retobj.reviews);
        }
    };

    useEffect(() => {
        get_dealer();
        get_reviews();
    }, [id]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>{dealer.full_name}</h2>
            <p>{dealer.city}, {dealer.address}, Zip: {dealer.zip}, {dealer.state}</p>
            <hr />
            <h3>Reviews</h3>
            {reviews.map(review => (
                <div key={review.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
                    <h4>{review.name} ({review.car_make} {review.car_model} - {review.car_year})</h4>
                    <p>{review.review}</p>
                    <p><strong>Sentiment:</strong> {review.sentiment}</p>
                </div>
            ))}
            <a href={`/postreview/${id}`}>
                <button style={{ marginTop: '10px' }}>Post a Review</button>
            </a>
        </div>
    );
}

export default Dealer;