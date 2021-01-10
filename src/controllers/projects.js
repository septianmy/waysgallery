const { hiring, project_photos, projects: Projects } = require("../../models");
const Joi = require('joi');
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getProjectDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const project = await Projects.findOne({
            attributes: ['description'],
            where: {
                hiringId : id,
            },
            include: [{
                model: project_photos,
                as: "photos",
                attributes: ['image'],
            }],
        });

        if(!project){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    project: null,
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Project successfully get",
            data : {
                project
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

exports.addProject = async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    const file = req.files;
    try {
        const schema = Joi.object({
            description: Joi.string().required('Description is required'),
            projectphotos: Joi.string().required('Please select at least one photo'),
          });
      
        const { error } = schema.validate({ ...req.body, projectphotos: file.projectphotos[0].path }, { abortEarly: false });
        if (error) {
            return res.status(400).send({
              status: 'failed',
              message: error.details[0].message,
              errors: error.details.map((detail) => detail.message),
            });
        }

        const updateOrder = await hiring.update({
            status : 'Finished',
        },{where : { id : id,}});

        const project = await Projects.create({
            description: body.description,
            hiringId: id,
        });
      
        if (!project) {
            return res.status(400).json({
              status: 'failed',
              message: 'Failed to add post please try again',
            });
        }

        const projectphoto = async () => {
            return Promise.all(
              file.projectphotos.map(async (image) => {
                let imageName = `${image.fieldname}/${image.filename}`;
                const projectphoto = await project_photos.create({
                  projectId: project.id,
                  image: imageName,
                });
              })
            );
          };
          projectphoto().then(async () => {
            const response = await Projects.findOne({
              where: { id: project.id },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
                },
                include: {
                    model: project_photos,
                    as: "photos",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                }
            });
      
            res.status(200).json({
              status: 'success',
              message: 'Project Successfully Added',
              data: {
                project: response,
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