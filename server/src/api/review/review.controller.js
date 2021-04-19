const { updateRating, getRatings, getReviews, addReview } = require("./review.service");
module.exports = {
    addProductReview: (req, res) => {
        const body = req.body;
        console.log("Add review", body);
        addReview(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            if (results) {
                getRatings(body, async (err, results) => {
                    if (err) {
                        return res.send(err);
                    }
                    // return res.send(results);
                    if (results == null) {
                        return res.send({ rating: 0 })
                    }
                    let average = 0;
                    results.forEach((rating) => {
                        average = average + rating.rating
                    })
                    average = average / results.length;
                    if (!average) {
                        average = 0;
                    }
                    let data = {}
                    data['rating'] = average;
                    data['productID'] = req.body.productID;
                    data['numberofreviews'] = results.length;
                    console.log(data)
                    updateRating(data, async (err, results) => {
                        if (err) {
                            return res.send(err);
                        }
                        return res.send({ message: 'done' })
                    })
                })
            }
        })

    },
    getProductReview: (req, res) => {
        const body = req.body;
        getReviews(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })

    },
};
