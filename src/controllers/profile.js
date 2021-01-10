const { users, posts, arts, photos } = require("../../models");
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getProfile = async (req,res) => {
    try {
        const {id} = req.params
        const user = await users.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: {
                id,
            },
            include : [{
                model: posts, as: "posts", attributes :['id','title','description'],
                limit:1,
                order: [['createdAt','DESC']],
                include: [{model:photos, as: "photos", separate:true, attributes:['id','image'], limit:1}]
            },{
                model: arts, 
                as: "arts", 
                attributes:['id','image'],
                order:[['createdAt', 'DESC']],
            }],
            
        });

        if(!user){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    user: null,
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "User successfully get",
            data : {
                user
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

exports.editProfile = async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    const file = req.files;

    console.log("ini Body", body);
    console.log("ini file", file.avatar)
    try {
        const checkUser = await users.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: {
                id,
            },
        });

        if(!checkUser){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    user: null,
                }
            });
        }
       
        const updateUser = await users.update(
            {
              ...body,
              avatar: file.avatar ? `${file.avatar[0].fieldname}/${file.avatar[0].filename}` : checkUser.dataValues.avatar,
            },
            {
              where: {
                id,
              },
            }
          );
      
          if (!updateUser) {
            return res.status(400).json({
              status: 'failed',
              message: 'Failed to edit user profile',
            });
          }

        const getUserAfterUpdate = await users.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: {
                id,
            },
        });

        res.send({
            status: responseSuccess,
            message: "User successfully update",
            data : {
                getUserAfterUpdate
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

exports.addArt = async (req,res) => {
    const {id} = req.params;
    const file = req.files;

    console.log("ini file", file)
    try {
        const checkUser = await users.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: {
                id,
            },
        });

        if(!checkUser){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    user: null,
                }
            });
        }

        const art = async () => {
            return Promise.all(
              file.arts.map(async (image) => {
                let imageName = `${image.fieldname}/${image.filename}`;
                const addingart = await arts.create({
                  userId: id,
                  image: imageName,
                });
              })
            );
          };
          art().then(async () => {
            const response = await users.findOne({
              where: { id },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
                },
                include: [{
                    model: arts, as: "arts", attributes:['id','image']
                }]
            });
        
            res.status(200).json({
                status: 'success',
                message: 'Arts Successfully Added',
                data: {
                  arts: response,
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