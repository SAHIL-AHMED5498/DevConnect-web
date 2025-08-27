import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeedUser } from '../store/feedSlice'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const FeedStack = ({ users }) => {
  const dispatch = useDispatch()
  const [cards, setCards] = useState(users)

  const handleRequest = async (status, _id) => {
    const fetchurl = `${BASE_URL}/request/send/${status}/${_id}`
    await axios.post(fetchurl, {}, { withCredentials: true })
    dispatch(removeFeedUser(_id))
    setCards(prev => prev.filter(u => u._id !== _id))
  }

  const swipe = (direction, _id) => {
    const x = direction === 'right' ? 300 : -300
    setCards(prev =>
      prev.map(u =>
        u._id === _id ? { ...u, leaving: true, x } : u
      )
    )
    setTimeout(() => handleRequest(direction === 'right' ? 'interested' : 'ignored', _id), 300)
  }

  return (
    <div className="relative w-80 h-[32rem] flex items-center justify-center">
      <AnimatePresence>
        {cards.map((user, index) => (
          <motion.div
            key={user._id}
            className="absolute"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
              zIndex: cards.length - index
            }}
            exit={{ x: user.x || 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card bg-base-300 w-80 shadow-sm">
              <figure>
                <img
                  className="w-full h-60 object-cover rounded-lg"
                  src={user.profileImg}
                  alt="Profile-Img"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {user.name} | {user.age}
                </h2>
                <p>{user.about}</p>
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => swipe('left', user._id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => swipe('right', user._id)}
                  >
                    Interested
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedStack
