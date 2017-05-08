const Documents = require('../models').Documents;
const Users = require('../models').Users;

module.exports = {
  create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        folderId: req.params.folderId,
        userId: req.params.userId
      })
      .then(document => res.status(201).send({
        document,
        message: 'Document created succesfully'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'An error occured while creating document'
      }));
  },

  list(req, res) {
    return Documents
      .findAll()
    //       {
    //     offset: req.query.offset || 0,
    //     limit: req.query.limit || 20,
    //     include: [User],
    //     order: [['updatedAt', 'DESC']]
    //   })
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send({
        error,
        message: 'Error retrieving documents'
      }));
  },

  retrieve(req, res) {
    return Documents
      .findById(req.params.id, {
        include: [Users],
      })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while retrieving documents'
      }));
  },

  update(req, res) {
    // Roles.findById(req.decoded.data.roleId)
    // .then(() => {
    return Documents
        .find({ where: {
          id: req.params.id } })
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            // if (Helpers.isAdmin(req, res)
            // || Helpers.isOwner(req, res, document)) {
            return document
              .update(req.body)
              .then(updatedDoc => res.status(200).send({
                updatedDoc,
                message: 'Document updated successfully'
              }))
            // }
        //     return (res.status(403)
        //        .send({ message: 'Unauthorized Access' }));
        //   })
          .catch(error => res.status(400).send({
            error,
            message: 'Error updating document'
          }));
          });
  },

  destroy(req, res) {
    return Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }

        return document
          .destroy()
          .then(() => res.status(200).send({
            message: `${document.title}, was successfully deleted`
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error deleting document'
      }));
  },
};