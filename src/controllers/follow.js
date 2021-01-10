const { users, follows, posts, photos } = require("../../models");
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.checkFollowing = async (req,res) => {
    const userId = req.user.id;
    const followId = req.params.id;
    try {
        const checkingFollow = await follows.findOne({
            where: {
                userId : userId,
                followId : followId,
            }
        });

        if(!checkingFollow){
            return res.send({
                status: resourceNotFound,
                data: {
                    follow: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Data successfully get",
            data : {
                follow : [checkingFollow]
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

exports.getPostByFollowng = async (req,res) => {
    const userId = req.params.id;

    try {
        const postsbyfollow = await follows.findAll({
            where: {
                userId : userId,
            },
            attributes: ['userId','followId'],
            include: [{
                model: users,
                as: "users",
                attributes: ['id','fullname'],
                include: [{
                    model:posts, 
                    as: "posts", 
                    separate:true,
                    attributes: ['id','title'],
                    include: [{model:photos, as: "photos", separate:true, attributes:['id','image'], limit:1}]
                }]
            }]
        });

        if(!postsbyfollow){
            return res.send({
                status: resourceNotFound,
                data: {
                    posts: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Data successfully get",
            data : {
                postsbyfollow
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
}

exports.following = async (req,res) => {
    const userId = req.user.id;
    const followId = req.body.id;
    try {
        const checkingFollow = await follows.findOne({
            where: {
                userId : userId,
                followId : followId,
            }
        });

        if(!checkingFollow){
            const followUser = await follows.create({
                userId : userId,
                followId : followId,
            })

            res.send({
                status: responseSuccess,
                message: "Follow Success",
                data : {
                    followUser
                },
            });
        };
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error",
            },
        });
    }
};

exports.unfollowing = async (req,res) => {
    const userId = req.user.id;
    const followId = req.params.id;
    try {
        const checkingFollow = await follows.findOne({
            where: {
                userId : userId,
                followId : followId,
            }
        });

        if(!checkingFollow) {
            return res.status(400).send({
                status: resourceNotFound,
                message : `Follow with Follow id: ${followId} not found`,
                data: {
                    Follow: null,
                },
            });
        }
    
        await follows.destroy({
            where : {
                userId : userId,
                followId : followId,
            },
        });

        res.send({
            status: responseSuccess,
            message: `Unfollow Success`,
            data : {
                Unfollow : followId,
            }
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