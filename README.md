# metalsmith-collections-filter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
A plugin to filter items in a Metalsmith collection.

## Features

- filters out items from a collection using predicate test
- supports filters defined as a `Function`
- supports filters defined as an `Object`
- supports filters defined as an `Array`
- supports filters defined as a `String`

## Installation

```bash
$ npm install --save-dev metalsmith-collections-filter
```

## Usage

### Configure your build

```javascript
import filterCollections from 'metalsmith-collections-filter'

metalsmith
  .use(collections())
  .use(filterCollections({
    articles: function(article) {
      return article.featured
    }
  }))
```

Optionally define simple filters with an object

```javascript
metalsmith.use(filterCollections({
  articles: { featured: true }
}))
```

Or as an array

```javascript
metalsmith.use(filterCollections({
  articles: ['featured', true]
}))
```

Filters matching a boolean value can also be defined as a string

```javascript
metalsmith.use(filterCollections({
  articles: 'featured'
}))
```

Dedicated collections can be defined and then filtered

```javascript
metalsmith
  .use(collections({ featuredArticles: '*.md' }))
  .use(filterCollections({
    featuredArticles: function(article) {
      return article.collection.contains('articles') &&
        article.featured
    }
  }))
```

## CLI Usage

Filters cannot be defined as functions in the Metalsmith CLI

```json
{
  "plugins": {
    "metalsmith-collections-filter": {
      "articles": { featured: true }
    }
  }
}
```

## License

MIT License

Copyright (c) 2017 Yann Eves &lt;hello@yanneves.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[npm-image]: https://badge.fury.io/js/metalsmith-collections-filter.svg
[npm-url]: https://npmjs.org/package/metalsmith-collections-filter
[travis-image]: https://travis-ci.org/yanneves/metalsmith-collections-filter.svg?branch=master
[travis-url]: https://travis-ci.org/yanneves/metalsmith-collections-filter
[daviddm-image]: https://david-dm.org/yanneves/metalsmith-collections-filter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yanneves/metalsmith-collections-filter
