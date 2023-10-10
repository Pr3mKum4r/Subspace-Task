const axios = require('axios');
const lodash = require('lodash');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const blogDataURL = process.env.BLOG_DATA_URL;
const adminSecret = process.env.ADMIN_SECRET;

exports.getBlogStats = (req, res, next) => {
    axios.get(blogDataURL, {
        headers: {
            'x-hasura-admin-secret': adminSecret,
        },
    })
        .then(response => {

            const blogData = response.data.blogs;

            const totalBlogs = blogData.length;

            const blogWithLongestTitle = lodash.maxBy(blogData, blog => blog.title.length);

            const numberOfBlogsWithPrivacyTitle = lodash.filter(blogData, blog =>
                lodash.includes(lodash.toLower(blog.title), 'privacy')
            ).length;

            const uniqueBlogTitles = lodash.uniqBy(blogData, blog => lodash.toLower(blog.title));

            res.json({
                totalBlogs,
                blogWithLongestTitle,
                numberOfBlogsWithPrivacyTitle,
                uniqueBlogTitles,
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error fetching blog data' });
        });
}

exports.getBlog = (req, res, next) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is missing' });
    }

    axios.get(blogDataURL, {
        headers: {
            'x-hasura-admin-secret': adminSecret,
        },
    })
        .then(response => {
            const blogData = response.data.blogs;

            const searchResults = blogData.filter(blog =>
                lodash.toLower(blog.title).includes(lodash.toLower(query))
            );

            res.json(searchResults);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error fetching blog data' });
        });
}


