import moment from 'moment'
import {RiArrowRightCircleFill} from 'react-icons/ri'
import {IoArrowDownCircle} from 'react-icons/io'

import './index.css'

const EachRepository = props => {
  const {items} = props
  const {
    avatar,
    owner,
    name,
    htmlUrl,
    description,
    starCount,
    openIssuesCount,
    createdAt,
  } = items

  const dateTimeAgo = moment(new Date(createdAt)).fromNow()
  const names = name.charAt(0).toUpperCase() + name.slice(1)
  const ownerName = owner.charAt(0).toUpperCase() + owner.slice(1)

  return (
    <li className="eachListItem">
      <div className="leftBox">
        <img src={avatar} className="avatar" alt={name} />
        <div className="rightSection">
          <h1 className="repoName">{names}</h1>
          <p className="description">{description}</p>
          <div className="bottomSection">
            <div className="starIssueBox">
              <p className="stars">{`Stars : ${starCount}`}</p>
              <p className="stars">{`Issues : ${openIssuesCount}`}</p>
            </div>
            <p>{`Last published ${dateTimeAgo} by ${ownerName}`}</p>
          </div>
        </div>
      </div>
      <RiArrowRightCircleFill className="rightArrow" />
    </li>
  )
}

export default EachRepository
