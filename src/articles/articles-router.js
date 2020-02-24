const express = require('express')
const ArticlesService = require('./articles-service')
const xss = require('xss')

const articlesRouter = express.Router()
const jsonParser = express.json()

articlesRouter
  .route('/')
  .get((req, res, next) => {
    ArticlesService.getAllArticles(
      req.app.get('db')
    )
      .then(articles => {
        res.json(articles)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content, style } = req.body
    const newArticle = { title, content, style }
    ArticlesService.insertArticle(
      req.app.get('db'),
      newArticle
    )
      .then(article => {
        res
          .status(201)
          .location(`/articles/${article.id}`)
          .json(article)
      })
      .catch(next)
  })

  //add describe and test for this endpoind that creates articles
//if the POST request has a valid body then the article should be
//inserted into the database and the response should have a 201 status


articlesRouter
  .route('/:article_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ArticlesService.getById(knexInstance, req.params.article_id)
      .then(article => {
        if (!article) {
          return res.status(404).json({
            error: { message: `Article doesn't exist` }
          })
        }
        res.json(article)
        res.json({
            id: article,id,
            style: article,style,
            title: xss(article.title), //sanitize these because it came from the user
            content:xss(artcle.content),
            date_published: article.date_published,
        })
      })
      .catch(next)
  })
        .delete((req, res, next) => {
            ArticlesService.deleteArticle(
                     req.app.get('db'),
                     req.params.article_id
               )
                     .then(() => {
                       res.status(204).end()
                     })
                     .catch(next)
                  })

module.exports = articlesRouter