module.exports = {
  create: (req, res) => {
    const dbInstance = req.app.get('db')
    const { name, description, complete } = req.body;

    dbInstance.create_todo([name, description, complete])
      .then(() => res.status(200).send(`ok`))
      .catch(() => res.status(500).send('BERRORS!'))
  },
  getAllTodos: (req, res) => {
    const dbInstance = req.app.get('db')

    dbInstance.get_todos()
      .then(todos => res.status(200).send(todos))
      .catch(() => res.status(500).send('BERRORS!'))
  },
  getTodo: (req, res) => {
    const dbInstance = req.app.get('db')
    const { params } = req

    dbInstance.get_todo([params.id])
      .then(todo => res.status(200).send(todo))
      .catch(() => res.status(500).send('BERRORS!'))
  },
  update: (req, res) => {
    const dbInstance = req.app.get('db')
    const { params, complete } = req
    console.log(req.body.complete);
    console.log(params.id);

    dbInstance.update_todo([params.id, req.body.complete])
      .then(() => res.status(200).send('ok!'))
      .catch(() => res.status(500).send('BERRORS!'))

  },
  delete: (req, res) => {
    const dbInstance = req.app.get('db')
    const { params } = req

    dbInstance.delete_todo([params.id])
      .then(() => res.status(200).send('ok!'))
      .catch(() => res.status(500).send('BERRORS!'))
  }
}