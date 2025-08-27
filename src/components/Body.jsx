import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Feed from './Feed';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../store/feedSlice';
import FeedStack from './FeedStack';

const Body = () => {
  const user = useSelector(store => store.user);
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res.data.feedUser));
    } catch (err) {
      console.log("Feed fetch error:", err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
     return;
    }

    if (!feed) {
      fetchFeed();
    }

   
  }, [user, feed, navigate]);



  if (!user || !feed ) {
    return <div>loading....</div>;
  }
  if(feed.length === 0){
    return <div>No user Available</div>
  }

  return (
    <div >
      <div className='flex flex-col justify-center items-center gap-2 mt-2'>
        <FeedStack users={feed} />
        {/* {feed.map((f, index) => (
          <Feed key={index} user={f} />
        ))} */}
      </div>
    </div>
  );
};

export default Body;
