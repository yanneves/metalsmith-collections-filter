'use strict'

const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const { expect } = require('chai')
const { name } = require('../package.json')
const plugin = require('../lib/')

describe(name, () => {
  let metalsmith

  beforeEach(() => {
    metalsmith = Metalsmith('test/fixtures/basic/')
  })

  it('should explicitly filter using a function', done => {
    metalsmith
      .use(collections())
      .use(plugin({ articles: titleBeginsWithT }))
      .build(err => {
        if (err) return done(err)
        expect(metalsmith.metadata().articles).to.have.lengthOf(2)
        done()
      })

    function titleBeginsWithT(article) {
      article = article.title[0]
      return article.toLowerCase() === 't'
    }
  })

  it('should infer filter using an object', done => {
    metalsmith
      .use(collections())
      .use(plugin({ articles: { featured: true } }))
      .build(err => {
        if (err) return done(err)
        expect(metalsmith.metadata().articles).to.have.lengthOf(1)
        done()
      })
  })

  it('should infer filter using an array', done => {
    metalsmith
      .use(collections())
      .use(plugin({ articles: ['featured', true] }))
      .build(err => {
        if (err) return done(err)
        expect(metalsmith.metadata().articles).to.have.lengthOf(1)
        done()
      })
  })

  it('should infer filter using a string', done => {
    metalsmith
      .use(collections())
      .use(plugin({ articles: 'featured' }))
      .build(err => {
        if (err) return done(err)
        expect(metalsmith.metadata().articles).to.have.lengthOf(1)
        done()
      })
  })

  it('should enable the creation of dedicated collections', done => {
    metalsmith
      .use(collections({ featuredArticles: '*.md' }))
      .use(plugin({ featuredArticles: articleAndFeatured }))
      .build(err => {
        if (err) return done(err)
        expect(metalsmith.metadata().featuredArticles).to.have.lengthOf(1)
        done()
      })

    function articleAndFeatured(article) {
      return article.collection.includes('articles') && article.featured
    }
  })

})
