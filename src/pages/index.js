import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import BgImg from '../components/background'
import Helmet from 'react-helmet'

const IndexPage = ({data}) =>  {

  const projects = data.allContentfulProject.edges;
  const page = data.contentfulHome;

  return (
    <div>

      <Helmet>
        <title>Ryan Wiemer</title>
        <meta name="description" content="RW" />
        <meta property="og:title" content="RW"/>
        <meta property="og:image" content="" />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="1200" />
      </Helmet>

      <section className="bio grid">

        <div className="bio__img cell cell--third">
          <Img sizes={page.profileImage.sizes} alt={page.profileImage.title} title={page.profileImage.title} />
        </div>

        <div  className="bio__container cell cell--two-thirds">
          <h2>Hi. <span className="emoji emoji--hand">👋</span></h2>
          <div className="bio__text cell" dangerouslySetInnerHTML={{ __html: page.bioShort.childMarkdownRemark.html }}/>
          <ul className="bio__social">
            <li><a target="_blank" href="https://github.com/ryanwiemer">GitHub</a></li>
            <li><a target="_blank" href="https://www.linkedin.com/in/ryanwiemer">LinkedIn</a></li>
            <li><a href="mailto:ryan@ryanwiemer.com">Email</a></li>
          </ul>
        </div>

      </section>

      <section className="work">
        <ul className="work__list">
          {projects.map(({ node: project, index }) => (
            <li key={project.id} className="grid">
                <div className="cell cell--half">
                  <Link to={project.slug}><h3 className="work__title">{project.title}</h3></Link>
                  <div className="work__description" dangerouslySetInnerHTML={{ __html: project.description.childMarkdownRemark.html }} />
                  {project.awards && (
                    <ul className="work__awards">
                      {project.awards.map(({ awards, index }) => (
                        <li key={project.awards.id}>{project.awards}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="cell cell--half">
                  {project.url && (<a className="work__live cell btn" href={project.url} target="_blank"><span></span>View Site</a>)}
                  <Link className="work__read cell btn" to={project.slug}>Info</Link>
                </div>
            </li>
            ))}
        </ul>
      </section>

    </div>
  )
}

export const query = graphql`
  query HomeQuery {
    contentfulHome {
      title
      profileImage {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_noBase64
        }
      }
      bioShort {
        childMarkdownRemark {
          html
        }
      }
      bioLong {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulProject(limit: 1000, sort: {fields: [date], order: DESC}) {
      edges {
        node {
          title
          slug
          id
          description {
            childMarkdownRemark {
              html
            }
          }
          date
          url
          sourceCode
          awards
          cover {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
  }
`

export default IndexPage
