import {useState, useEffect} from 'react'

import {AiFillGithub, AiOutlinePlus} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import {FaUser} from 'react-icons/fa'

import EachRepository from './components/eachRepository'

import './App.css'

const App = () => {
  const [reposList, changeList] = useState([])
  const [pageNumber, changePageNumber] = useState(1)

  useEffect(() => {
    const getRepos = async () => {
      const url = `https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${pageNumber}`
      const details = await fetch(url)
      const finalDetails = await details.json()

      if (details.ok === true) {
        const Item = finalDetails.items
        const list = Item.map(item => ({
          id: item.id,
          avatar: item.owner.avatar_url,
          owner: item.owner.login,
          name: item.name,
          htmlUrl: item.html_url,
          description: item.description,
          starCount: item.stargazers_count,
          openIssuesCount: item.open_issues_count,
          createdAt: item.created_at,
        }))

        changeList(list)
      }
    }

    getRepos()
  }, [pageNumber])

  const previousPage = () => {
    if (pageNumber > 1) {
      changePageNumber(prevState => prevState - 1)
    }
  }

  const nextPage = () => {
    changePageNumber(prevState => prevState + 1)
  }

  const showList = () => (
    <ul className="ulList">
      {reposList.map(eachItem => (
        <EachRepository items={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )

  return (
    <>
      <div className="background">
        <div className="topSection">
          <AiFillGithub className="icon" />

          <div className="rightSection">
            <IoMdNotifications className="icon1" />
            <AiOutlinePlus className="icon1" />
            <FaUser className="icon1" />
          </div>
        </div>
        <div className="designs">
          <div className="topDesign">
            <h1 className="top">TOP</h1>
            <AiFillGithub className="icon2" />
            <h1 className="topRepository">Repository</h1>
          </div>
          <div className="pageNumberBox">
            <button onClick={previousPage} type="button">
              Previous
            </button>
            <p className="pageNumber">{pageNumber}</p>
            <button onClick={nextPage} type="button">
              Next
            </button>
          </div>
        </div>
      </div>

      {showList()}
    </>
  )
}

export default App
