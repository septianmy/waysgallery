const { users, photos, posts: Posts } = require("../../models");
const Joi = require('joi');
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: photos,
                as: "photos",
                limit: 1,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            }, {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(!posts){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    posts: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Posts successfully get",
            data : {
                posts
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error",
            },
        });
    }
};

exports.getPostDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Posts.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                id,
            },
            include: [{
                model: photos,
                as: "photos",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            }, {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(!post){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    post: null,
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Post successfully get",
            data : {
                post
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error Posts",
            },
        });
    }
};

exports.addPost = async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    const file = req.files;
    try {
        const schema = Joi.object({
            title: Joi.string().required('Title is required'),
            description: Joi.string().required('Description is required'),
            photos: Joi.string().required('Please select at least one photo'),
          });
      
        const { error } = schema.validate({ ...req.body, photos: file.photos[0].path }, { abortEarly: false });
        if (error) {
            return res.status(400).send({
              status: 'failed',
              message: error.details[0].message,
              errors: error.details.map((detail) => detail.message),
            });
        }

        const post = await Posts.create({
            title: body.title,
            description: body.description,
            createdBy : id,
            userId: id,
        });
      
        if (!post) {
            return res.status(400).json({
              status: 'failed',
              message: 'Failed to add post please try again',
            });
        }

        const photo = async () => {
            return Promise.all(
              file.photos.map(async (image) => {
                let imageName = `${image.fieldname}/${image.filename}`;
                const postphoto = await photos.create({
                  postId: post.id,
                  image: imageName,
                });
              })
            );
          };
          photo().then(async () => {
            const response = await Posts.findOne({
              where: { id: post.id },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
                },
                include: [{
                    model: photos,
                    as: "photos",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                }, {
                    model: users,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                }]
            });
      
            res.status(200).json({
              status: 'success',
              message: 'Post Successfully Added',
              data: {
                post: response,
              },
            });
          });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error",
            },
        });
    }
}